import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../../modeles/produit.model';
import { Categorie } from '../../../modeles/categorie.model';
import { ProduitService } from '../../../services/produit.service';
import { CategorieService } from '../../../services/categorie.service';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">
        <i class="bi bi-box-seam me-2"></i>Gestion des Produits
      </h2>
      <a routerLink="/produits/ajouter" class="btn btn-primary">
        <i class="bi bi-plus-circle me-1"></i>Nouveau Produit
      </a>
    </div>

    <div *ngIf="message" class="alert" [ngClass]="messageType === 'success' ? 'alert-success' : 'alert-danger'"
         role="alert">
      {{ message }}
      <button type="button" class="btn-close float-end" (click)="message = ''"></button>
    </div>

    <!-- Filtre par catégorie -->
    <div class="card mb-3">
      <div class="card-body py-2">
        <div class="row align-items-center">
          <div class="col-auto">
            <label class="form-label mb-0 fw-semibold">Filtrer par catégorie :</label>
          </div>
          <div class="col-md-4">
            <select class="form-select form-select-sm" [(ngModel)]="filtreCategorie"
                    (ngModelChange)="filtrer()">
              <option [ngValue]="0">Toutes les catégories</option>
              <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.nom }}</option>
            </select>
          </div>
        </div>
      </div>
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
                <th>Prix (TND)</th>
                <th>Quantité</th>
                <th>Catégorie</th>
                <th>Date Création</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="produits.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">
                  <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                  Aucun produit trouvé
                </td>
              </tr>
              <tr *ngFor="let produit of produits">
                <td>{{ produit.id }}</td>
                <td class="fw-semibold">{{ produit.nom }}</td>
                <td>{{ produit.description }}</td>
                <td>{{ produit.prix | number:'1.2-2' }}</td>
                <td>
                  <span class="badge badge-stock"
                        [ngClass]="produit.quantite > 10 ? 'bg-success' : produit.quantite > 0 ? 'bg-warning' : 'bg-danger'">
                    {{ produit.quantite }}
                  </span>
                </td>
                <td>
                  <span class="badge bg-secondary">{{ produit.categorieNom }}</span>
                </td>
                <td>{{ produit.dateCreation | date:'dd/MM/yyyy HH:mm' }}</td>
                <td class="text-center">
                  <a [routerLink]="['/produits/modifier', produit.id]"
                     class="btn btn-sm btn-warning me-2">
                    <i class="bi bi-pencil"></i> Modifier
                  </a>
                  <button class="btn btn-sm btn-danger"
                          (click)="confirmerSuppression(produit)">
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
    <div *ngIf="produitASupprimer" class="modal fade show d-block" tabindex="-1"
         style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <i class="bi bi-exclamation-triangle me-2"></i>Confirmation de suppression
            </h5>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer le produit
              <strong>{{ produitASupprimer.nom }}</strong> ?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="produitASupprimer = null">Annuler</button>
            <button class="btn btn-danger" (click)="supprimer()">
              <i class="bi bi-trash me-1"></i>Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListeProduitsComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  message = '';
  messageType = '';
  produitASupprimer: Produit | null = null;
  filtreCategorie = 0;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
  }

  chargerProduits(): void {
    this.produitService.listerTout().subscribe({
      next: (data) => this.produits = data,
      error: (err) => {
        this.message = 'Erreur lors du chargement des produits';
        this.messageType = 'error';
        console.error(err);
      }
    });
  }

  chargerCategories(): void {
    this.categorieService.listerTout().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  filtrer(): void {
    if (this.filtreCategorie === 0) {
      this.chargerProduits();
    } else {
      this.produitService.listerParCategorie(this.filtreCategorie).subscribe({
        next: (data) => this.produits = data,
        error: (err) => console.error(err)
      });
    }
  }

  confirmerSuppression(produit: Produit): void {
    this.produitASupprimer = produit;
  }

  supprimer(): void {
    if (this.produitASupprimer?.id) {
      this.produitService.supprimer(this.produitASupprimer.id).subscribe({
        next: () => {
          this.message = `Produit "${this.produitASupprimer?.nom}" supprimé avec succès`;
          this.messageType = 'success';
          this.produitASupprimer = null;
          this.filtrer();
        },
        error: (err) => {
          this.message = 'Erreur lors de la suppression';
          this.messageType = 'error';
          this.produitASupprimer = null;
          console.error(err);
        }
      });
    }
  }
}
