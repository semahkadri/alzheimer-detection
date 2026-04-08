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
    <div class="auth-page">
      <div style="width:100%; max-width:460px; position:relative; z-index:1; margin:0 auto;">

        <!-- Brand -->
        <a routerLink="/" style="display:block; text-align:center; margin-bottom:28px; text-decoration:none;">
          <div class="auth-brand-icon" style="width:56px; height:56px; border-radius:16px; display:inline-flex; align-items:center; justify-content:center; font-size:1.6rem; color:#fff; margin-bottom:12px;">
            <i class="bi bi-heart-pulse-fill"></i>
          </div>
          <div class="auth-brand-name" style="font-size:1.5rem; font-weight:700;">PharmaCare</div>
        </a>

        <!-- Card -->
        <div class="auth-card" style="border-radius:16px; overflow:hidden;">
          <div class="auth-card-header" style="padding:24px 28px 18px;">
            <h2 style="font-size:1.3rem; font-weight:700; margin:0 0 4px; color:#fff;">
              <i class="bi bi-envelope-check me-2"></i>{{ t.isFr ? 'Verification email' : 'Email Verification' }}
            </h2>
            <p style="font-size:0.85rem; margin:0; color:rgba(255,255,255,0.85);">
              {{ t.isFr ? 'Entrez le code a 6 chiffres' : 'Enter the 6-digit code' }}
            </p>
          </div>

          <div style="padding:28px;">
            <!-- Email -->
            <div class="text-center">
              <span style="display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:8px; background:rgba(78,128,238,0.08); color:var(--primary,#4E80EE); font-weight:600; font-size:0.88rem; margin-bottom:8px;">
                <i class="bi bi-envelope"></i>{{ email }}
              </span>
            </div>

            <!-- Check email message -->
            <div *ngIf="!mailError" style="background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(78,128,238,0.08)); border:1px dashed rgba(16,185,129,0.3); border-radius:10px; padding:12px 16px; margin:16px 0; font-size:0.82rem;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <i class="bi bi-envelope-check-fill" style="color:#10B981; font-size:1.1rem;"></i>
                <strong style="color:var(--text-primary);">{{ t.isFr ? 'Consultez votre email' : 'Check your inbox' }}</strong>
              </div>
              <div style="color:var(--text-secondary);">{{ t.isFr ? 'Un code a 6 chiffres a ete envoye. Verifiez aussi vos spams.' : 'A 6-digit code was sent. Check spam too.' }}</div>
            </div>

            <!-- Messages -->
            <div *ngIf="erreur" style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:8px; padding:10px 14px; color:#ef4444; font-size:0.85rem; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <i class="bi bi-exclamation-triangle-fill"></i>{{ erreur }}
            </div>
            <div *ngIf="succes" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:8px; padding:10px 14px; color:#10B981; font-size:0.85rem; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <i class="bi bi-check-circle-fill"></i>{{ succes }}
            </div>
            <div *ngIf="resendMsg" style="background:rgba(78,128,238,0.08); border:1px solid rgba(78,128,238,0.2); border-radius:8px; padding:10px 14px; color:var(--primary,#4E80EE); font-size:0.85rem; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <i class="bi bi-check-circle-fill"></i>{{ resendMsg }}
            </div>

            <!-- 6-digit code boxes -->
            <div style="position:relative; margin:24px 0;" (click)="focusInput()">
              <input #hiddenInput
                     style="position:absolute; opacity:0; width:100%; height:62px; top:0; left:0; z-index:2; font-size:16px;"
                     type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code"
                     [(ngModel)]="codeValue" (ngModelChange)="onCodeChange()" (keydown.enter)="verifier()">
              <div style="display:flex; gap:10px; justify-content:center;">
                <div *ngFor="let i of [0,1,2,3,4,5]"
                     style="width:52px; height:62px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; font-weight:700; font-family:monospace; border-radius:12px; transition:all 0.2s; pointer-events:none;"
                     [style.border]="erreur ? '2px solid #ef4444' : codeValue.length === i ? '2px solid var(--primary,#4E80EE)' : codeValue.length > i ? '2px solid var(--primary,#4E80EE)' : '2px solid var(--border,#e2e8f0)'"
                     [style.background]="codeValue.length > i ? 'rgba(78,128,238,0.04)' : 'var(--bg-main,#f8fafc)'"
                     [style.box-shadow]="codeValue.length === i ? '0 0 0 3px rgba(78,128,238,0.15)' : 'none'"
                     [style.color]="'var(--text-primary,#0f172a)'">
                  {{ codeValue[i] || '' }}
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button style="width:100%; padding:12px; border:none; border-radius:10px; font-size:0.95rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg,var(--primary,#4E80EE),#10B981); color:#fff; box-shadow:0 4px 14px rgba(78,128,238,0.3); transition:all 0.2s;"
                    (click)="verifier()" [disabled]="enCours || codeValue.length < 6"
                    [style.opacity]="enCours || codeValue.length < 6 ? '0.6' : '1'">
              <span *ngIf="enCours" style="width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.6s linear infinite;"></span>
              <i *ngIf="!enCours" class="bi bi-shield-check"></i>
              {{ enCours ? (t.isFr ? 'Verification...' : 'Verifying...') : (t.isFr ? 'Verifier mon compte' : 'Verify my account') }}
            </button>

            <!-- Resend -->
            <div class="text-center mt-3" style="font-size:0.82rem; color:var(--text-secondary);">
              {{ t.isFr ? 'Code non recu ?' : 'No code?' }}
              <a (click)="renvoyerCode()" style="color:var(--primary,#4E80EE); font-weight:600; cursor:pointer; text-decoration:none;"
                 [style.opacity]="resendCooldown > 0 ? '0.5' : '1'"
                 [style.pointer-events]="resendCooldown > 0 ? 'none' : 'auto'">
                {{ resendCooldown > 0 ? (t.isFr ? 'Renvoyer (' + resendCooldown + 's)' : 'Resend (' + resendCooldown + 's)') : (t.isFr ? 'Renvoyer le code' : 'Resend code') }}
              </a>
            </div>
          </div>
        </div>

        <!-- Footer (same as login/signup) -->
        <div style="text-align:center; margin-top:20px; font-size:0.85rem; color:rgba(255,255,255,0.75);">
          {{ t.isFr ? 'Vous avez un compte ?' : 'Have an account?' }}
          <a routerLink="/connexion" style="color:#fff; font-weight:600; text-decoration:underline;">{{ t.isFr ? 'Connectez-vous' : 'Sign in' }}</a>
        </div>
        <div style="text-align:center; margin-top:28px; font-size:0.72rem; color:rgba(255,255,255,0.5);">
          &copy; 2026 PharmaCare &middot; Conditions &middot; {{ t.isFr ? 'Confidentialit&eacute;' : 'Privacy' }}
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
  resendMsg = '';
  resendCooldown = 0;
  private cooldownInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    // Code is NEVER shown on frontend — only via email
    this.mailError = this.route.snapshot.queryParamMap.get('mailError') || '';
    if (!this.email) this.router.navigate(['/inscription']);
    setTimeout(() => this.focusInput(), 300);
  }

  focusInput(): void {
    this.hiddenInput?.nativeElement?.focus();
  }

  onCodeChange(): void {
    this.codeValue = this.codeValue.replace(/\D/g, '').slice(0, 6);
    this.erreur = '';
    if (this.codeValue.length === 6) setTimeout(() => this.verifier(), 200);
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

  renvoyerCode(): void {
    if (this.resendCooldown > 0) return;
    this.resendMsg = '';
    this.erreur = '';
    this.authService.renvoyerCode(this.email).subscribe({
      next: () => {
        this.devCode = ''; // Never show code on screen
        this.resendMsg = this.t.isFr ? 'Nouveau code envoye ! Consultez votre email.' : 'New code sent! Check your email.';
        this.startCooldown();
        setTimeout(() => this.resendMsg = '', 5000);
      },
      error: (err) => {
        this.erreur = err.error?.message || (this.t.isFr ? 'Erreur lors du renvoi.' : 'Error resending.');
      }
    });
  }

  private startCooldown(): void {
    this.resendCooldown = 60;
    clearInterval(this.cooldownInterval);
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) clearInterval(this.cooldownInterval);
    }, 1000);
  }
}
