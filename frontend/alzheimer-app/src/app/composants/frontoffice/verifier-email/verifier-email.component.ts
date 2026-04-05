import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
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
      .auth-brand { text-align: center; margin-bottom: 28px; }
      .auth-brand-icon { width: 56px; height: 56px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fff; margin-bottom: 12px; }
      .auth-card { border-radius: 16px; overflow: hidden; }
      .auth-card-header { padding: 24px 28px 18px; }
      .auth-card-header h2 { font-size: 1.3rem; font-weight: 700; margin: 0 0 4px; color: #fff; }
      .auth-card-header p { font-size: 0.85rem; margin: 0; opacity: 0.85; color: rgba(255,255,255,0.85); }
      .auth-card-body { padding: 28px; }
      .auth-footer { text-align: center; margin-top: 20px; font-size: 0.85rem; }
      .auth-footer a { font-weight: 600; text-decoration: none; }

      /* ── Code inputs (6 digits) ── */
      .ve-code-row { display: flex; gap: 10px; justify-content: center; margin: 24px 0; }
      .ve-code-input {
        width: 52px; height: 62px;
        text-align: center; font-size: 1.6rem; font-weight: 700; font-family: 'Inter', monospace;
        border: 2px solid var(--border, #e2e8f0); border-radius: 12px;
        background: var(--bg-main, #f8fafc); color: var(--text-primary, #0f172a);
        outline: none; transition: border-color 0.2s, box-shadow 0.2s;
      }
      .ve-code-input:focus {
        border-color: var(--primary, #4E80EE);
        box-shadow: 0 0 0 3px rgba(78,128,238,0.15);
      }
      .ve-code-input.ve-filled { border-color: var(--primary, #4E80EE); background: rgba(78,128,238,0.04); }
      .ve-code-input.ve-error { border-color: #ef4444; background: rgba(239,68,68,0.04); }

      /* ── Email display ── */
      .ve-email { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; background: rgba(78,128,238,0.08); color: var(--primary, #4E80EE); font-weight: 600; font-size: 0.88rem; margin-bottom: 8px; }

      /* ── Demo banner ── */
      .ve-demo-banner {
        background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(78,128,238,0.1));
        border: 1px dashed rgba(16,185,129,0.3); border-radius: 10px;
        padding: 12px 16px; margin-bottom: 20px; font-size: 0.82rem; color: var(--text-secondary);
      }
      .ve-demo-code { font-size: 1.5rem; font-weight: 800; letter-spacing: 6px; color: var(--primary, #4E80EE); font-family: 'Inter', monospace; }

      /* ── Submit ── */
      .ve-submit {
        width: 100%; padding: 12px; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 600;
        cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
        transition: all 0.2s;
      }
      .ve-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      .ve-submit-primary { background: linear-gradient(135deg, var(--primary, #4E80EE), #10B981); color: #fff; box-shadow: 0 4px 14px rgba(78,128,238,0.3); }
      .ve-spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: veSpin 0.6s linear infinite; }
      @keyframes veSpin { to { transform: rotate(360deg); } }

      /* ── Messages ── */
      .ve-error-msg { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 8px; padding: 10px 14px; color: #ef4444; font-size: 0.85rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
      .ve-success-msg { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 8px; padding: 10px 14px; color: #10B981; font-size: 0.85rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

      @media (max-width: 480px) { .ve-code-input { width: 44px; height: 54px; font-size: 1.3rem; } .ve-code-row { gap: 6px; } }
    </style>

    <div class="auth-page">
      <div class="auth-container">

        <!-- Brand (clickable → back to store) -->
        <a routerLink="/" class="auth-brand" style="text-decoration:none; display:block;">
          <div class="auth-brand-icon"><i class="bi bi-heart-pulse-fill"></i></div>
          <div class="auth-brand-name">PharmaCare</div>
        </a>

        <!-- Card -->
        <div class="auth-card">
          <div class="auth-card-header">
            <h2><i class="bi bi-envelope-check me-2"></i>{{ t.isFr ? 'Vérification email' : 'Email Verification' }}</h2>
            <p>{{ t.isFr ? 'Entrez le code à 6 chiffres envoyé à votre adresse email' : 'Enter the 6-digit code sent to your email address' }}</p>
          </div>

          <div class="auth-card-body">
            <!-- Email display -->
            <div class="text-center">
              <span class="ve-email"><i class="bi bi-envelope"></i>{{ email }}</span>
            </div>

            <!-- Email sent successfully — no code shown -->
            <div class="ve-demo-banner" *ngIf="!devCode && !mailError">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
                <i class="bi bi-envelope-check-fill" style="color:#10B981;"></i>
                <strong>{{ t.isFr ? 'Consultez votre boîte email' : 'Check your inbox' }}</strong>
              </div>
              <div>{{ t.isFr ? 'Nous avons envoyé un code à 6 chiffres. Vérifiez aussi vos spams.' : 'We sent a 6-digit code. Check your spam folder too.' }}</div>
            </div>

            <!-- Email failed — show retry option -->
            <div *ngIf="mailError" class="ve-error-msg" style="margin-bottom:12px;">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <span>{{ t.isFr ? "Erreur lors de l'envoi. Veuillez r&eacute;essayer." : 'Sending failed. Please try again.' }}</span>
            </div>

            <!-- Error -->
            <div class="ve-error-msg" *ngIf="erreur"><i class="bi bi-exclamation-triangle-fill"></i>{{ erreur }}</div>
            <!-- Success -->
            <div class="ve-success-msg" *ngIf="succes"><i class="bi bi-check-circle-fill"></i>{{ succes }}</div>

            <!-- 6-digit code inputs -->
            <div class="ve-code-row">
              <input *ngFor="let d of digits; let i = index"
                     #codeInput
                     type="text" inputmode="numeric" maxlength="1"
                     class="ve-code-input"
                     [class.ve-filled]="digits[i] !== ''"
                     [class.ve-error]="erreur"
                     [value]="digits[i]"
                     (keydown)="onKeyDown($event, i)"
                     (paste)="onPaste($event)"
                     autocomplete="off">
            </div>

            <!-- Submit -->
            <button class="ve-submit ve-submit-primary"
                    (click)="verifier()"
                    [disabled]="enCours || getCode().length < 6">
              <span class="ve-spinner" *ngIf="enCours"></span>
              <i *ngIf="!enCours" class="bi bi-shield-check"></i>
              {{ enCours ? (t.isFr ? 'Vérification...' : 'Verifying...') : (t.isFr ? 'Vérifier mon compte' : 'Verify my account') }}
            </button>

            <!-- Resend -->
            <div class="text-center mt-3" style="font-size:0.82rem; color:var(--text-secondary);">
              {{ t.isFr ? 'Code non reçu ?' : 'Didn\\'t receive the code?' }}
              <a routerLink="/inscription" style="color:var(--primary, #4E80EE); font-weight:600; text-decoration:none;">
                {{ t.isFr ? 'Renvoyer' : 'Resend' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="auth-footer">
          <a routerLink="/connexion">{{ t.isFr ? 'Retour à la connexion' : 'Back to login' }}</a>
          <span style="margin: 0 8px; opacity:0.4;">|</span>
          <a routerLink="/" style="opacity:0.7; font-weight:400;">
            <i class="bi bi-arrow-left me-1"></i>{{ t.isFr ? 'Boutique' : 'Store' }}
          </a>
        </div>

      </div>
    </div>
  `
})
export class VerifierEmailComponent implements OnInit {
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  email = '';
  devCode = '';
  mailError = '';
  digits = ['', '', '', '', '', ''];
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
  }

  getCode(): string {
    return this.digits.join('');
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const inputs = this.codeInputs.toArray();
    this.erreur = '';

    // Digit keys (0-9)
    if (event.key >= '0' && event.key <= '9') {
      event.preventDefault();
      this.digits[index] = event.key;
      inputs[index].nativeElement.value = event.key;
      if (index < 5) {
        inputs[index + 1].nativeElement.focus();
      }
      if (this.getCode().length === 6) {
        this.verifier();
      }
      return;
    }

    // Backspace
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.digits[index]) {
        this.digits[index] = '';
        inputs[index].nativeElement.value = '';
      } else if (index > 0) {
        this.digits[index - 1] = '';
        inputs[index - 1].nativeElement.value = '';
        inputs[index - 1].nativeElement.focus();
      }
      return;
    }

    // Delete
    if (event.key === 'Delete') {
      event.preventDefault();
      this.digits[index] = '';
      inputs[index].nativeElement.value = '';
      return;
    }

    // Arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputs[index - 1].nativeElement.focus();
    }
    if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      inputs[index + 1].nativeElement.focus();
    }

    // Block all other keys except Tab
    if (event.key !== 'Tab') {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    for (let i = 0; i < 6; i++) {
      this.digits[i] = pasted[i] || '';
    }
    if (pasted.length === 6) {
      const inputs = this.codeInputs.toArray();
      inputs[5]?.nativeElement.focus();
      this.verifier();
    }
  }

  verifier(): void {
    const code = this.getCode();
    if (code.length < 6) return;

    this.enCours = true;
    this.erreur = '';

    this.authService.verifierCode(this.email, code).subscribe({
      next: () => {
        this.succes = this.t.isFr ? 'Email vérifié ! Redirection...' : 'Email verified! Redirecting...';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.enCours = false;
        this.digits = ['', '', '', '', '', ''];
        this.erreur = err.error?.message
          || (this.t.isFr ? 'Code incorrect. Veuillez réessayer.' : 'Incorrect code. Please try again.');
        // Refocus first input
        setTimeout(() => this.codeInputs?.first?.nativeElement.focus(), 100);
      }
    });
  }
}
