import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <style>
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        position: relative;
        overflow: hidden;
      }

      .auth-wrapper {
        width: 100%;
        max-width: 440px;
        animation: authFadeIn .5s ease-out;
        position: relative;
        z-index: 1;
      }

      @keyframes authFadeIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .auth-branding {
        text-align: center;
        margin-bottom: 2rem;
      }

      .auth-branding-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
        font-size: 1.5rem;
        margin-bottom: .75rem;
        box-shadow: 0 4px 16px rgba(78, 128, 238, .25);
      }

      .auth-branding-name {
        font-family: 'Inter', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: -.3px;
      }

      .auth-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 8px 32px rgba(0,0,0,.06);
      }

      .auth-card-header {
        padding: 1.5rem 2rem 1.25rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: #fff;
      }

      .auth-card-header h1 {
        font-family: 'Inter', sans-serif;
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 .25rem;
      }

      .auth-card-header p {
        margin: 0;
        font-size: .875rem;
        opacity: .85;
      }

      .auth-card-body {
        padding: 2rem;
      }

      .auth-alert {
        display: flex;
        align-items: center;
        gap: .625rem;
        padding: .75rem 1rem;
        border-radius: 8px;
        font-size: .875rem;
        margin-bottom: 1.25rem;
        animation: authFadeIn .3s ease-out;
      }

      .auth-alert.error {
        background: rgba(220, 53, 69, .08);
        border: 1px solid rgba(220, 53, 69, .2);
        color: var(--danger, #dc3545);
      }

      .auth-alert.success {
        background: rgba(16, 185, 129, .08);
        border: 1px solid rgba(16, 185, 129, .2);
        color: var(--success, #10B981);
      }

      .auth-alert i {
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .auth-form-group {
        margin-bottom: 1.25rem;
      }

      .auth-form-group label {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: .8125rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: .4rem;
        letter-spacing: .2px;
      }

      .auth-input-group {
        position: relative;
        display: flex;
        align-items: stretch;
      }

      .auth-input-icon {
        position: absolute;
        left: .875rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary);
        font-size: 1rem;
        pointer-events: none;
        z-index: 2;
        opacity: .6;
        transition: opacity .2s, color .2s;
      }

      .auth-input-group:focus-within .auth-input-icon {
        color: var(--primary);
        opacity: 1;
      }

      .auth-input {
        width: 100%;
        padding: .7rem .875rem .7rem 2.5rem;
        font-family: 'Inter', sans-serif;
        font-size: .9rem;
        color: var(--text-primary);
        background: var(--bg-main);
        border: 1px solid var(--border);
        border-radius: 8px;
        outline: none;
        transition: border-color .2s, box-shadow .2s;
      }

      .auth-input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(78, 128, 238, .12);
      }

      .auth-input::placeholder {
        color: var(--text-secondary);
        opacity: .5;
      }

      .auth-input.ng-touched.ng-invalid {
        border-color: var(--danger, #dc3545);
      }

      .auth-input.ng-touched.ng-invalid:focus {
        box-shadow: 0 0 0 3px rgba(220, 53, 69, .12);
      }

      .auth-submit {
        width: 100%;
        padding: .75rem 1.5rem;
        font-family: 'Inter', sans-serif;
        font-size: .95rem;
        font-weight: 600;
        color: #fff;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        transition: transform .15s, box-shadow .2s, opacity .2s;
        box-shadow: 0 2px 8px rgba(78, 128, 238, .3);
      }

      .auth-submit:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(78, 128, 238, .4);
      }

      .auth-submit:active:not(:disabled) {
        transform: translateY(0);
      }

      .auth-submit:disabled {
        opacity: .65;
        cursor: not-allowed;
      }

      .auth-spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255,255,255,.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: authSpin .6s linear infinite;
      }

      @keyframes authSpin {
        to { transform: rotate(360deg); }
      }

      .auth-hint {
        font-size: .75rem;
        color: var(--danger, #dc3545);
        margin-top: .3rem;
        padding-left: .125rem;
      }

      .auth-footer {
        text-align: center;
        margin-top: 1.75rem;
        font-family: 'Inter', sans-serif;
        font-size: .875rem;
      }

      .auth-footer a {
        font-weight: 600;
        text-decoration: none;
        transition: opacity .2s;
      }

      .auth-footer a:hover {
        opacity: .8;
        text-decoration: underline;
      }

      @media (max-width: 480px) {
        .auth-card-body {
          padding: 1.5rem 1.25rem;
        }
        .auth-card-header {
          padding: 1.25rem 1.25rem 1rem;
        }
      }
    </style>

    <div class="auth-page">
      <div class="auth-wrapper">

        <!-- Branding (clickable → store) -->
        <a routerLink="/" class="auth-branding" style="text-decoration:none;">
          <div class="auth-branding-icon">
            <i class="bi bi-heart-pulse-fill"></i>
          </div>
          <div class="auth-branding-name">PharmaCare</div>
        </a>

        <!-- Card -->
        <div class="auth-card">

          <!-- Header -->
          <div class="auth-card-header">
            <h1>{{ t.isFr ? 'Mot de passe oublié' : 'Forgot Password' }}</h1>
            <p>{{ t.isFr ? 'Entrez votre email pour recevoir un lien de réinitialisation' : 'Enter your email to receive a reset link' }}</p>
          </div>

          <!-- Body -->
          <div class="auth-card-body">

            <!-- Error message -->
            <div class="auth-alert error" *ngIf="erreur">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ erreur }}</span>
            </div>

            <!-- Success message -->
            <div class="auth-alert success" *ngIf="succes">
              <i class="bi bi-check-circle-fill"></i>
              <span>{{ t.isFr ? "Si l'email existe, un lien de réinitialisation a été envoyé." : 'If the email exists, a reset link has been sent.' }}</span>
            </div>

            <form #f="ngForm" (ngSubmit)="onSubmit(f)" *ngIf="!succes">

              <!-- Email -->
              <div class="auth-form-group">
                <label for="email">{{ t.isFr ? 'Adresse email' : 'Email address' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-envelope auth-input-icon"></i>
                  <input
                    id="email"
                    type="email"
                    class="auth-input"
                    [placeholder]="t.isFr ? 'nom@exemple.com' : 'name@example.com'"
                    [(ngModel)]="email"
                    name="email"
                    required
                    email
                    #emailField="ngModel"
                    autocomplete="email"
                  />
                </div>
                <div class="auth-hint" *ngIf="emailField.touched && emailField.invalid">
                  {{ t.isFr ? 'Veuillez entrer un email valide.' : 'Please enter a valid email.' }}
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="auth-submit"
                [disabled]="f.invalid || enCours"
              >
                <span class="auth-spinner" *ngIf="enCours"></span>
                {{ enCours
                    ? (t.isFr ? 'Envoi en cours...' : 'Sending...')
                    : (t.isFr ? 'Envoyer le lien' : 'Send reset link')
                }}
              </button>

            </form>
          </div>
        </div>

        <!-- Footer link -->
        <div class="auth-footer">
          <a routerLink="/connexion">
            <i class="bi bi-arrow-left" style="margin-right: 4px;"></i>
            {{ t.isFr ? 'Retour à la connexion' : 'Back to login' }}
          </a>
        </div>

      </div>
    </div>
  `
})
export class MotDePasseOublieComponent {

  email = '';
  enCours = false;
  erreur = '';
  succes = false;

  constructor(
    public t: TraductionService,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.erreur = '';
    this.enCours = true;

    this.authService.motDePasseOublie(this.email).subscribe({
      next: (res: any) => {
        this.enCours = false;
        this.succes = true;
        // If email failed, backend returns resetLink directly
        if (res.resetLink) {
          window.location.href = res.resetLink;
        }
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 0) {
          this.erreur = this.t.isFr
            ? 'Impossible de contacter le serveur. Vérifiez que le service est démarré.'
            : 'Cannot reach the server. Please check that the service is running.';
        } else {
          // For security, show success even on 404 to avoid email enumeration
          this.succes = true;
        }
      }
    });
  }
}
