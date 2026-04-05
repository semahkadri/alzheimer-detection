package com.alzheimer.stock.service;

import com.alzheimer.stock.dto.UtilisateurDTO;
import com.alzheimer.stock.entite.Role;
import com.alzheimer.stock.entite.Utilisateur;
import com.alzheimer.stock.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UtilisateurDTO> listerTous() {
        return utilisateurRepository.findAllByOrderByDateCreationDesc().stream()
                .map(AuthServiceImpl::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UtilisateurDTO obtenirParId(Long id) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        return AuthServiceImpl.toDTO(u);
    }

    @Override
    public UtilisateurDTO modifierProfil(Long id, String nom, String prenom) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        u.setNom(nom.trim());
        u.setPrenom(prenom.trim());
        return AuthServiceImpl.toDTO(utilisateurRepository.save(u));
    }

    @Override
    public UtilisateurDTO changerRole(Long id, Role role) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        u.setRole(role);
        return AuthServiceImpl.toDTO(utilisateurRepository.save(u));
    }

    @Override
    public UtilisateurDTO activerDesactiver(Long id, boolean actif) {
        Utilisateur u = utilisateurRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        u.setActif(actif);
        return AuthServiceImpl.toDTO(utilisateurRepository.save(u));
    }

    @Override
    public void supprimer(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new IllegalArgumentException("Utilisateur non trouvé");
        }
        utilisateurRepository.deleteById(id);
    }

    @Override
    public void changerMotDePasse(String email, String ancienMotDePasse, String nouveauMotDePasse) {
        Utilisateur u = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(ancienMotDePasse, u.getMotDePasse())) {
            throw new IllegalArgumentException("Ancien mot de passe incorrect");
        }

        if (nouveauMotDePasse.length() < 8) {
            throw new IllegalArgumentException("Le nouveau mot de passe doit contenir au moins 8 caractères");
        }

        u.setMotDePasse(passwordEncoder.encode(nouveauMotDePasse));
        utilisateurRepository.save(u);
    }

    @Override
    @Transactional(readOnly = true)
    public long compterUtilisateurs() {
        return utilisateurRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public long compterAdmins() {
        return utilisateurRepository.countByRole(Role.ADMIN);
    }
}
