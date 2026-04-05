package com.alzheimer.stock.config;

import com.alzheimer.stock.entite.Role;
import com.alzheimer.stock.entite.Utilisateur;
import com.alzheimer.stock.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(100)
public class AdminInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            if (utilisateurRepository.countByRole(Role.ADMIN) == 0) {
                Utilisateur admin = Utilisateur.builder()
                        .nom("Admin")
                        .prenom("PharmaCare")
                        .email("admin@pharmacare.tn")
                        .motDePasse(passwordEncoder.encode("Admin@1234"))
                        .role(Role.ADMIN)
                        .emailVerifie(true)
                        .actif(true)
                        .build();
                utilisateurRepository.save(admin);
                log.info("=== Default admin created: admin@pharmacare.tn ===");
            }
        } catch (Exception e) {
            log.warn("Admin initialization skipped: {}", e.getMessage());
        }
    }
}
