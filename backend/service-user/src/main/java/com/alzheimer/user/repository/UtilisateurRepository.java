package com.alzheimer.user.repository;

import com.alzheimer.user.entite.Role;
import com.alzheimer.user.entite.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Utilisateur> findByTokenVerification(String token);

    Optional<Utilisateur> findByTokenReset(String token);

    List<Utilisateur> findAllByOrderByDateCreationDesc();

    long countByRole(Role role);
}
