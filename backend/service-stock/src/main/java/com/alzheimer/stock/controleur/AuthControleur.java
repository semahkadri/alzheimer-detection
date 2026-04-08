package com.alzheimer.stock.controleur;

import com.alzheimer.stock.dto.*;
import com.alzheimer.stock.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentification", description = "Inscription, connexion, vérification et gestion des tokens")
public class AuthControleur {

    private final AuthService authService;

    @PostMapping("/inscription")
    @Operation(summary = "Créer un nouveau compte — retourne un code de vérification")
    public ResponseEntity<Map<String, String>> inscription(@Valid @RequestBody InscriptionDTO dto) {
        return new ResponseEntity<>(authService.inscription(dto), HttpStatus.CREATED);
    }

    @PostMapping("/verifier-code")
    @Operation(summary = "Vérifier le code email et activer le compte")
    public ResponseEntity<AuthReponseDTO> verifierCode(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(authService.verifierCode(body.get("email"), body.get("code")));
    }

    @PostMapping("/renvoyer-code")
    @Operation(summary = "Renvoyer le code de vérification")
    public ResponseEntity<Map<String, String>> renvoyerCode(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(authService.renvoyerCode(body.get("email")));
    }

    @PostMapping("/connexion")
    @Operation(summary = "Se connecter (email doit être vérifié)")
    public ResponseEntity<AuthReponseDTO> connexion(@Valid @RequestBody ConnexionDTO dto) {
        return ResponseEntity.ok(authService.connexion(dto));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Rafraîchir le token d'accès")
    public ResponseEntity<AuthReponseDTO> refreshToken(@Valid @RequestBody RefreshTokenDTO dto) {
        return ResponseEntity.ok(authService.refreshToken(dto.getRefreshToken()));
    }

    @PostMapping("/mot-de-passe-oublie")
    @Operation(summary = "Demander la réinitialisation du mot de passe")
    public ResponseEntity<Map<String, String>> motDePasseOublie(@RequestBody Map<String, String> body) {
        authService.demanderResetMotDePasse(body.get("email"));
        return ResponseEntity.ok(Map.of("message", "Si l'email existe, un code de réinitialisation a été généré"));
    }

    @PostMapping("/reset-mot-de-passe")
    @Operation(summary = "Réinitialiser le mot de passe avec le code")
    public ResponseEntity<Map<String, String>> resetMotDePasse(@RequestBody Map<String, String> body) {
        authService.resetMotDePasse(body.get("token"), body.get("nouveauMotDePasse"));
        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    }

    @GetMapping("/me")
    @Operation(summary = "Obtenir l'utilisateur connecté")
    public ResponseEntity<UtilisateurDTO> me(Authentication authentication) {
        return ResponseEntity.ok(authService.getUtilisateurCourant(authentication.getName()));
    }
}
