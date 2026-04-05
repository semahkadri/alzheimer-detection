import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-reset-mot-de-passe',
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

      .auth-toggle-pw {
        position: absolute;
        right: .5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 1.05rem;
        padding: .25rem .375rem;
        border-radius: 6px;
        transition: color .2s, background .2s;
        z-index: 2;
      }

      .auth-toggle-pw:hover {
        color: var(--primary);
        background: rgba(78, 128, 238, .08);
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

      /* Password strength */
      .auth-pwd-strength {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .auth-pwd-bar-track {
        flex: 1;
        height: 4px;
        border-radius: 4px;
        background: var(--border, #E2E8F0);
        overflow: hidden;
      }

      .auth-pwd-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.35s ease, background 0.35s ease;
      }

      .auth-pwd-bar-fill.weak {
        width: 33%;
        background: var(--danger, #EF4444);
      }

      .auth-pwd-bar-fill.medium {
        width: 66%;
        background: #F59E0B;
      }

      .auth-pwd-bar-fill.strong {
        width: 100%;
        background: var(--success, #10B981);
      }

      .auth-pwd-label {
        font-size: 11.5px;
        font-weight: 600;
        min-width: 56px;
        text-align: right;
      }

      .auth-pwd-label.weak   { color: var(--danger, #EF4444); }
      .auth-pwd-label.medium { color: #F59E0B; }
      .auth-pwd-label.strong { color: var(--success, #10B981); }

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
            <h1>{{ t.isFr ? 'Nouveau mot de passe' : 'New Password' }}</h1>
            <p>{{ t.isFr ? 'Choisissez un nouveau mot de passe sécurisé' : 'Choose a new secure password' }}</p>
          </div>

          <!-- Body -->
          <div class="auth-card-body">

            <!-- Token missing -->
            <div class="auth-alert error" *ngIf="!token">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ t.isFr ? 'Le lien de réinitialisation est invalide ou expiré.' : 'The reset link is invalid or expired.' }}</span>
            </div>

            <!-- Error message -->
            <div class="auth-alert error" *ngIf="erreur">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ erreur }}</span>
            </div>

            <!-- Success message -->
            <div *ngIf="succes">
              <div class="auth-alert success">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ t.isFr ? 'Votre mot de passe a été réinitialisé avec succès.' : 'Your password has been reset successfully.' }}</span>
              </div>
              <a routerLink="/connexion" class="auth-submit" style="text-decoration: none; text-align: center;">
                {{ t.isFr ? 'Se connecter' : 'Sign in' }}
              </a>
            </div>

            <form #f="ngForm" (ngSubmit)="onSubmit(f)" *ngIf="token && !succes">

              <!-- New password -->
              <div class="auth-form-group">
                <label for="nouveauMotDePasse">{{ t.isFr ? 'Nouveau mot de passe' : 'New password' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-lock auth-input-icon"></i>
                  <input
                    id="nouveauMotDePasse"
                    [type]="showPassword ? 'text' : 'password'"
                    class="auth-input"
                    [placeholder]="t.isFr ? 'Minimum 8 caractères' : 'Minimum 8 characters'"
                    [(ngModel)]="nouveauMotDePasse"
                    name="nouveauMotDePasse"
                    required
                    minlength="8"
                    #mdpField="ngModel"
                    autocomplete="new-password"
                    style="padding-right: 2.5rem;"
                  />
                  <button
                    type="button"
                    class="auth-toggle-pw"
                    (click)="showPassword = !showPassword"
                    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
                <div class="auth-hint" *ngIf="mdpField.touched && mdpField.invalid">
                  {{ t.isFr ? 'Le mot de passe doit contenir au moins 8 caractères.' : 'Password must be at least 8 characters.' }}
                </div>
                <!-- Password strength -->
                <div class="auth-pwd-strength" *ngIf="nouveauMotDePasse">
                  <div class="auth-pwd-bar-track">
                    <div class="auth-pwd-bar-fill" [ngClass]="getPasswordStrength()"></div>
                  </div>
                  <span class="auth-pwd-label" [ngClass]="getPasswordStrength()">
                    {{ getPasswordStrengthLabel() }}
                  </span>
                </div>
              </div>

              <!-- Confirm password -->
              <div class="auth-form-group">
                <label for="confirmMotDePasse">{{ t.isFr ? 'Confirmer le mot de passe' : 'Confirm password' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-shield-lock auth-input-icon"></i>
                  <input
                    id="confirmMotDePasse"
                    [type]="showConfirmPassword ? 'text' : 'password'"
                    class="auth-input"
                    [placeholder]="t.isFr ? 'Retapez le mot de passe' : 'Re-enter your password'"
                    [(ngModel)]="confirmMotDePasse"
                    name="confirmMotDePasse"
                    required
                    #confirmField="ngModel"
                    autocomplete="new-password"
                    style="padding-right: 2.5rem;"
                  />
                  <button
                    type="button"
                    class="auth-toggle-pw"
                    (click)="showConfirmPassword = !showConfirmPassword"
                    [attr.aria-label]="showConfirmPassword ? 'Hide password' : 'Show password'"
                  >
                    <i class="bi" [ngClass]="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
                <div class="auth-hint" *ngIf="confirmField.touched && confirmMotDePasse && nouveauMotDePasse !== confirmMotDePasse">
                  {{ t.isFr ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.' }}
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="auth-submit"
                [disabled]="f.invalid || enCours || nouveauMotDePasse !== confirmMotDePasse"
              >
                <span class="auth-spinner" *ngIf="enCours"></span>
                {{ enCours
                    ? (t.isFr ? 'Réinitialisation...' : 'Resetting...')
                    : (t.isFr ? 'Réinitialiser' : 'Reset password')
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
export class ResetMotDePasseComponent implements OnInit {

  token = '';
  nouveauMotDePasse = '';
  confirmMotDePasse = '';
  showPassword = false;
  showConfirmPassword = false;
  enCours = false;
  erreur = '';
  succes = false;

  constructor(
    public t: TraductionService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  getPasswordStrength(): 'weak' | 'medium' | 'strong' {
    const pwd = this.nouveauMotDePasse;
    if (!pwd) return 'weak';

    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score >= 5) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  }

  getPasswordStrengthLabel(): string {
    const strength = this.getPasswordStrength();
    if (this.t.isFr) {
      return strength === 'strong' ? 'Fort' : strength === 'medium' ? 'Moyen' : 'Faible';
    }
    return strength === 'strong' ? 'Strong' : strength === 'medium' ? 'Medium' : 'Weak';
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.nouveauMotDePasse !== this.confirmMotDePasse) {
      this.erreur = this.t.isFr
        ? 'Les mots de passe ne correspondent pas.'
        : 'Passwords do not match.';
      return;
    }

    this.erreur = '';
    this.enCours = true;

    this.authService.resetMotDePasse(this.token, this.nouveauMotDePasse).subscribe({
      next: () => {
        this.enCours = false;
        this.succes = true;
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 0) {
          this.erreur = this.t.isFr
            ? 'Impossible de contacter le serveur. Vérifiez que le service est démarré.'
            : 'Cannot reach the server. Please check that the service is running.';
        } else {
          this.erreur = err?.error?.message
            || (this.t.isFr
                ? 'Le lien de réinitialisation est invalide ou expiré.'
                : 'The reset link is invalid or expired.');
        }
      }
    });
  }
}
