package com.alzheimer.stock.dto;

import com.alzheimer.stock.entite.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilisateurDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private boolean emailVerifie;
    private boolean actif;
    private LocalDateTime dateCreation;
}
