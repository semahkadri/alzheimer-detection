package com.alzheimer.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${app.frontend-url:http://localhost:4200}")
    private String frontendUrl;

    public String envoyerCodeVerification(String to, String prenom, String code) {
        if (fromEmail == null || fromEmail.isBlank()) {
            return "SMTP non configure";
        }
        try {
            log.info("Sending verification email to {} ...", to);
            var message = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, "PharmaCare");
            helper.setTo(to);
            helper.setSubject("PharmaCare - Votre code de verification");
            helper.setText(buildVerificationHtml(prenom, code), true);
            mailSender.send(message);
            log.info("Verification email SENT to {}", to);
            return null;
        } catch (Exception e) {
            log.error("FAILED to send email to {}: {}", to, e.getMessage(), e);
            return e.getMessage();
        }
    }

    public boolean envoyerCodeReset(String to, String code) {
        if (fromEmail == null || fromEmail.isBlank()) {
            log.warn("SMTP not configured");
            return false;
        }
        try {
            var message = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, "PharmaCare");
            helper.setTo(to);
            helper.setSubject("PharmaCare - Reinitialisation du mot de passe");
            String resetLink = frontendUrl + "/reset-mot-de-passe?token=" + code;
            helper.setText(buildResetHtml(code, resetLink), true);
            mailSender.send(message);
            log.info("Reset email sent to {}", to);
            return true;
        } catch (Exception e) {
            log.error("FAILED to send reset email to {}: {}", to, e.getMessage(), e);
            return false;
        }
    }

    private String buildVerificationHtml(String prenom, String code) {
        return "<div style=\"font-family:'Inter',Arial,sans-serif; max-width:500px; margin:0 auto; padding:32px;\">"
             + "<div style=\"text-align:center; margin-bottom:24px;\">"
             + "<div style=\"display:inline-block; width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#4E80EE,#10B981); color:#fff; font-size:1.4rem; line-height:48px;\">&#9829;</div>"
             + "<h2 style=\"color:#1a365d; margin:12px 0 4px;\">PharmaCare</h2>"
             + "</div>"
             + "<div style=\"background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:28px; text-align:center;\">"
             + "<h3 style=\"color:#0f172a; margin:0 0 8px;\">Bonjour " + prenom + " !</h3>"
             + "<p style=\"color:#64748b; font-size:14px; margin:0 0 24px;\">Voici votre code de v&eacute;rification :</p>"
             + "<div style=\"font-size:36px; font-weight:800; letter-spacing:8px; color:#4E80EE; background:#f1f5f9; padding:16px; border-radius:10px; font-family:monospace;\">" + code + "</div>"
             + "<p style=\"color:#94a3b8; font-size:12px; margin:20px 0 0;\">Ce code expire dans 24 heures.</p>"
             + "</div>"
             + "<p style=\"text-align:center; color:#94a3b8; font-size:11px; margin-top:20px;\">&copy; 2026 PharmaCare</p>"
             + "</div>";
    }

    private String buildResetHtml(String code, String resetLink) {
        return "<div style=\"font-family:'Inter',Arial,sans-serif; max-width:500px; margin:0 auto; padding:32px;\">"
             + "<div style=\"text-align:center; margin-bottom:24px;\">"
             + "<div style=\"display:inline-block; width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#4E80EE,#10B981); color:#fff; font-size:1.4rem; line-height:48px;\">&#9829;</div>"
             + "<h2 style=\"color:#1a365d; margin:12px 0 4px;\">PharmaCare</h2>"
             + "</div>"
             + "<div style=\"background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:28px; text-align:center;\">"
             + "<h3 style=\"color:#0f172a; margin:0 0 8px;\">R&eacute;initialisation du mot de passe</h3>"
             + "<p style=\"color:#64748b; font-size:14px; margin:0 0 24px;\">Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>"
             + "<a href=\"" + resetLink + "\" style=\"display:inline-block; padding:14px 32px; background:linear-gradient(135deg,#4E80EE,#10B981); color:#fff; font-size:16px; font-weight:700; text-decoration:none; border-radius:10px; margin:8px 0 16px;\">R&eacute;initialiser mon mot de passe</a>"
             + "<p style=\"color:#94a3b8; font-size:12px; margin:16px 0 0;\">Ou copiez ce lien dans votre navigateur :</p>"
             + "<p style=\"color:#4E80EE; font-size:11px; word-break:break-all;\">" + resetLink + "</p>"
             + "<p style=\"color:#94a3b8; font-size:12px; margin:16px 0 0;\">Ce lien expire dans 1 heure.</p>"
             + "</div>"
             + "<p style=\"text-align:center; color:#94a3b8; font-size:11px; margin-top:20px;\">&copy; 2026 PharmaCare</p>"
             + "</div>";
    }
}
