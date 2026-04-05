import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-verifier-email',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <style>
      .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
      .auth-container { width: 100%; max-width: 460px; position: relative; z-index: 1; }
      .auth-brand { text-align: center; margin-bottom: 28px; display: block; text-decoration: none; }
      .auth-brand-icon { width: 56px; height: 56px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; margin-bottom: 12px; }
      .auth-card { border-radius: 16px; overflow: hidden; }
      .auth-card-header { padding: 24px 28px 18px; }
      .auth-card-header h2 { font-size: 1.3rem; font-weight: 700; margin: 0 0 4px; color: #fff; }
      .auth-card-header p { font-size: 0.85rem; margin: 0; opacity: 0.85; color: rgba(255,255,255,0.85); }
      .auth-card-body { padding: 28px; }
      .auth-footer { text-align: center; margin-top: 20px; font-size: 0.85rem; color: rgba(255,255,255,0.75); }
      .auth-footer a { font-weight: 600; text-decoration: underline; color: #fff; }
      .ve-email { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; background: rgba(78,128,238,0.08); color: var(--primary, #4E80EE); font-weight: 600; font-size: 0.88rem; margin-bottom: 8px; }
      .ve-demo-banner { background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(78,128,238,0.1)); border: 1px dashed rgba(16,185,129,0.3); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 0.82rem; color: var(--text-secondary); }
      .ve-demo-code { font-size: 1.5rem; font-weight: 800; letter-spacing: 6px; color: var(--primary, #4E80EE); font-family: 'Inter', monospace; }
      .ve-error-msg { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 8px; padding: 10px 14px; color: #ef4444; font-size: 0.85rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
      .ve-success-msg { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 8px; padding: 10px 14px; color: #10B981; font-size: 0.85rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

      /* ── OTP display boxes (read-only visual) ── */
      .ve-code-wrapper { position: relative; margin: 24px 0; }
      .ve-code-hidden { position: absolute; opacity: 0; width: 100%; height: 62px; top: 0; left: 0; z-index: 2; font-size: 16px; letter-spacing: 40px; }
      .ve-code-boxes { display: flex; gap: 10px; justify-content: center; }
      .ve-code-box {
        width: 52px; height: 62px; display: flex; align-items: center; justify-content: center;
        font-size: 1.6rem; font-weight: 700; font-family: 'Inter', monospace;
        border: 2px solid var(--border, #e2e8f0); border-radius: 12px;
        background: var(--bg-main, #f8fafc); color: var(--text-primary, #0f172a);
        transition: border-color 0.2s, background 0.2s;
        pointer-events: none;
      }
      .ve-code-box.ve-active { border-color: var(--primary, #4E80EE); box-shadow: 0 0 0 3px rgba(78,128,238,0.15); }
      .ve-code-box.ve-filled { border-color: var(--primary, #4E80EE); background: rgba(78,128,238,0.04); }
      .ve-code-box.ve-error-box { border-color: #ef4444; }

      .ve-submit { width: 100%; padding: 12px; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
      .ve-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      .ve-submit-primary { background: linear-gradient(135deg, var(--primary, #4E80EE), #10B981); color: #fff; box-shadow: 0 4px 14px rgba(78,128,238,0.3); }
      .ve-spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: veSpin 0.6s linear infinite; }
      @keyframes veSpin { to { transform: rotate(360deg); } }

      @media (max-width: 420px) { .ve-code-box { width: 42px; height: 52px; font-size: 1.3rem; } .ve-code-boxes { gap: 6px; } }
      @media (max-width: 350px) { .ve-code-box { width: 36px; height: 48px; font-size: 1.1rem; } .ve-code-boxes { gap: 3px; } }
    </style>

    <div class="auth-page">
      <div class="auth-container">

        <a routerLink="/" class="auth-brand">
          <div class="auth-brand-icon"><i class="bi bi-heart-pulse-fill"></i></div>
          <div class="auth-brand-name">PharmaCare</div>
        </a>

        <div class="auth-card">
          <div class="auth-card-header">
            <h2><i class="bi bi-envelope-check me-2"></i>{{ t.isFr ? 'Verification email' : 'Email Verification' }}</h2>
            <p>{{ t.isFr ? 'Entrez le code a 6 chiffres' : 'Enter the 6-digit code' }}</p>
          </div>

          <div class="auth-card-body">
            <div class="text-center">
              <span class="ve-email"><i class="bi bi-envelope"></i>{{ email }}</span>
            </div>

            <!-- Code provided — show it beautifully -->
            <div class="ve-demo-banner" *ngIf="devCode" style="border: 1px solid rgba(78,128,238,0.2); background: linear-gradient(135deg, rgba(78,128,238,0.06), rgba(16,185,129,0.06));">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                <i class="bi bi-shield-lock-fill" style="color:#4E80EE; font-size:1.1rem;"></i>
                <strong style="color:var(--text-primary);">{{ t.isFr ? 'Votre code de verification' : 'Your verification code' }}</strong>
              </div>
              <div class="ve-demo-code text-center">{{ devCode }}</div>
              <div style="text-align:center; margin-top:8px; font-size:0.75rem; color:var(--text-secondary);">
                {{ t.isFr ? 'Saisissez ce code ci-dessous pour activer votre compte' : 'Enter this code below to activate your account' }}
              </div>
            </div>

            <!-- No code — check email -->
            <div class="ve-demo-banner" *ngIf="!devCode && !mailError">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <i class="bi bi-envelope-check-fill" style="color:#10B981; font-size:1.1rem;"></i>
                <strong style="color:var(--text-primary);">{{ t.isFr ? 'Consultez votre email' : 'Check your inbox' }}</strong>
              </div>
              <div>{{ t.isFr ? 'Un code a 6 chiffres a ete envoye. Verifiez aussi vos spams.' : 'A 6-digit code was sent. Check spam too.' }}</div>
            </div>

            <div *ngIf="erreur" class="ve-error-msg"><i class="bi bi-exclamation-triangle-fill"></i>{{ erreur }}</div>
            <div *ngIf="succes" class="ve-success-msg"><i class="bi bi-check-circle-fill"></i>{{ succes }}</div>

            <!-- Single hidden input + 6 visual boxes -->
            <div class="ve-code-wrapper" (click)="focusInput()">
              <input #hiddenInput
                     class="ve-code-hidden"
                     type="text" inputmode="numeric"
                     maxlength="6"
                     autocomplete="one-time-code"
                     [(ngModel)]="codeValue"
                     (ngModelChange)="onCodeChange()"
                     (keydown.enter)="verifier()">
              <div class="ve-code-boxes">
                <div *ngFor="let i of [0,1,2,3,4,5]"
                     class="ve-code-box"
                     [class.ve-filled]="codeValue.length > i"
                     [class.ve-active]="codeValue.length === i"
                     [class.ve-error-box]="erreur">
                  {{ codeValue[i] || '' }}
                </div>
              </div>
            </div>

            <button class="ve-submit ve-submit-primary"
                    (click)="verifier()"
                    [disabled]="enCours || codeValue.length < 6">
              <span class="ve-spinner" *ngIf="enCours"></span>
              <i *ngIf="!enCours" class="bi bi-shield-check"></i>
              {{ enCours ? (t.isFr ? 'Verification...' : 'Verifying...') : (t.isFr ? 'Verifier mon compte' : 'Verify my account') }}
            </button>

            <div class="text-center mt-3" style="font-size:0.82rem; color:var(--text-secondary);">
              {{ t.isFr ? 'Code non recu ?' : 'No code?' }}
              <a routerLink="/inscription" style="color:var(--primary, #4E80EE); font-weight:600; text-decoration:none;">
                {{ t.isFr ? 'Renvoyer' : 'Resend' }}
              </a>
            </div>
          </div>
        </div>

        <div class="auth-footer">
          <a routerLink="/connexion">{{ t.isFr ? 'Connexion' : 'Login' }}</a>
          <span style="margin: 0 8px; opacity:0.4;">|</span>
          <a routerLink="/" style="opacity:0.7;">{{ t.isFr ? 'Boutique' : 'Store' }}</a>
        </div>

      </div>
    </div>
  `
})
export class VerifierEmailComponent implements OnInit {
  @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;

  email = '';
  devCode = '';
  mailError = '';
  codeValue = '';
  enCours = false;
  erreur = '';
  succes = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.devCode = this.route.snapshot.queryParamMap.get('code') || '';
    this.mailError = this.route.snapshot.queryParamMap.get('mailError') || '';
    if (!this.email) {
      this.router.navigate(['/inscription']);
    }
    setTimeout(() => this.focusInput(), 300);
  }

  focusInput(): void {
    this.hiddenInput?.nativeElement?.focus();
  }

  onCodeChange(): void {
    // Keep only digits, max 6
    this.codeValue = this.codeValue.replace(/\D/g, '').slice(0, 6);
    this.erreur = '';
    // Auto-submit when 6 digits entered
    if (this.codeValue.length === 6) {
      setTimeout(() => this.verifier(), 200);
    }
  }

  verifier(): void {
    if (this.codeValue.length < 6 || this.enCours) return;
    this.enCours = true;
    this.erreur = '';

    this.authService.verifierCode(this.email, this.codeValue).subscribe({
      next: () => {
        this.succes = this.t.isFr ? 'Email verifie ! Redirection...' : 'Email verified! Redirecting...';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.enCours = false;
        this.codeValue = '';
        this.erreur = err.error?.message || (this.t.isFr ? 'Code incorrect.' : 'Wrong code.');
        setTimeout(() => this.focusInput(), 100);
      }
    });
  }
}
