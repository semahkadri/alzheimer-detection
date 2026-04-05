import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';
import { Utilisateur } from '../../../modeles/auth.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="fo-section">
      <div class="fo-section-container fade-in">

        <!-- Breadcrumb -->
        <div class="fo-breadcrumb">
          <a routerLink="/"><i class="bi bi-house-door"></i></a>
          <i class="bi bi-chevron-right fo-breadcrumb-sep"></i>
          <span class="fo-breadcrumb-current">{{ t.isFr ? 'Mon Profil' : 'My Profile' }}</span>
        </div>

        <h1 class="fo-page-title"><i class="bi bi-person-circle me-2"></i>{{ t.isFr ? 'Mon Profil' : 'My Profile' }}</h1>
        <p class="fo-page-subtitle">{{ t.isFr ? 'Gerez vos informations personnelles et la securite de votre compte' : 'Manage your personal information and account security' }}</p>

        <div class="row g-4">

          <!-- Left Column: Profile Info -->
          <div class="col-lg-8">
            <div class="card profil-card">
              <div class="profil-card-header">
                <i class="bi bi-person-badge me-2"></i>{{ t.isFr ? 'Mon Profil' : 'My Profile' }}
              </div>
              <div class="card-body p-4">

                <!-- Avatar + Name Display -->
                <div class="profil-avatar-section">
                  <div class="profil-avatar">
                    {{ getInitiales() }}
                  </div>
                  <div class="profil-avatar-info">
                    <h4 class="profil-user-name" *ngIf="utilisateur">{{ utilisateur.prenom }} {{ utilisateur.nom }}</h4>
                    <span class="profil-role-badge" [class.profil-role-admin]="utilisateur?.role === 'ADMIN'" [class.profil-role-user]="utilisateur?.role === 'UTILISATEUR'">
                      <i class="bi" [ngClass]="utilisateur?.role === 'ADMIN' ? 'bi-shield-check' : 'bi-person'"></i>
                      {{ utilisateur?.role }}
                    </span>
                    <div class="profil-member-since" *ngIf="utilisateur?.dateCreation">
                      <i class="bi bi-calendar3 me-1"></i>
                      {{ t.isFr ? 'Membre depuis' : 'Member since' }} {{ utilisateur!.dateCreation | date:'mediumDate' }}
                    </div>
                  </div>
                </div>

                <hr class="profil-divider">

                <!-- Profile Fields -->
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="profil-label">{{ t.isFr ? 'Nom' : 'Last Name' }}</label>
                    <div class="profil-field-wrapper">
                      <i class="bi bi-person profil-field-icon"></i>
                      <input *ngIf="editMode" type="text" class="profil-input" [(ngModel)]="nom">
                      <div *ngIf="!editMode" class="profil-field-value">{{ utilisateur?.nom }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="profil-label">{{ t.isFr ? 'Prenom' : 'First Name' }}</label>
                    <div class="profil-field-wrapper">
                      <i class="bi bi-person profil-field-icon"></i>
                      <input *ngIf="editMode" type="text" class="profil-input" [(ngModel)]="prenom">
                      <div *ngIf="!editMode" class="profil-field-value">{{ utilisateur?.prenom }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="profil-label">{{ t.isFr ? 'Adresse email' : 'Email Address' }}</label>
                    <div class="profil-field-wrapper profil-field-disabled">
                      <i class="bi bi-envelope profil-field-icon"></i>
                      <div class="profil-field-value">{{ utilisateur?.email }}</div>
                      <i class="bi bi-lock profil-field-lock"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="profil-label">{{ t.isFr ? 'Role' : 'Role' }}</label>
                    <div class="profil-field-wrapper profil-field-disabled">
                      <i class="bi bi-shield profil-field-icon"></i>
                      <div class="profil-field-value">
                        <span class="profil-role-badge" [class.profil-role-admin]="utilisateur?.role === 'ADMIN'" [class.profil-role-user]="utilisateur?.role === 'UTILISATEUR'">
                          {{ utilisateur?.role }}
                        </span>
                      </div>
                      <i class="bi bi-lock profil-field-lock"></i>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex flex-wrap gap-2 mt-4">
                  <button *ngIf="!editMode" class="btn btn-outline-primary" (click)="activerEdition()">
                    <i class="bi bi-pencil-square me-2"></i>{{ t.isFr ? 'Modifier le profil' : 'Edit Profile' }}
                  </button>
                  <ng-container *ngIf="editMode">
                    <button class="btn btn-primary" (click)="sauvegarderProfil()" [disabled]="enCoursProfil">
                      <span *ngIf="enCoursProfil" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!enCoursProfil" class="bi bi-check-lg me-2"></i>
                      {{ t.isFr ? 'Sauvegarder' : 'Save Changes' }}
                    </button>
                    <button class="btn btn-secondary" (click)="annulerEdition()">
                      <i class="bi bi-x-lg me-2"></i>{{ t.isFr ? 'Annuler' : 'Cancel' }}
                    </button>
                  </ng-container>
                </div>

                <!-- Profile Messages -->
                <div *ngIf="messageProfil" class="alert alert-success mt-3">
                  <i class="bi bi-check-circle-fill me-2"></i>{{ messageProfil }}
                </div>
                <div *ngIf="erreurProfil" class="alert alert-danger mt-3">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ erreurProfil }}
                </div>

              </div>
            </div>
          </div>

          <!-- Right Column: Security -->
          <div class="col-lg-4">
            <div class="card profil-card">
              <div class="profil-card-header">
                <i class="bi bi-shield-lock me-2"></i>{{ t.isFr ? 'Securite' : 'Security' }}
              </div>
              <div class="card-body p-4">
                <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.25rem;">
                  {{ t.isFr ? 'Modifier votre mot de passe pour securiser votre compte.' : 'Change your password to keep your account secure.' }}
                </p>

                <div class="mb-3">
                  <label class="profil-label">{{ t.isFr ? 'Ancien mot de passe' : 'Current Password' }}</label>
                  <div class="profil-field-wrapper">
                    <i class="bi bi-key profil-field-icon"></i>
                    <input type="password" class="profil-input" [(ngModel)]="ancienMotDePasse">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="profil-label">{{ t.isFr ? 'Nouveau mot de passe' : 'New Password' }}</label>
                  <div class="profil-field-wrapper">
                    <i class="bi bi-lock profil-field-icon"></i>
                    <input type="password" class="profil-input" [(ngModel)]="nouveauMotDePasse">
                  </div>
                  <small *ngIf="nouveauMotDePasse && nouveauMotDePasse.length < 8" style="font-size:0.78rem; color:var(--text-secondary); display:block; margin-top:4px;">
                    <i class="bi bi-info-circle me-1"></i>{{ t.isFr ? 'Minimum 8 caracteres requis' : 'Minimum 8 characters required' }}
                  </small>
                </div>

                <div class="mb-3">
                  <label class="profil-label">{{ t.isFr ? 'Confirmer le mot de passe' : 'Confirm Password' }}</label>
                  <div class="profil-field-wrapper">
                    <i class="bi bi-lock-fill profil-field-icon"></i>
                    <input type="password" class="profil-input" [(ngModel)]="confirmationMotDePasse">
                  </div>
                  <small *ngIf="confirmationMotDePasse && nouveauMotDePasse !== confirmationMotDePasse" style="font-size:0.78rem; color:var(--danger); display:block; margin-top:4px;">
                    <i class="bi bi-x-circle me-1"></i>{{ t.isFr ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match' }}
                  </small>
                </div>

                <button class="btn btn-primary w-100" (click)="changerMotDePasse()" [disabled]="enCoursMdp">
                  <span *ngIf="enCoursMdp" class="spinner-border spinner-border-sm me-2"></span>
                  <i *ngIf="!enCoursMdp" class="bi bi-shield-check me-2"></i>
                  {{ t.isFr ? 'Changer le mot de passe' : 'Change Password' }}
                </button>

                <div *ngIf="messageMdp" class="alert alert-success mt-3 py-2" style="font-size:0.85rem;">
                  <i class="bi bi-check-circle-fill me-2"></i>{{ messageMdp }}
                </div>
                <div *ngIf="erreurMdp" class="alert alert-danger mt-3 py-2" style="font-size:0.85rem;">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ erreurMdp }}
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom: Account Actions -->
        <div class="card mt-4">
          <div class="card-body p-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h6 class="mb-1 fw-bold" style="color:var(--text-primary);">
                <i class="bi bi-gear me-2"></i>{{ t.isFr ? 'Actions du compte' : 'Account Actions' }}
              </h6>
              <small style="color:var(--text-secondary);">{{ t.isFr ? 'Gerez votre session et votre compte' : 'Manage your session and account' }}</small>
            </div>
            <div class="d-flex align-items-center gap-3">
              <span class="profil-role-badge" [class.profil-role-admin]="utilisateur?.role === 'ADMIN'" [class.profil-role-user]="utilisateur?.role === 'UTILISATEUR'">
                <i class="bi" [ngClass]="utilisateur?.role === 'ADMIN' ? 'bi-shield-check' : 'bi-person'"></i>
                {{ utilisateur?.role === 'ADMIN' ? (t.isFr ? 'Administrateur' : 'Administrator') : (t.isFr ? 'Utilisateur' : 'User') }}
              </span>
              <button class="btn btn-outline-danger" (click)="authService.deconnexion()">
                <i class="bi bi-box-arrow-right me-2"></i>{{ t.isFr ? 'Deconnexion' : 'Logout' }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ProfilComponent implements OnInit, OnDestroy {
  utilisateur: Utilisateur | null = null;
  editMode = false;
  nom = '';
  prenom = '';

  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';

  messageProfil = '';
  erreurProfil = '';
  messageMdp = '';
  erreurMdp = '';

  enCoursProfil = false;
  enCoursMdp = false;

  private sub!: Subscription;

  constructor(
    public authService: AuthService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.utilisateur$.subscribe(u => {
      this.utilisateur = u;
      if (u) {
        this.nom = u.nom;
        this.prenom = u.prenom;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getInitiales(): string {
    if (!this.utilisateur) return '?';
    return (this.utilisateur.prenom?.charAt(0) || '') .toUpperCase() + (this.utilisateur.nom?.charAt(0) || '').toUpperCase();
  }

  activerEdition(): void {
    this.editMode = true;
    this.messageProfil = '';
    this.erreurProfil = '';
    if (this.utilisateur) { this.nom = this.utilisateur.nom; this.prenom = this.utilisateur.prenom; }
  }

  annulerEdition(): void {
    this.editMode = false;
    this.messageProfil = '';
    this.erreurProfil = '';
    if (this.utilisateur) { this.nom = this.utilisateur.nom; this.prenom = this.utilisateur.prenom; }
  }

  sauvegarderProfil(): void {
    if (!this.nom.trim() || !this.prenom.trim()) {
      this.erreurProfil = this.t.isFr ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.';
      return;
    }
    this.enCoursProfil = true;
    this.messageProfil = '';
    this.erreurProfil = '';
    this.authService.modifierProfil(this.nom.trim(), this.prenom.trim()).subscribe({
      next: () => {
        this.enCoursProfil = false;
        this.editMode = false;
        this.messageProfil = this.t.isFr ? 'Profil mis a jour avec succes !' : 'Profile updated successfully!';
      },
      error: (err) => {
        this.enCoursProfil = false;
        this.erreurProfil = err.error?.message || (this.t.isFr ? 'Erreur lors de la mise a jour.' : 'Failed to update profile.');
      }
    });
  }

  changerMotDePasse(): void {
    this.messageMdp = '';
    this.erreurMdp = '';
    if (!this.ancienMotDePasse || !this.nouveauMotDePasse || !this.confirmationMotDePasse) {
      this.erreurMdp = this.t.isFr ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.';
      return;
    }
    if (this.nouveauMotDePasse.length < 8) {
      this.erreurMdp = this.t.isFr ? 'Le mot de passe doit contenir au moins 8 caracteres.' : 'Password must be at least 8 characters.';
      return;
    }
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.erreurMdp = this.t.isFr ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.';
      return;
    }
    this.enCoursMdp = true;
    this.authService.changerMotDePasse(this.ancienMotDePasse, this.nouveauMotDePasse).subscribe({
      next: () => {
        this.enCoursMdp = false;
        this.messageMdp = this.t.isFr ? 'Mot de passe change avec succes !' : 'Password changed successfully!';
        this.ancienMotDePasse = '';
        this.nouveauMotDePasse = '';
        this.confirmationMotDePasse = '';
      },
      error: (err) => {
        this.enCoursMdp = false;
        this.erreurMdp = err.error?.message || (this.t.isFr ? 'Erreur lors du changement.' : 'Failed to change password.');
      }
    });
  }
}
