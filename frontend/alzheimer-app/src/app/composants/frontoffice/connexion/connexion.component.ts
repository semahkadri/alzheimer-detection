import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';
import { ConnexionRequest } from '../../../modeles/auth.model';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <style>
      /* ── Auth layout ────────────────────────────────────── */
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        position: relative;
        overflow: hidden;
      }

      /* Background handled by global .auth-page styles */

      /* ── Wrapper ────────────────────────────────────────── */
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

      /* ── Branding (clickable, centered) ──────────────────── */
      .auth-branding {
        display: block;
        text-align: center;
        margin-bottom: 2rem;
        text-decoration: none;
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
        color: #fff;
        letter-spacing: -.3px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      /* ── Card ────────────────────────────────────────────── */
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

      /* ── Alert ───────────────────────────────────────────── */
      .auth-alert {
        display: flex;
        align-items: center;
        gap: .625rem;
        padding: .75rem 1rem;
        border-radius: 8px;
        background: rgba(220, 53, 69, .08);
        border: 1px solid rgba(220, 53, 69, .2);
        color: var(--danger, #dc3545);
        font-size: .875rem;
        margin-bottom: 1.25rem;
        animation: authFadeIn .3s ease-out;
      }

      .auth-alert i {
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      /* ── Form group ─────────────────────────────────────── */
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

      /* ── Forgot password ────────────────────────────────── */
      .auth-forgot-row {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      }

      .auth-forgot-link {
        font-family: 'Inter', sans-serif;
        font-size: .8125rem;
        font-weight: 500;
        color: var(--primary);
        text-decoration: none;
        transition: opacity .2s;
      }

      .auth-forgot-link:hover {
        opacity: .8;
        text-decoration: underline;
      }

      /* ── Submit button ──────────────────────────────────── */
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

      /* ── Footer link (white on gradient background) ────── */
      .auth-footer {
        text-align: center;
        margin-top: 1.75rem;
        font-family: 'Inter', sans-serif;
        font-size: .875rem;
        color: rgba(255,255,255,0.75);
      }

      .auth-footer a {
        color: #fff;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: opacity .2s;
      }

      .auth-footer a:hover {
        opacity: .8;
      }

      /* ── Validation hint ────────────────────────────────── */
      .auth-hint {
        font-size: .75rem;
        color: var(--danger, #dc3545);
        margin-top: .3rem;
        padding-left: .125rem;
      }

      /* ── Responsive ─────────────────────────────────────── */
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

        <!-- Branding (clickable → back to store, like Amazon) -->
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
            <h1>{{ t.isFr ? 'Connexion' : 'Login' }}</h1>
            <p>{{ t.isFr ? 'Accedez a votre espace personnel' : 'Access your personal space' }}</p>
          </div>

          <!-- Body -->
          <div class="auth-card-body">

            <!-- Error message -->
            <div class="auth-alert" *ngIf="erreur">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ erreur }}</span>
            </div>

            <form #f="ngForm" (ngSubmit)="onConnexion(f)">

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

              <!-- Password -->
              <div class="auth-form-group">
                <label for="motDePasse">{{ t.isFr ? 'Mot de passe' : 'Password' }}</label>
                <div class="auth-input-group">
                  <i class="bi bi-lock auth-input-icon"></i>
                  <input
                    id="motDePasse"
                    [type]="showPassword ? 'text' : 'password'"
                    class="auth-input"
                    [placeholder]="t.isFr ? 'Votre mot de passe' : 'Your password'"
                    [(ngModel)]="motDePasse"
                    name="motDePasse"
                    required
                    minlength="6"
                    #mdpField="ngModel"
                    autocomplete="current-password"
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
                  {{ t.isFr ? 'Le mot de passe doit contenir au moins 6 caracteres.' : 'Password must be at least 6 characters.' }}
                </div>
              </div>

              <!-- Forgot password -->
              <div class="auth-forgot-row">
                <a routerLink="/mot-de-passe-oublie" class="auth-forgot-link">
                  {{ t.isFr ? 'Mot de passe oublié ?' : 'Forgot password?' }}
                </a>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="auth-submit"
                [disabled]="f.invalid || enCours"
              >
                <span class="auth-spinner" *ngIf="enCours"></span>
                {{ enCours
                    ? (t.isFr ? 'Connexion...' : 'Signing in...')
                    : (t.isFr ? 'Se connecter' : 'Sign in')
                }}
              </button>

            </form>
          </div>
        </div>

        <!-- Switch to register -->
        <div class="auth-footer">
          {{ t.isFr ? 'Nouveau client ?' : 'New customer?' }}
          <a routerLink="/inscription">{{ t.isFr ? 'Commencez ici' : 'Start here' }}</a>
        </div>

        <!-- Legal mini-footer -->
        <div class="auth-footer" style="margin-top: 28px; font-size: 0.72rem; opacity: 0.5;">
          &copy; 2026 PharmaCare &middot; Conditions &middot; {{ t.isFr ? 'Confidentialit&eacute;' : 'Privacy' }}
        </div>

      </div>
    </div>
  `
})
export class ConnexionComponent {

  email = '';
  motDePasse = '';
  showPassword = false;
  enCours = false;
  erreur = '';

  private redirectUrl = '/';

  constructor(
    public t: TraductionService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirect') || '/';
  }

  onConnexion(form: NgForm): void {
    if (form.invalid) return;

    this.erreur = '';
    this.enCours = true;

    const request: ConnexionRequest = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.authService.connexion(request).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigateByUrl(this.redirectUrl);
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 0) {
          this.erreur = this.t.isFr
            ? 'Service temporairement indisponible. Veuillez réessayer dans quelques instants.'
            : 'Service temporarily unavailable. Please try again shortly.';
        } else {
          this.erreur = err?.error?.message
            || (this.t.isFr
                ? 'Email ou mot de passe incorrect.'
                : 'Incorrect email or password.');
        }
      }
    });
  }
}
