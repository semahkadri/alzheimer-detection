package com.alzheimer.stock.controleur;

import com.alzheimer.stock.dto.InscriptionDTO;
import com.alzheimer.stock.dto.UtilisateurDTO;
import com.alzheimer.stock.entite.Role;
import com.alzheimer.stock.service.AuthService;
import com.alzheimer.stock.service.UtilisateurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
@Tag(name = "Utilisateurs", description = "Gestion des utilisateurs (admin)")
public class UtilisateurControleur {

    private final UtilisateurService utilisateurService;
    private final AuthService authService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Créer un utilisateur (admin — sans vérification email)")
    public ResponseEntity<UtilisateurDTO> creerUtilisateur(@RequestBody Map<String, String> body) {
        InscriptionDTO dto = InscriptionDTO.builder()
                .nom(body.get("nom"))
                .prenom(body.get("prenom"))
                .email(body.get("email"))
                .motDePasse(body.get("motDePasse"))
                .confirmationMotDePasse(body.get("motDePasse"))
                .build();
        Role role = "ADMIN".equals(body.get("role")) ? Role.ADMIN : Role.UTILISATEUR;
        return ResponseEntity.ok(authService.creerParAdmin(dto, role));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Lister tous les utilisateurs")
    public ResponseEntity<List<UtilisateurDTO>> listerTous() {
        return ResponseEntity.ok(utilisateurService.listerTous());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Obtenir un utilisateur par ID")
    public ResponseEntity<UtilisateurDTO> obtenirParId(@PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.obtenirParId(id));
    }

    @PutMapping("/me")
    @Operation(summary = "Modifier son propre profil")
    public ResponseEntity<UtilisateurDTO> modifierMonProfil(
            Authentication authentication,
            @RequestBody Map<String, String> body) {
        // Find user by email from token
        UtilisateurDTO current = utilisateurService.listerTous().stream()
                .filter(u -> u.getEmail().equals(authentication.getName()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        return ResponseEntity.ok(utilisateurService.modifierProfil(
                current.getId(),
                body.getOrDefault("nom", current.getNom()),
                body.getOrDefault("prenom", current.getPrenom())
        ));
    }

    @PutMapping("/me/mot-de-passe")
    @Operation(summary = "Changer son mot de passe")
    public ResponseEntity<Map<String, String>> changerMotDePasse(
            Authentication authentication,
            @RequestBody Map<String, String> body) {
        utilisateurService.changerMotDePasse(
                authentication.getName(),
                body.get("ancienMotDePasse"),
                body.get("nouveauMotDePasse")
        );
        return ResponseEntity.ok(Map.of("message", "Mot de passe modifié avec succès"));
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Changer le rôle d'un utilisateur")
    public ResponseEntity<UtilisateurDTO> changerRole(
            @PathVariable Long id,
            @RequestParam Role role) {
        return ResponseEntity.ok(utilisateurService.changerRole(id, role));
    }

    @PutMapping("/{id}/activer")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Activer/désactiver un utilisateur")
    public ResponseEntity<UtilisateurDTO> activerDesactiver(
            @PathVariable Long id,
            @RequestParam boolean actif) {
        return ResponseEntity.ok(utilisateurService.activerDesactiver(id, actif));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Supprimer un utilisateur")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        utilisateurService.supprimer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Statistiques utilisateurs")
    public ResponseEntity<Map<String, Long>> stats() {
        return ResponseEntity.ok(Map.of(
                "totalUtilisateurs", utilisateurService.compterUtilisateurs(),
                "totalAdmins", utilisateurService.compterAdmins()
        ));
    }
}
