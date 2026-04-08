package com.alzheimer.stock.service;

import com.alzheimer.stock.dto.*;
import com.alzheimer.stock.entite.Role;
import com.alzheimer.stock.entite.Utilisateur;
import com.alzheimer.stock.repository.UtilisateurRepository;
import com.alzheimer.stock.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    @Override
    public Map<String, String> inscription(InscriptionDTO dto) {
        if (!dto.getMotDePasse().equals(dto.getConfirmationMotDePasse())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas");
        }
        if (utilisateurRepository.existsByEmail(dto.getEmail().toLowerCase().trim())) {
            throw new IllegalArgumentException("Un compte existe déjà avec cet email");
        }

        // Generate 6-digit verification code
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1000000));

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(dto.getNom().trim())
                .prenom(dto.getPrenom().trim())
                .email(dto.getEmail().toLowerCase().trim())
                .motDePasse(passwordEncoder.encode(dto.getMotDePasse()))
                .role(Role.UTILISATEUR)
                .emailVerifie(false)
                .tokenVerification(code)
                .build();
        utilisateurRepository.save(utilisateur);

        // Send email (Resend on Railway, SMTP locally)
        String mailError = mailService.envoyerCodeVerification(utilisateur.getEmail(), utilisateur.getPrenom(), code);

        Map<String, String> response = new HashMap<>();
        response.put("email", utilisateur.getEmail());
        if (mailError == null) {
            response.put("message", "Un code de vérification a été envoyé à " + utilisateur.getEmail());
        } else {
            response.put("message", "Erreur envoi email. Veuillez réessayer.");
            response.put("mailError", mailError);
        }
        // Code is NEVER sent to frontend — only via email
        return response;
    }

    @Override
    public UtilisateurDTO creerParAdmin(InscriptionDTO dto, Role role) {
        if (utilisateurRepository.existsByEmail(dto.getEmail().toLowerCase().trim())) {
            throw new IllegalArgumentException("Un compte existe déjà avec cet email");
        }
        Utilisateur utilisateur = Utilisateur.builder()
                .nom(dto.getNom().trim())
                .prenom(dto.getPrenom().trim())
                .email(dto.getEmail().toLowerCase().trim())
                .motDePasse(passwordEncoder.encode(dto.getMotDePasse()))
                .role(role)
                .emailVerifie(true) // Admin-created users are auto-verified
                .actif(true)
                .build();
        utilisateurRepository.save(utilisateur);
        return toDTO(utilisateur);
    }

    @Override
    public Map<String, String> renvoyerCode(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        if (utilisateur.isEmailVerifie()) {
            throw new IllegalArgumentException("Email déjà vérifié");
        }
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1000000));
        utilisateur.setTokenVerification(code);
        utilisateurRepository.save(utilisateur);
        String mailError = mailService.envoyerCodeVerification(utilisateur.getEmail(), utilisateur.getPrenom(), code);
        Map<String, String> response = new HashMap<>();
        response.put("email", utilisateur.getEmail());
        if (mailError == null) {
            response.put("message", "Nouveau code envoyé à " + utilisateur.getEmail());
        } else {
            response.put("message", "Code de vérification");
            response.put("code", code);
        }
        return response;
    }

    @Override
    public AuthReponseDTO verifierCode(String email, String code) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        if (utilisateur.isEmailVerifie()) {
            throw new IllegalArgumentException("Email déjà vérifié");
        }

        if (utilisateur.getTokenVerification() == null) {
            throw new IllegalArgumentException("Code expiré. Veuillez vous réinscrire.");
        }

        if (!utilisateur.getTokenVerification().equals(code)) {
            // After wrong attempt, regenerate code (prevents brute force — old code is invalid)
            String newCode = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1000000));
            utilisateur.setTokenVerification(newCode);
            utilisateurRepository.save(utilisateur);
            // Send new code by email
            mailService.envoyerCodeVerification(utilisateur.getEmail(), utilisateur.getPrenom(), newCode);
            throw new IllegalArgumentException("Code incorrect. Un nouveau code a été envoyé.");
        }

        // Verify email
        utilisateur.setEmailVerifie(true);
        utilisateur.setTokenVerification(null);
        utilisateurRepository.save(utilisateur);

        // Now generate JWT tokens (auto-login after verification)
        UserDetails userDetails = toUserDetails(utilisateur);
        return AuthReponseDTO.builder()
                .accessToken(jwtService.generateAccessToken(userDetails))
                .refreshToken(jwtService.generateRefreshToken(userDetails))
                .utilisateur(toDTO(utilisateur))
                .build();
    }

    // Brute force protection: max 5 attempts per 15 minutes per email
    private final java.util.concurrent.ConcurrentHashMap<String, long[]> loginAttempts = new java.util.concurrent.ConcurrentHashMap<>();

    @Override
    public AuthReponseDTO connexion(ConnexionDTO dto) {
        String email = dto.getEmail().toLowerCase().trim();

        long[] record = loginAttempts.get(email);
        if (record != null && record[0] >= 5 && (System.currentTimeMillis() - record[1]) < 900_000) {
            long mins = (900_000 - (System.currentTimeMillis() - record[1])) / 60_000 + 1;
            throw new IllegalArgumentException("Trop de tentatives. Réessayez dans " + mins + " minutes.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, dto.getMotDePasse()));
        } catch (Exception e) {
            loginAttempts.compute(email, (k, v) -> {
                if (v == null || (System.currentTimeMillis() - v[1]) > 900_000) return new long[]{1, System.currentTimeMillis()};
                return new long[]{v[0] + 1, v[1]};
            });
            throw e;
        }

        loginAttempts.remove(email);

        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        if (!utilisateur.isActif()) {
            throw new IllegalArgumentException("Compte désactivé. Contactez l'administrateur.");
        }
        if (!utilisateur.isEmailVerifie()) {
            throw new IllegalArgumentException("Veuillez d'abord vérifier votre email. Consultez votre boîte de réception.");
        }

        UserDetails userDetails = toUserDetails(utilisateur);
        return AuthReponseDTO.builder()
                .accessToken(jwtService.generateAccessToken(userDetails))
                .refreshToken(jwtService.generateRefreshToken(userDetails))
                .utilisateur(toDTO(utilisateur))
                .build();
    }

    @Override
    public AuthReponseDTO refreshToken(String refreshToken) {
        String email = jwtService.extractEmail(refreshToken);
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        UserDetails userDetails = toUserDetails(utilisateur);
        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new IllegalArgumentException("Refresh token invalide ou expiré");
        }
        return AuthReponseDTO.builder()
                .accessToken(jwtService.generateAccessToken(userDetails))
                .refreshToken(refreshToken)
                .utilisateur(toDTO(utilisateur))
                .build();
    }

    @Override
    public void demanderResetMotDePasse(String email) {
        utilisateurRepository.findByEmail(email.toLowerCase().trim()).ifPresent(u -> {
            // UUID token — impossible to brute force (unlike 6-digit codes)
            String token = UUID.randomUUID().toString();
            u.setTokenReset(token);
            u.setDateExpirationReset(LocalDateTime.now().plusHours(1));
            utilisateurRepository.save(u);
            mailService.envoyerCodeReset(u.getEmail(), token);
        });
    }

    @Override
    public void resetMotDePasse(String token, String nouveauMotDePasse) {
        Utilisateur u = utilisateurRepository.findByTokenReset(token)
                .orElseThrow(() -> new IllegalArgumentException("Code invalide"));
        if (u.getDateExpirationReset() != null && u.getDateExpirationReset().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Code expiré");
        }
        if (nouveauMotDePasse.length() < 8) {
            throw new IllegalArgumentException("Le mot de passe doit contenir au moins 8 caractères");
        }
        u.setMotDePasse(passwordEncoder.encode(nouveauMotDePasse));
        u.setTokenReset(null);
        u.setDateExpirationReset(null);
        utilisateurRepository.save(u);
    }

    @Override
    @Transactional(readOnly = true)
    public UtilisateurDTO getUtilisateurCourant(String email) {
        return toDTO(utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé")));
    }

    private UserDetails toUserDetails(Utilisateur u) {
        return new User(u.getEmail(), u.getMotDePasse(), u.isActif(), true, true, true,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + u.getRole().name())));
    }

    static UtilisateurDTO toDTO(Utilisateur u) {
        return UtilisateurDTO.builder()
                .id(u.getId()).nom(u.getNom()).prenom(u.getPrenom()).email(u.getEmail())
                .role(u.getRole()).emailVerifie(u.isEmailVerifie()).actif(u.isActif())
                .dateCreation(u.getDateCreation()).build();
    }
}
