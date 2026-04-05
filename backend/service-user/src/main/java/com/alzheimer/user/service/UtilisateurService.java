package com.alzheimer.user.service;

import com.alzheimer.user.dto.UtilisateurDTO;
import com.alzheimer.user.entite.Role;

import java.util.List;

public interface UtilisateurService {

    List<UtilisateurDTO> listerTous();

    UtilisateurDTO obtenirParId(Long id);

    UtilisateurDTO modifierProfil(Long id, String nom, String prenom);

    UtilisateurDTO changerRole(Long id, Role role);

    UtilisateurDTO activerDesactiver(Long id, boolean actif);

    void supprimer(Long id);

    void changerMotDePasse(String email, String ancienMotDePasse, String nouveauMotDePasse);

    long compterUtilisateurs();

    long compterAdmins();
}
