import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../services/produit.service';
import { CategorieService } from '../../../services/categorie.service';
import { Produit } from '../../../modeles/produit.model';
import { Categorie } from '../../../modeles/categorie.model';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="fo-section">
      <div class="fo-section-container">
        <h1 class="fo-page-title">Catalogue des Produits</h1>
        <p class="fo-page-subtitle">Parcourez l'ensemble de nos produits disponibles en stock.</p>

        <!-- Filters Row -->
        <div class="fo-filter-bar">
          <div class="fo-search-box">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Rechercher un produit..."
                   [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()">
          </div>
          <select class="fo-filter-select" [(ngModel)]="selectedCategory" (ngModelChange)="applyFilters()">
            <option [ngValue]="0">Toutes les catégories</option>
            <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.nom }}</option>
          </select>
          <select class="fo-filter-select fo-filter-stock" [(ngModel)]="selectedStock" (ngModelChange)="applyFilters()">
            <option value="tous">Tout le stock</option>
            <option value="en-stock">En stock (&gt; 10)</option>
            <option value="faible">Stock faible (1-10)</option>
            <option value="rupture">Rupture de stock</option>
          </select>
        </div>

        <!-- Toolbar: Sort + Results Count -->
        <div class="fo-toolbar" *ngIf="!loading">
          <div class="fo-toolbar-left">
            <span class="fo-results-count">
              <strong>{{ filteredProducts.length }}</strong> produit{{ filteredProducts.length !== 1 ? 's' : '' }} trouvé{{ filteredProducts.length !== 1 ? 's' : '' }}
              <span *ngIf="hasActiveFilters()" class="fo-results-filtered">
                (filtré{{ filteredProducts.length !== 1 ? 's' : '' }})
                <button class="fo-clear-filters" (click)="resetFilters()">
                  <i class="bi bi-x-circle"></i> Tout effacer
                </button>
              </span>
            </span>
          </div>
          <div class="fo-toolbar-right">
            <div class="fo-sort-control">
              <label><i class="bi bi-sort-down me-1"></i>Trier par</label>
              <select [(ngModel)]="sortBy" (ngModelChange)="applySort()">
                <option value="nom-asc">Nom A → Z</option>
                <option value="nom-desc">Nom Z → A</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="date-desc">Plus récents</option>
                <option value="date-asc">Plus anciens</option>
                <option value="stock-desc">Stock décroissant</option>
                <option value="stock-asc">Stock croissant</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filters Chips -->
        <div class="fo-filter-chips" *ngIf="hasActiveFilters()">
          <span class="fo-chip" *ngIf="searchTerm">
            Recherche : « {{ searchTerm }} »
            <button (click)="searchTerm = ''; applyFilters()"><i class="bi bi-x"></i></button>
          </span>
          <span class="fo-chip" *ngIf="selectedCategory">
            Catégorie : {{ getCategoryName(selectedCategory) }}
            <button (click)="selectedCategory = 0; applyFilters()"><i class="bi bi-x"></i></button>
          </span>
          <span class="fo-chip" *ngIf="selectedStock !== 'tous'">
            Stock : {{ getStockLabel(selectedStock) }}
            <button (click)="selectedStock = 'tous'; applyFilters()"><i class="bi bi-x"></i></button>
          </span>
        </div>

        <!-- Product Grid (paginated) -->
        <div class="fo-product-grid" *ngIf="!loading && pagedProducts.length > 0">
          <a *ngFor="let prod of pagedProducts" [routerLink]="['/catalogue', prod.id]" class="fo-product-card">
            <div class="fo-product-card-img">
              <i class="bi bi-box-seam"></i>
            </div>
            <div class="fo-product-card-body">
              <span class="fo-product-card-category">{{ prod.categorieNom }}</span>
              <h4>{{ prod.nom }}</h4>
              <p>{{ prod.description | slice:0:80 }}{{ prod.description && prod.description.length > 80 ? '...' : '' }}</p>
              <div class="fo-product-card-footer">
                <span class="fo-product-price">{{ prod.prix | number:'1.2-2' }} TND</span>
                <span class="fo-product-stock"
                      [class.in-stock]="prod.quantite > 10"
                      [class.low-stock]="prod.quantite > 0 && prod.quantite <= 10"
                      [class.out-of-stock]="prod.quantite === 0">
                  {{ prod.quantite > 10 ? 'En stock' : prod.quantite > 0 ? 'Stock faible' : 'Rupture' }}
                </span>
              </div>
            </div>
          </a>
        </div>

        <!-- Pagination -->
        <div class="fo-pagination" *ngIf="!loading && totalPages > 1">
          <div class="fo-pagination-info">
            Affichage {{ startIndex + 1 }}–{{ endIndex }} sur {{ filteredProducts.length }}
          </div>
          <div class="fo-pagination-controls">
            <button (click)="goToPage(1)" [disabled]="page === 1" title="Première page">
              <i class="bi bi-chevron-double-left"></i>
            </button>
            <button (click)="goToPage(page - 1)" [disabled]="page === 1" title="Page précédente">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button *ngFor="let p of visiblePages" (click)="goToPage(p)"
                    [class.active]="p === page">{{ p }}</button>
            <button (click)="goToPage(page + 1)" [disabled]="page === totalPages" title="Page suivante">
              <i class="bi bi-chevron-right"></i>
            </button>
            <button (click)="goToPage(totalPages)" [disabled]="page === totalPages" title="Dernière page">
              <i class="bi bi-chevron-double-right"></i>
            </button>
          </div>
          <div class="fo-pagination-size">
            <label>Par page :</label>
            <select [(ngModel)]="perPage" (ngModelChange)="onPerPageChange()">
              <option [ngValue]="6">6</option>
              <option [ngValue]="12">12</option>
              <option [ngValue]="24">24</option>
              <option [ngValue]="48">48</option>
            </select>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!loading && filteredProducts.length === 0" class="fo-empty-state">
          <i class="bi bi-search"></i>
          <p>Aucun produit trouvé pour vos critères de recherche.</p>
          <button class="fo-btn fo-btn-outline" (click)="resetFilters()">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Réinitialiser les filtres
          </button>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="fo-loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CatalogueComponent implements OnInit {
  // Data
  products: Produit[] = [];
  filteredProducts: Produit[] = [];
  pagedProducts: Produit[] = [];
  categories: Categorie[] = [];

  // Filters
  searchTerm = '';
  selectedCategory = 0;
  selectedStock = 'tous';

  // Sort
  sortBy = 'nom-asc';

  // Pagination
  page = 1;
  perPage = 12;
  totalPages = 1;
  visiblePages: number[] = [];
  startIndex = 0;
  endIndex = 0;

  loading = true;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieService.listerTout().subscribe({
      next: (cats) => this.categories = cats
    });
    this.produitService.listerTout().subscribe({
      next: (prods) => {
        this.products = prods;
        this.applyFilters();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilters(): void {
    // 1. Filter
    this.filteredProducts = this.products.filter(p => {
      const matchSearch = !this.searchTerm ||
        p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCategory = !this.selectedCategory ||
        p.categorieId === this.selectedCategory;
      let matchStock = true;
      if (this.selectedStock === 'en-stock') matchStock = p.quantite > 10;
      else if (this.selectedStock === 'faible') matchStock = p.quantite > 0 && p.quantite <= 10;
      else if (this.selectedStock === 'rupture') matchStock = p.quantite === 0;
      return matchSearch && matchCategory && matchStock;
    });

    // 2. Sort
    this.applySort();
  }

  applySort(): void {
    const [field, direction] = this.sortBy.split('-');
    this.filteredProducts.sort((a, b) => {
      let cmp = 0;
      switch (field) {
        case 'nom':
          cmp = a.nom.localeCompare(b.nom, 'fr');
          break;
        case 'prix':
          cmp = a.prix - b.prix;
          break;
        case 'date':
          cmp = (a.dateCreation || '').localeCompare(b.dateCreation || '');
          break;
        case 'stock':
          cmp = a.quantite - b.quantite;
          break;
      }
      return direction === 'desc' ? -cmp : cmp;
    });

    // 3. Reset to page 1 and paginate
    this.page = 1;
    this.paginate();
  }

  paginate(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredProducts.length / this.perPage));
    if (this.page > this.totalPages) this.page = this.totalPages;
    this.startIndex = (this.page - 1) * this.perPage;
    this.endIndex = Math.min(this.startIndex + this.perPage, this.filteredProducts.length);
    this.pagedProducts = this.filteredProducts.slice(this.startIndex, this.endIndex);
    this.computeVisiblePages();
  }

  computeVisiblePages(): void {
    const maxVisible = 5;
    let start = Math.max(1, this.page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.paginate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPerPageChange(): void {
    this.page = 1;
    this.paginate();
  }

  hasActiveFilters(): boolean {
    return !!this.searchTerm || !!this.selectedCategory || this.selectedStock !== 'tous';
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 0;
    this.selectedStock = 'tous';
    this.sortBy = 'nom-asc';
    this.applyFilters();
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.nom || '';
  }

  getStockLabel(value: string): string {
    const labels: Record<string, string> = {
      'en-stock': 'En stock',
      'faible': 'Stock faible',
      'rupture': 'Rupture'
    };
    return labels[value] || value;
  }
}
