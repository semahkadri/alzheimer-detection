import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../services/categorie.service';
import { ProduitService } from '../../../services/produit.service';
import { Categorie } from '../../../modeles/categorie.model';
import { Produit } from '../../../modeles/produit.model';

@Component({
  selector: 'app-categorie-produits',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="fo-section" *ngIf="!loading">
      <div class="fo-section-container">
        <!-- Breadcrumb -->
        <div class="fo-breadcrumb">
          <a routerLink="/">Accueil</a>
          <span>/</span>
          <span>{{ categorie?.nom }}</span>
        </div>

        <!-- Category Header -->
        <div class="fo-category-header" *ngIf="categorie">
          <div class="fo-category-header-icon">
            <i class="bi bi-tag-fill"></i>
          </div>
          <div>
            <h1>{{ categorie.nom }}</h1>
            <p>{{ categorie.description }}</p>
          </div>
        </div>

        <!-- Filters Row -->
        <div class="fo-filter-bar">
          <div class="fo-search-box">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Rechercher dans cette catégorie..."
                   [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()">
          </div>
          <select class="fo-filter-select fo-filter-stock" [(ngModel)]="selectedStock" (ngModelChange)="applyFilters()">
            <option value="tous">Tout le stock</option>
            <option value="en-stock">En stock (&gt; 10)</option>
            <option value="faible">Stock faible (1-10)</option>
            <option value="rupture">Rupture de stock</option>
          </select>
          <a routerLink="/catalogue" class="fo-btn fo-btn-outline">
            <i class="bi bi-grid-3x3-gap me-1"></i>Tout parcourir
          </a>
        </div>

        <!-- Toolbar: Sort + Results Count -->
        <div class="fo-toolbar">
          <div class="fo-toolbar-left">
            <span class="fo-results-count">
              <strong>{{ filteredProducts.length }}</strong> produit{{ filteredProducts.length !== 1 ? 's' : '' }}
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
          <span class="fo-chip" *ngIf="selectedStock !== 'tous'">
            Stock : {{ getStockLabel(selectedStock) }}
            <button (click)="selectedStock = 'tous'; applyFilters()"><i class="bi bi-x"></i></button>
          </span>
        </div>

        <!-- Product Grid (paginated) -->
        <div class="fo-product-grid" *ngIf="pagedProducts.length > 0">
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
        <div class="fo-pagination" *ngIf="totalPages > 1">
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
        <div *ngIf="filteredProducts.length === 0 && !loading" class="fo-empty-state">
          <i class="bi bi-inbox"></i>
          <p *ngIf="!hasActiveFilters()">Aucun produit dans cette catégorie.</p>
          <p *ngIf="hasActiveFilters()">Aucun produit trouvé pour vos critères.</p>
          <button *ngIf="hasActiveFilters()" class="fo-btn fo-btn-outline" (click)="resetFilters()">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Réinitialiser les filtres
          </button>
          <a *ngIf="!hasActiveFilters()" routerLink="/catalogue" class="fo-btn fo-btn-outline">Parcourir le catalogue</a>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div *ngIf="loading" class="fo-loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  `
})
export class CategorieProduitsComponent implements OnInit {
  // Data
  categorie: Categorie | null = null;
  products: Produit[] = [];
  filteredProducts: Produit[] = [];
  pagedProducts: Produit[] = [];

  // Filters
  searchTerm = '';
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
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loading = true;
      this.categorieService.obtenirParId(id).subscribe({
        next: (cat) => this.categorie = cat
      });
      this.produitService.listerParCategorie(id).subscribe({
        next: (prods) => {
          this.products = prods;
          this.applyFilters();
          this.loading = false;
        },
        error: () => this.loading = false
      });
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p => {
      const matchSearch = !this.searchTerm ||
        p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      let matchStock = true;
      if (this.selectedStock === 'en-stock') matchStock = p.quantite > 10;
      else if (this.selectedStock === 'faible') matchStock = p.quantite > 0 && p.quantite <= 10;
      else if (this.selectedStock === 'rupture') matchStock = p.quantite === 0;
      return matchSearch && matchStock;
    });
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
    return !!this.searchTerm || this.selectedStock !== 'tous';
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStock = 'tous';
    this.sortBy = 'nom-asc';
    this.applyFilters();
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
