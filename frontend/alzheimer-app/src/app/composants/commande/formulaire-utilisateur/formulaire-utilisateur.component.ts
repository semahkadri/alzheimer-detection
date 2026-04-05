import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-formulaire-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <h2 class="page-title">
          <i class="bi bi-person-plus me-2 text-gradient"></i>
          {{ t.isFr ? 'Nouvel Utilisateur' : 'New User' }}
        </h2>
        <p class="page-subtitle">{{ t.isFr ? 'Cr\u00e9er un nouveau compte utilisateur' : 'Create a new user account' }}</p>
      </div>

      <!-- Error Message -->
      <div *ngIf="erreur" class="alert alert-danger mb-3">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ erreur }}
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header card-header-gradient">
              <h5 class="mb-0">
                <i class="bi bi-person-plus me-2"></i>{{ t.isFr ? 'Informations de l\\'utilisateur' : 'User Information' }}
              </h5>
            </div>
            <div class="card-body">
              <form #formulaire="ngForm" (ngSubmit)="sauvegarder()">

                <!-- ── Nom ── -->
                <div class="mb-3">
                  <label for="nom" class="form-label fw-semibold">
                    <i class="bi bi-person me-1"></i>{{ t.isFr ? 'Nom' : 'Last Name' }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="nom" name="nom"
                         [(ngModel)]="form.nom" required minlength="2" maxlength="60"
                         #nom="ngModel" [placeholder]="t.isFr ? 'Entrez le nom' : 'Enter last name'"
                         [ngClass]="{'is-invalid': nom.invalid && nom.touched,
                                     'is-valid':   nom.valid  && nom.touched}">
                  <ng-container *ngIf="nom.touched && nom.invalid">
                    <div class="co-field-error" *ngIf="nom.errors?.['required']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le nom est obligatoire' : 'Last name is required' }}
                    </div>
                    <div class="co-field-error" *ngIf="nom.errors?.['minlength']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le nom doit contenir au moins 2 caract\u00e8res' : 'Last name must be at least 2 characters' }}
                    </div>
                  </ng-container>
                  <div class="co-field-valid" *ngIf="nom.valid && nom.touched">
                    <i class="bi bi-check-circle-fill me-1"></i>{{ t.isFr ? 'Nom valide' : 'Valid last name' }}
                  </div>
                </div>

                <!-- ── Pr\u00e9nom ── -->
                <div class="mb-3">
                  <label for="prenom" class="form-label fw-semibold">
                    <i class="bi bi-person-badge me-1"></i>{{ t.isFr ? 'Pr\u00e9nom' : 'First Name' }} <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="prenom" name="prenom"
                         [(ngModel)]="form.prenom" required minlength="2" maxlength="60"
                         #prenom="ngModel" [placeholder]="t.isFr ? 'Entrez le pr\u00e9nom' : 'Enter first name'"
                         [ngClass]="{'is-invalid': prenom.invalid && prenom.touched,
                                     'is-valid':   prenom.valid  && prenom.touched}">
                  <ng-container *ngIf="prenom.touched && prenom.invalid">
                    <div class="co-field-error" *ngIf="prenom.errors?.['required']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le pr\u00e9nom est obligatoire' : 'First name is required' }}
                    </div>
                    <div class="co-field-error" *ngIf="prenom.errors?.['minlength']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le pr\u00e9nom doit contenir au moins 2 caract\u00e8res' : 'First name must be at least 2 characters' }}
                    </div>
                  </ng-container>
                  <div class="co-field-valid" *ngIf="prenom.valid && prenom.touched">
                    <i class="bi bi-check-circle-fill me-1"></i>{{ t.isFr ? 'Pr\u00e9nom valide' : 'Valid first name' }}
                  </div>
                </div>

                <!-- ── Email ── -->
                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold">
                    <i class="bi bi-envelope me-1"></i>{{ t.isFr ? 'Email' : 'Email' }} <span class="text-danger">*</span>
                  </label>
                  <input type="email" class="form-control" id="email" name="email"
                         [(ngModel)]="form.email" required email
                         #email="ngModel" [placeholder]="t.isFr ? 'Entrez l\\'adresse email' : 'Enter email address'"
                         [ngClass]="{'is-invalid': email.invalid && email.touched,
                                     'is-valid':   email.valid  && email.touched}">
                  <ng-container *ngIf="email.touched && email.invalid">
                    <div class="co-field-error" *ngIf="email.errors?.['required']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'L\\'email est obligatoire' : 'Email is required' }}
                    </div>
                    <div class="co-field-error" *ngIf="email.errors?.['email']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'L\\'email n\\'est pas valide' : 'Email is not valid' }}
                    </div>
                  </ng-container>
                  <div class="co-field-valid" *ngIf="email.valid && email.touched">
                    <i class="bi bi-check-circle-fill me-1"></i>{{ t.isFr ? 'Email valide' : 'Valid email' }}
                  </div>
                </div>

                <!-- ── Mot de passe ── -->
                <div class="mb-3">
                  <label for="motDePasse" class="form-label fw-semibold">
                    <i class="bi bi-lock me-1"></i>{{ t.isFr ? 'Mot de passe' : 'Password' }} <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <input [type]="showPassword ? 'text' : 'password'" class="form-control" id="motDePasse" name="motDePasse"
                           [(ngModel)]="form.motDePasse" required minlength="8"
                           #motDePasse="ngModel" [placeholder]="t.isFr ? 'Entrez le mot de passe' : 'Enter password'"
                           [ngClass]="{'is-invalid': motDePasse.invalid && motDePasse.touched,
                                       'is-valid':   motDePasse.valid  && motDePasse.touched}">
                    <button type="button" class="btn btn-outline-secondary" (click)="showPassword = !showPassword">
                      <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                    </button>
                  </div>
                  <ng-container *ngIf="motDePasse.touched && motDePasse.invalid">
                    <div class="co-field-error" *ngIf="motDePasse.errors?.['required']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le mot de passe est obligatoire' : 'Password is required' }}
                    </div>
                    <div class="co-field-error" *ngIf="motDePasse.errors?.['minlength']">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>{{ t.isFr ? 'Le mot de passe doit contenir au moins 8 caract\u00e8res' : 'Password must be at least 8 characters' }}
                    </div>
                  </ng-container>
                  <div class="co-field-valid" *ngIf="motDePasse.valid && motDePasse.touched">
                    <i class="bi bi-check-circle-fill me-1"></i>{{ t.isFr ? 'Mot de passe valide' : 'Valid password' }}
                  </div>
                </div>

                <!-- ── R\u00f4le ── -->
                <div class="mb-3">
                  <label for="role" class="form-label fw-semibold">
                    <i class="bi bi-shield me-1"></i>{{ t.isFr ? 'R\u00f4le' : 'Role' }}
                  </label>
                  <select class="form-control" id="role" name="role"
                          [(ngModel)]="form.role" #role="ngModel"
                          [ngClass]="{'is-valid': role.touched}">
                    <option value="UTILISATEUR">{{ t.isFr ? 'Utilisateur' : 'User' }}</option>
                    <option value="ADMIN">{{ t.isFr ? 'Administrateur' : 'Administrator' }}</option>
                  </select>
                </div>

                <!-- ── Statut ── -->
                <div class="mb-4">
                  <label class="form-label fw-semibold">
                    <i class="bi bi-toggle-on me-1"></i>{{ t.isFr ? 'Statut' : 'Status' }}
                  </label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="actif" name="actif"
                           [(ngModel)]="form.actif" role="switch">
                    <label class="form-check-label" for="actif">
                      {{ form.actif ? (t.isFr ? 'Actif' : 'Active') : (t.isFr ? 'Inactif' : 'Inactive') }}
                    </label>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <a routerLink="/admin/utilisateurs" class="btn-ghost-nav">
                    <i class="bi bi-arrow-left"></i>{{ t.isFr ? 'Retour' : 'Back' }}
                  </a>
                  <button type="submit" class="btn btn-primary"
                          [disabled]="formulaire.invalid || enCours">
                    <span *ngIf="enCours" class="spinner-border spinner-border-sm me-1"></span>
                    <i *ngIf="!enCours" class="bi bi-check-lg me-1"></i>
                    {{ t.isFr ? 'Cr\u00e9er' : 'Create' }}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FormulaireUtilisateurComponent {
  form = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    role: 'UTILISATEUR',
    actif: true
  };

  enCours = false;
  erreur = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public t: TraductionService
  ) {}

  sauvegarder(): void {
    this.enCours = true;
    this.erreur = '';

    this.authService.creerUtilisateur({
      nom: this.form.nom,
      prenom: this.form.prenom,
      email: this.form.email,
      motDePasse: this.form.motDePasse,
      role: this.form.role
    }).subscribe({
      next: () => this.router.navigate(['/admin/utilisateurs']),
      error: (err) => {
        this.enCours = false;
        this.erreur = err.error?.message || (this.t.isFr ? 'Erreur lors de la cr\u00e9ation de l\'utilisateur' : 'Error creating user');
      }
    });
  }
}
