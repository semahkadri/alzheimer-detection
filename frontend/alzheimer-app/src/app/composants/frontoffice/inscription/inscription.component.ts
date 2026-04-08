import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';
import { InscriptionRequest } from '../../../modeles/auth.model';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <style>
      /* ═══ AUTH LAYOUT ═══ */
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
        font-family: 'Inter', sans-serif;
        animation: authFadeIn 0.5s ease-out;
      }

      @keyframes authFadeIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .auth-container {
        width: 100%;
        max-width: 480px;
      }

      /* ═══ BRAND (clickable, centered) ═══ */
      .auth-brand {
        display: block;
        text-align: center;
        margin-bottom: 28px;
        text-decoration: none;
      }

      .auth-brand-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
        margin-bottom: 12px;
        box-shadow: 0 8px 24px rgba(78, 128, 238, 0.3);
      }

      .auth-brand-name {
        display: block;
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 2px 8px rgba(0,0,0,0.15);
        letter-spacing: -0.3px;
      }

      /* ═══ CARD ═══ */
      .auth-card {
        background: var(--bg-card, #fff);
        border-radius: 12px;
        border: 1px solid var(--border, #E2E8F0);
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      }

      .auth-card-header {
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        padding: 24px 28px;
        text-align: center;
      }

      .auth-card-header h2 {
        margin: 0;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.2px;
      }

      .auth-card-header p {
        margin: 6px 0 0;
        color: rgba(255,255,255,0.82);
        font-size: 13.5px;
      }

      .auth-card-body {
        padding: 28px;
      }

      /* ═══ FORM GROUPS ═══ */
      .auth-form-group {
        margin-bottom: 18px;
      }

      .auth-form-group label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-secondary, #64748B);
        margin-bottom: 6px;
      }

      .auth-input-group {
        position: relative;
        display: flex;
        align-items: center;
      }

      .auth-input-icon {
        position: absolute;
        left: 14px;
        color: var(--text-secondary, #64748B);
        font-size: 16px;
        z-index: 1;
        pointer-events: none;
        transition: color 0.2s;
      }

      .auth-input-group input {
        width: 100%;
        padding: 11px 14px 11px 42px;
        border: 1.5px solid var(--border, #E2E8F0);
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        color: var(--text-primary, #1E293B);
        background: var(--bg-main, #F8FAFC);
        transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
        box-sizing: border-box;
      }

      .auth-input-group input:focus {
        border-color: var(--primary, #4E80EE);
        box-shadow: 0 0 0 3px rgba(78, 128, 238, 0.12);
        background: var(--bg-card, #fff);
      }

      .auth-input-group input:focus ~ .auth-input-icon,
      .auth-input-group input:focus + .auth-input-icon {
        color: var(--primary, #4E80EE);
      }

      .auth-input-group input.ng-touched.ng-invalid {
        border-color: var(--danger, #EF4444);
      }

      .auth-toggle-pwd {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: var(--text-secondary, #64748B);
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        display: flex;
        align-items: center;
        z-index: 1;
        transition: color 0.2s;
      }

      .auth-toggle-pwd:hover {
        color: var(--primary, #4E80EE);
      }

      /* ═══ PASSWORD STRENGTH ═══ */
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

      /* ═══ ERROR ═══ */
      .auth-error {
        background: rgba(239, 68, 68, 0.08);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 8px;
        padding: 10px 14px;
        color: var(--danger, #EF4444);
        font-size: 13px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* ═══ SUBMIT BUTTON ═══ */
      .auth-submit-btn {
        width: 100%;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--primary, #4E80EE), var(--primary-dark, #3A66CC));
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
        box-shadow: 0 4px 14px rgba(78, 128, 238, 0.3);
      }

      .auth-submit-btn:hover:not(:disabled) {
        opacity: 0.92;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(78, 128, 238, 0.35);
      }

      .auth-submit-btn:active:not(:disabled) {
        transform: translateY(0);
      }

      .auth-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .auth-spinner {
        width: 18px;
        height: 18px;
        border: 2.5px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: authSpin 0.65s linear infinite;
      }

      @keyframes authSpin {
        to { transform: rotate(360deg); }
      }

      /* ═══ FOOTER LINK (white on gradient) ═══ */
      .auth-footer {
        text-align: center;
        margin-top: 22px;
        font-size: 13.5px;
        color: rgba(255,255,255,0.75);
      }

      .auth-footer a {
        color: #fff;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: opacity 0.2s;
      }

      .auth-footer a:hover {
        opacity: 0.8;
      }

      /* ═══ FIELD HINT ═══ */
      .auth-field-hint {
        font-size: 11.5px;
        color: var(--danger, #EF4444);
        margin-top: 4px;
      }

      /* ═══ RESPONSIVE ═══ */
      @media (max-width: 520px) {
        .auth-card-body {
          padding: 20px 18px;
        }
        .auth-card-header {
          padding: 20px 18px;
        }
      }
    </style>

    <div class="auth-page">
      <div class="auth-container">

        <!-- Brand (clickable → back to store) -->
        <a routerLink="/" class="auth-brand" style="text-decoration:none; display:block;">
          <div class="auth-brand-icon">
            <i class="bi bi-heart-pulse-fill"></i>
          </div>
          <span class="auth-brand-name">PharmaCare</span>
        </a>

        <!-- Card -->
        <div class="auth-card">

          <!-- Header -->
          <div class="auth-card-header">
            <h2>{{ t.isFr ? 'Créer un compte' : 'Create Account' }}</h2>
            <p>{{ t.isFr ? 'Rejoignez PharmaCare' : 'Join PharmaCare today' }}</p>
          </div>

          <!-- Body -->
          <div class="auth-card-body">

            <!-- Error -->
            <div class="auth-error" *ngIf="erreur">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ erreur }}</span>
            </div>

            <form #inscriptionForm="ngForm" (ngSubmit)="onSubmit(inscriptionForm)">

              <!-- Nom -->
              <div class="auth-form-group">
                <label>{{ t.isFr ? 'Nom' : 'Last name' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-person auth-input-icon"></i>
                  <input type="text"
                         name="nom"
                         [(ngModel)]="form.nom"
                         required
                         minlength="2"
                         #nomField="ngModel"
                         [placeholder]="t.isFr ? 'Votre nom' : 'Your last name'">
                </div>
                <div class="auth-field-hint" *ngIf="nomField.touched && nomField.invalid">
                  {{ t.isFr ? 'Le nom doit contenir au moins 2 caractères' : 'Last name must be at least 2 characters' }}
                </div>
              </div>

              <!-- Prénom -->
              <div class="auth-form-group">
                <label>{{ t.isFr ? 'Prénom' : 'First name' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-person-badge auth-input-icon"></i>
                  <input type="text"
                         name="prenom"
                         [(ngModel)]="form.prenom"
                         required
                         minlength="2"
                         #prenomField="ngModel"
                         [placeholder]="t.isFr ? 'Votre prénom' : 'Your first name'">
                </div>
                <div class="auth-field-hint" *ngIf="prenomField.touched && prenomField.invalid">
                  {{ t.isFr ? 'Le prénom doit contenir au moins 2 caractères' : 'First name must be at least 2 characters' }}
                </div>
              </div>

              <!-- Email -->
              <div class="auth-form-group">
                <label>{{ t.isFr ? 'Adresse email' : 'Email address' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-envelope auth-input-icon"></i>
                  <input type="email"
                         name="email"
                         [(ngModel)]="form.email"
                         required
                         email
                         #emailField="ngModel"
                         [placeholder]="t.isFr ? 'exemple@email.com' : 'example@email.com'">
                </div>
                <div class="auth-field-hint" *ngIf="emailField.touched && emailField.invalid">
                  {{ t.isFr ? 'Veuillez entrer un email valide' : 'Please enter a valid email' }}
                </div>
              </div>

              <!-- Mot de passe -->
              <div class="auth-form-group">
                <label>{{ t.isFr ? 'Mot de passe' : 'Password' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-lock auth-input-icon"></i>
                  <input [type]="showPassword ? 'text' : 'password'"
                         name="motDePasse"
                         [(ngModel)]="form.motDePasse"
                         required
                         minlength="8"
                         #mdpField="ngModel"
                         [placeholder]="t.isFr ? 'Minimum 8 caractères' : 'Minimum 8 characters'"
                         style="padding-right: 42px;">
                  <button type="button" class="auth-toggle-pwd" (click)="showPassword = !showPassword">
                    <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
                <div class="auth-field-hint" *ngIf="mdpField.touched && mdpField.invalid">
                  {{ t.isFr ? 'Le mot de passe doit contenir au moins 8 caractères' : 'Password must be at least 8 characters' }}
                </div>
                <!-- Password strength -->
                <div class="auth-pwd-strength" *ngIf="form.motDePasse">
                  <div class="auth-pwd-bar-track">
                    <div class="auth-pwd-bar-fill" [ngClass]="getPasswordStrength()"></div>
                  </div>
                  <span class="auth-pwd-label" [ngClass]="getPasswordStrength()">
                    {{ getPasswordStrengthLabel() }}
                  </span>
                </div>
              </div>

              <!-- Confirmation mot de passe -->
              <div class="auth-form-group">
                <label>{{ t.isFr ? 'Confirmer le mot de passe' : 'Confirm password' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-shield-lock auth-input-icon"></i>
                  <input [type]="showConfirmPassword ? 'text' : 'password'"
                         name="confirmationMotDePasse"
                         [(ngModel)]="form.confirmationMotDePasse"
                         required
                         #confirmField="ngModel"
                         [placeholder]="t.isFr ? 'Retapez le mot de passe' : 'Re-enter your password'"
                         style="padding-right: 42px;">
                  <button type="button" class="auth-toggle-pwd" (click)="showConfirmPassword = !showConfirmPassword">
                    <i class="bi" [ngClass]="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                </div>
                <div class="auth-field-hint" *ngIf="confirmField.touched && form.confirmationMotDePasse && form.motDePasse !== form.confirmationMotDePasse">
                  {{ t.isFr ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match' }}
                </div>
              </div>

              <!-- Submit -->
              <button type="submit"
                      class="auth-submit-btn"
                      [disabled]="enCours || inscriptionForm.invalid || form.motDePasse !== form.confirmationMotDePasse">
                <span class="auth-spinner" *ngIf="enCours"></span>
                <span *ngIf="!enCours">
                  <i class="bi bi-person-plus-fill" style="margin-right:6px;"></i>
                  {{ t.isFr ? "S'inscrire" : 'Sign up' }}
                </span>
                <span *ngIf="enCours">
                  {{ t.isFr ? 'Inscription en cours...' : 'Signing up...' }}
                </span>
              </button>

            </form>

          </div>
        </div>

        <!-- Links OUTSIDE card (on gradient background) -->
        <div class="auth-footer">
          {{ t.isFr ? 'Vous avez un compte ?' : 'Already have an account?' }}
          <a routerLink="/connexion">{{ t.isFr ? 'Connectez-vous' : 'Sign in' }}</a>
        </div>

        <!-- Legal -->
        <div class="auth-footer" style="margin-top: 28px; font-size: 0.72rem; opacity: 0.5;">
          &copy; 2026 PharmaCare &middot; Conditions &middot; {{ t.isFr ? 'Confidentialit&eacute;' : 'Privacy' }}
        </div>

      </div>
    </div>
  `
})
export class InscriptionComponent {

  form: InscriptionRequest = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmationMotDePasse: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  enCours = false;
  erreur = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public t: TraductionService
  ) {}

  getPasswordStrength(): 'weak' | 'medium' | 'strong' {
    const pwd = this.form.motDePasse;
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

  onSubmit(formRef: any): void {
    if (formRef.invalid) return;

    if (this.form.motDePasse !== this.form.confirmationMotDePasse) {
      this.erreur = this.t.isFr
        ? 'Les mots de passe ne correspondent pas'
        : 'Passwords do not match';
      return;
    }

    this.enCours = true;
    this.erreur = '';

    this.authService.inscription(this.form).subscribe({
      next: (res: any) => {
        if (res.autoVerified && res.accessToken) {
          // Email failed — account auto-verified, auto-login
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('utilisateur', JSON.stringify({
            email: res.email, nom: this.form.nom, prenom: this.form.prenom, role: 'UTILISATEUR'
          }));
          this.router.navigate(['/']);
          return;
        }
        // Email sent — go to verification page
        this.router.navigate(['/verifier-email'], { queryParams: { email: res.email } });
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 0) {
          this.erreur = this.t.isFr
            ? 'Service temporairement indisponible. Veuillez réessayer dans quelques instants.'
            : 'Service temporarily unavailable. Please try again shortly.';
        } else {
          this.erreur = err.error?.message
            || (this.t.isFr ? 'Une erreur est survenue lors de l\'inscription.' : 'An error occurred during registration.');
        }
      }
    });
  }
}
