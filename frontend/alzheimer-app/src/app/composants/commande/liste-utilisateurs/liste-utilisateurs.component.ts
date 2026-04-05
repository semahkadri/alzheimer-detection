import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../../modeles/auth.model';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header d-flex justify-content-between align-items-center">
        <div>
          <h2 class="page-title">
            <i class="bi bi-people me-2 text-gradient"></i>{{ t.isFr ? 'Gestion des Utilisateurs' : 'User Management' }}
          </h2>
          <p class="page-subtitle">{{ utilisateursFiltres.length }} {{ utilisateursFiltres.length !== 1 ? (t.isFr ? 'utilisateurs' : 'users') : (t.isFr ? 'utilisateur' : 'user') }} {{ t.isFr ? 'au total' : 'total' }}</p>
        </div>
        <a routerLink="/admin/utilisateurs/ajouter" class="btn btn-primary">
          <i class="bi bi-person-plus me-2"></i>{{ t.isFr ? 'Nouvel utilisateur' : 'New user' }}
        </a>
      </div>

      <!-- Messages -->
      <div *ngIf="message" class="alert" [ngClass]="messageType === 'success' ? 'alert-success' : 'alert-danger'" role="alert">
        <i class="bi me-2" [ngClass]="messageType === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
        {{ message }}
        <button type="button" class="btn-close float-end" (click)="message = ''"></button>
      </div>

      <!-- Loading -->
      <div *ngIf="chargement" class="loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ t.isFr ? 'Chargement...' : 'Loading...' }}</span>
        </div>
      </div>

      <!-- Content -->
      <div *ngIf="!chargement">
        <!-- Filter Bar -->
        <div class="card mb-3">
          <div class="card-body py-3">
            <div class="filter-bar">
              <div class="search-input">
                <i class="bi bi-search"></i>
                <input type="text" class="form-control"
                       [placeholder]="t.isFr ? 'Rechercher par nom ou email...' : 'Search by name or email...'"
                       [(ngModel)]="recherche" (ngModelChange)="filtrer()">
              </div>
              <select class="form-select" style="width: auto; min-width: 180px;"
                      [(ngModel)]="filtreRole" (ngModelChange)="filtrer()">
                <option value="">{{ t.isFr ? 'Tous les rôles' : 'All roles' }}</option>
                <option value="ADMIN">Admin</option>
                <option value="UTILISATEUR">{{ t.isFr ? 'Utilisateur' : 'User' }}</option>
              </select>
              <span class="text-muted" style="font-size: 0.82rem; white-space: nowrap;">
                {{ utilisateursFiltres.length }} {{ t.isFr ? 'résultats' : 'results' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="card">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>{{ t.isFr ? 'Nom' : 'Name' }}</th>
                    <th>Email</th>
                    <th>{{ t.isFr ? 'Rôle' : 'Role' }}</th>
                    <th>{{ t.isFr ? 'Statut' : 'Status' }}</th>
                    <th>Date</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="utilisateursFiltres.length === 0">
                    <td colspan="6" class="text-center">
                      <div class="empty-state">
                        <i class="bi bi-people d-block"></i>
                        <p>{{ t.isFr ? 'Aucun utilisateur trouvé' : 'No users found' }}</p>
                      </div>
                    </td>
                  </tr>
                  <tr *ngFor="let u of utilisateursPage">
                    <td><span class="fw-semibold">{{ u.prenom }} {{ u.nom }}</span></td>
                    <td><small class="text-muted">{{ u.email }}</small></td>
                    <td>
                      <span class="cmd-badge" [ngClass]="u.role === 'ADMIN' ? 'cmd-confirmee' : 'cmd-livree'">
                        <i class="bi" [ngClass]="u.role === 'ADMIN' ? 'bi-shield-lock' : 'bi-person'"></i>
                        {{ u.role === 'ADMIN' ? 'Admin' : (t.isFr ? 'Utilisateur' : 'User') }}
                      </span>
                    </td>
                    <td>
                      <span class="cmd-badge" [ngClass]="u.actif ? 'cmd-livree' : 'cmd-annulee'">
                        {{ u.actif ? (t.isFr ? 'Actif' : 'Active') : (t.isFr ? 'Inactif' : 'Inactive') }}
                      </span>
                    </td>
                    <td>{{ u.dateCreation | date:'dd/MM/yyyy' }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-1" (click)="toggleRole(u)"
                              [title]="u.role === 'ADMIN' ? (t.isFr ? 'Retirer admin' : 'Remove admin') : (t.isFr ? 'Promouvoir admin' : 'Make admin')">
                        <i class="bi" [ngClass]="u.role === 'ADMIN' ? 'bi-person-dash' : 'bi-person-up'"></i>
                      </button>
                      <button class="btn btn-sm me-1" [ngClass]="u.actif ? 'btn-outline-warning' : 'btn-outline-success'"
                              (click)="toggleActif(u)">
                        <i class="bi" [ngClass]="u.actif ? 'bi-toggle-on' : 'bi-toggle-off'"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" (click)="supprimer(u)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div *ngIf="totalPages > 1" class="pagination-wrapper">
              <div class="pagination-info">
                {{ t.isFr ? 'Affichage' : 'Showing' }} {{ debut + 1 }}-{{ fin }} {{ t.isFr ? 'sur' : 'of' }} {{ utilisateursFiltres.length }}
              </div>
              <div class="pagination-controls">
                <button (click)="page = page - 1; paginer()" [disabled]="page === 1"><i class="bi bi-chevron-left"></i></button>
                <button *ngFor="let p of pages" (click)="page = p; paginer()" [class.active]="p === page">{{ p }}</button>
                <button (click)="page = page + 1; paginer()" [disabled]="page === totalPages"><i class="bi bi-chevron-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `
})
export class ListeUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  utilisateursFiltres: Utilisateur[] = [];
  utilisateursPage: Utilisateur[] = [];
  message = '';
  messageType = '';
  chargement = true;
  recherche = '';
  filtreRole = '';

  page = 1;
  parPage = 10;
  totalPages = 1;
  pages: number[] = [];
  debut = 0;
  fin = 0;

  constructor(
    private authService: AuthService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.chargement = true;
    this.authService.listerUtilisateurs().subscribe({
      next: (data) => { this.utilisateurs = data; this.filtrer(); this.chargement = false; },
      error: () => { this.message = this.t.isFr ? 'Erreur de chargement' : 'Loading error'; this.messageType = 'error'; this.chargement = false; }
    });
  }

  filtrer(): void {
    const q = this.recherche.toLowerCase().trim();
    this.utilisateursFiltres = this.utilisateurs.filter(u => {
      const matchQ = !q || u.nom.toLowerCase().includes(q) || u.prenom.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole = !this.filtreRole || u.role === this.filtreRole;
      return matchQ && matchRole;
    });
    this.page = 1;
    this.paginer();
  }

  paginer(): void {
    this.totalPages = Math.max(1, Math.ceil(this.utilisateursFiltres.length / this.parPage));
    if (this.page > this.totalPages) this.page = this.totalPages;
    this.debut = (this.page - 1) * this.parPage;
    this.fin = Math.min(this.debut + this.parPage, this.utilisateursFiltres.length);
    this.utilisateursPage = this.utilisateursFiltres.slice(this.debut, this.fin);
    const max = 5;
    let start = Math.max(1, this.page - Math.floor(max / 2));
    let end = start + max - 1;
    if (end > this.totalPages) { end = this.totalPages; start = Math.max(1, end - max + 1); }
    this.pages = [];
    for (let i = start; i <= end; i++) this.pages.push(i);
  }

  // ── Actions ──
  toggleRole(u: Utilisateur): void {
    const newRole = u.role === 'ADMIN' ? 'UTILISATEUR' : 'ADMIN';
    const msg = u.role === 'ADMIN'
      ? (this.t.isFr ? `Retirer admin de ${u.prenom} ${u.nom} ?` : `Remove admin from ${u.prenom} ${u.nom}?`)
      : (this.t.isFr ? `Promouvoir ${u.prenom} ${u.nom} en admin ?` : `Promote ${u.prenom} ${u.nom} to admin?`);
    if (!confirm(msg)) return;
    this.authService.changerRole(u.id, newRole).subscribe({
      next: (updated) => { const i = this.utilisateurs.findIndex(x => x.id === u.id); if (i !== -1) this.utilisateurs[i] = updated; this.filtrer(); this.message = this.t.isFr ? 'Rôle mis à jour' : 'Role updated'; this.messageType = 'success'; },
      error: () => { this.message = this.t.isFr ? 'Erreur' : 'Error'; this.messageType = 'error'; }
    });
  }

  toggleActif(u: Utilisateur): void {
    this.authService.activerDesactiver(u.id, !u.actif).subscribe({
      next: (updated) => { const i = this.utilisateurs.findIndex(x => x.id === u.id); if (i !== -1) this.utilisateurs[i] = updated; this.filtrer(); this.message = updated.actif ? (this.t.isFr ? 'Activé' : 'Activated') : (this.t.isFr ? 'Désactivé' : 'Deactivated'); this.messageType = 'success'; },
      error: () => { this.message = this.t.isFr ? 'Erreur' : 'Error'; this.messageType = 'error'; }
    });
  }

  supprimer(u: Utilisateur): void {
    if (!confirm(this.t.isFr ? `Supprimer ${u.prenom} ${u.nom} ?` : `Delete ${u.prenom} ${u.nom}?`)) return;
    this.authService.supprimerUtilisateur(u.id).subscribe({
      next: () => { this.utilisateurs = this.utilisateurs.filter(x => x.id !== u.id); this.filtrer(); this.message = this.t.isFr ? 'Supprimé' : 'Deleted'; this.messageType = 'success'; },
      error: () => { this.message = this.t.isFr ? 'Erreur' : 'Error'; this.messageType = 'error'; }
    });
  }
}
