package com.alzheimer.stock.service;

import com.alzheimer.stock.dto.*;
import com.alzheimer.stock.entite.Role;

import java.util.Map;

public interface AuthService {

    Map<String, String> inscription(InscriptionDTO dto);

    UtilisateurDTO creerParAdmin(InscriptionDTO dto, Role role);

    AuthReponseDTO verifierCode(String email, String code);

    Map<String, String> renvoyerCode(String email);

    AuthReponseDTO connexion(ConnexionDTO dto);

    AuthReponseDTO refreshToken(String refreshToken);

    Map<String, String> demanderResetMotDePasse(String email);

    void resetMotDePasse(String token, String nouveauMotDePasse);

    UtilisateurDTO getUtilisateurCourant(String email);
}
