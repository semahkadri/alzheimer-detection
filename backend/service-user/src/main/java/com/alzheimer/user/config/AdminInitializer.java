package com.alzheimer.user.config;

import com.alzheimer.user.entite.Role;
import com.alzheimer.user.entite.Utilisateur;
import com.alzheimer.user.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Seeds a default ADMIN on first startup if no admin exists.
 * Credentials: admin@pharmacare.tn / Admin@1234
 * Change immediately after first login.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AdminInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
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
            log.info("=== Default admin created: admin@pharmacare.tn / Admin@1234 ===");
            log.info("=== CHANGE THIS PASSWORD IMMEDIATELY ===");
        }
    }
}
