import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Categorie } from '../../../modeles/categorie.model';
import { CategorieService } from '../../../services/categorie.service';

@Component({
  selector: 'app-liste-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">
        <i class="bi bi-tags me-2"></i>Gestion des Catégories
      </h2>
      <a routerLink="/categories/ajouter" class="btn btn-primary">
        <i class="bi bi-plus-circle me-1"></i>Nouvelle Catégorie
      </a>
    </div>

    <div *ngIf="message" class="alert" [ngClass]="messageType === 'success' ? 'alert-success' : 'alert-danger'"
         role="alert">
      {{ message }}
      <button type="button" class="btn-close float-end" (click)="message = ''"></button>
    </div>

    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Nb. Produits</th>
                <th>Date Création</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="categories.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">
                  <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                  Aucune catégorie trouvée
                </td>
              </tr>
              <tr *ngFor="let categorie of categories">
                <td>{{ categorie.id }}</td>
                <td class="fw-semibold">{{ categorie.nom }}</td>
                <td>{{ categorie.description }}</td>
                <td>
                  <span class="badge bg-info badge-stock">{{ categorie.nombreProduits }}</span>
                </td>
                <td>{{ categorie.dateCreation | date:'dd/MM/yyyy HH:mm' }}</td>
                <td class="text-center">
                  <a [routerLink]="['/categories/modifier', categorie.id]"
                     class="btn btn-sm btn-warning me-2">
                    <i class="bi bi-pencil"></i> Modifier
                  </a>
                  <button class="btn btn-sm btn-danger"
                          (click)="confirmerSuppression(categorie)">
                    <i class="bi bi-trash"></i> Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation -->
    <div *ngIf="categorieASupprimer" class="modal fade show d-block" tabindex="-1"
         style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <i class="bi bi-exclamation-triangle me-2"></i>Confirmation de suppression
            </h5>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer la catégorie
              <strong>{{ categorieASupprimer.nom }}</strong> ?</p>
            <p class="text-danger mb-0">
              <small>Cette action est irréversible et supprimera tous les produits associés.</small>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="categorieASupprimer = null">Annuler</button>
            <button class="btn btn-danger" (click)="supprimer()">
              <i class="bi bi-trash me-1"></i>Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListeCategoriesComponent implements OnInit {
  categories: Categorie[] = [];
  message = '';
  messageType = '';
  categorieASupprimer: Categorie | null = null;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories(): void {
    this.categorieService.listerTout().subscribe({
      next: (data) => this.categories = data,
      error: (err) => {
        this.message = 'Erreur lors du chargement des catégories';
        this.messageType = 'error';
        console.error(err);
      }
    });
  }

  confirmerSuppression(categorie: Categorie): void {
    this.categorieASupprimer = categorie;
  }

  supprimer(): void {
    if (this.categorieASupprimer?.id) {
      this.categorieService.supprimer(this.categorieASupprimer.id).subscribe({
        next: () => {
          this.message = `Catégorie "${this.categorieASupprimer?.nom}" supprimée avec succès`;
          this.messageType = 'success';
          this.categorieASupprimer = null;
          this.chargerCategories();
        },
        error: (err) => {
          this.message = 'Erreur lors de la suppression';
          this.messageType = 'error';
          this.categorieASupprimer = null;
          console.error(err);
        }
      });
    }
  }
}
