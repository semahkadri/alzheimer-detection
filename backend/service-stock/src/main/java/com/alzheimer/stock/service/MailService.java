package com.alzheimer.stock.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
@Slf4j
public class MailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${app.frontend-url:http://localhost:4200}")
    private String frontendUrl;

    @Value("${RESEND_API_KEY:}")
    private String resendApiKey;

    /**
     * Send verification code email.
     * Uses Resend API if RESEND_API_KEY is set (production/Railway).
     * Falls back to SMTP if not (local development).
     */
    public String envoyerCodeVerification(String to, String prenom, String code) {
        String html = buildVerificationHtml(prenom, code);
        String subject = "PharmaCare - Votre code de verification";

        // Production: use Resend HTTP API
        if (resendApiKey != null && !resendApiKey.isBlank()) {
            return sendViaResend(to, subject, html);
        }

        // Local: use SMTP
        return sendViaSMTP(to, subject, html);
    }

    public boolean envoyerCodeReset(String to, String code) {
        String resetLink = frontendUrl + "/reset-mot-de-passe?token=" + code;
        String html = buildResetHtml(code, resetLink);
        String subject = "PharmaCare - Reinitialisation du mot de passe";

        if (resendApiKey != null && !resendApiKey.isBlank()) {
            return sendViaResend(to, subject, html) == null;
        }
        return sendViaSMTP(to, subject, html) == null;
    }

    // ── Resend HTTP API (works on Railway) ──
    private String sendViaResend(String to, String subject, String html) {
        try {
            log.info("Sending email via Resend to {} ...", to);
            String jsonBody = "{\"from\":\"PharmaCare <onboarding@resend.dev>\","
                    + "\"to\":[\"" + to + "\"],"
                    + "\"subject\":\"" + subject + "\","
                    + "\"html\":" + escapeJson(html) + "}";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .timeout(Duration.ofSeconds(10))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Resend email SENT to {} — response: {}", to, response.body());
                return null; // success
            } else {
                log.error("Resend failed for {}: {} — {}", to, response.statusCode(), response.body());
                return "Resend error: " + response.statusCode();
            }
        } catch (Exception e) {
            log.error("Resend exception for {}: {}", to, e.getMessage(), e);
            return e.getMessage();
        }
    }

    // ── SMTP (works locally) ──
    private String sendViaSMTP(String to, String subject, String html) {
        if (mailSender == null || fromEmail == null || fromEmail.isBlank()) {
            return "SMTP non configure";
        }
        try {
            log.info("Sending email via SMTP to {} ...", to);
            var message = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail, "PharmaCare");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(message);
            log.info("SMTP email SENT to {}", to);
            return null; // success
        } catch (Exception e) {
            log.error("SMTP failed for {}: {}", to, e.getMessage(), e);
            return e.getMessage();
        }
    }

    private String escapeJson(String s) {
        return "\"" + s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t") + "\"";
    }

    private String buildVerificationHtml(String prenom, String code) {
        return "<div style=\"font-family:'Inter',Arial,sans-serif; max-width:500px; margin:0 auto; padding:32px;\">"
             + "<div style=\"text-align:center; margin-bottom:24px;\">"
             + "<div style=\"display:inline-block; width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#4E80EE,#10B981); color:#fff; font-size:1.4rem; line-height:48px;\">&#9829;</div>"
             + "<h2 style=\"color:#1a365d; margin:12px 0 4px;\">PharmaCare</h2>"
             + "</div>"
             + "<div style=\"background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:28px; text-align:center;\">"
             + "<h3 style=\"color:#0f172a; margin:0 0 8px;\">Bonjour " + prenom + " !</h3>"
             + "<p style=\"color:#64748b; font-size:14px; margin:0 0 24px;\">Voici votre code de verification :</p>"
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
             + "<h3 style=\"color:#0f172a; margin:0 0 8px;\">Reinitialisation du mot de passe</h3>"
             + "<p style=\"color:#64748b; font-size:14px; margin:0 0 24px;\">Cliquez sur le bouton ci-dessous :</p>"
             + "<a href=\"" + resetLink + "\" style=\"display:inline-block; padding:14px 32px; background:linear-gradient(135deg,#4E80EE,#10B981); color:#fff; font-size:16px; font-weight:700; text-decoration:none; border-radius:10px; margin:8px 0 16px;\">Reinitialiser mon mot de passe</a>"
             + "<p style=\"color:#94a3b8; font-size:12px; margin:16px 0 0;\">Ce lien expire dans 1 heure.</p>"
             + "</div>"
             + "<p style=\"text-align:center; color:#94a3b8; font-size:11px; margin-top:20px;\">&copy; 2026 PharmaCare</p>"
             + "</div>";
    }
}
