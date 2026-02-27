import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PanierService } from '../../../services/panier.service';
import { TraductionService } from '../../../services/traduction.service';
import { Panier, LignePanier } from '../../../modeles/panier.model';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fo-section">
      <div class="fo-section-container fade-in">

        <!-- Breadcrumb -->
        <div class="fo-breadcrumb">
          <a routerLink="/">{{ t.tr('nav.accueil') }}</a>
          <span>/</span>
          <span>{{ t.tr('panier.titre') }}</span>
        </div>

        <h1 class="fo-page-title"><i class="bi bi-cart3 me-2"></i>{{ t.tr('panier.titre') }}</h1>
        <p class="fo-page-subtitle">{{ t.tr('panier.sousTitre') }}</p>

        <!-- Loading -->
        <div *ngIf="chargement" class="fo-loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">{{ t.tr('common.chargement') }}</span>
          </div>
        </div>

        <!-- Empty Cart -->
        <div *ngIf="!chargement && panier && panier.lignes.length === 0" class="fo-empty-state">
          <i class="bi bi-cart-x"></i>
          <p>{{ t.tr('panier.vide') }}</p>
          <a routerLink="/catalogue" class="fo-btn fo-btn-outline">
            <i class="bi bi-grid-3x3-gap me-2"></i>{{ t.tr('panier.parcourir') }}
          </a>
        </div>

        <!-- Cart Content -->
        <div *ngIf="!chargement && panier && panier.lignes.length > 0">

          <!-- Expiration Timer Banner -->
          <div *ngIf="minutesRestantes >= 0" class="d-flex align-items-center mb-4"
               [style.background]="minutesRestantes <= 5 ? '#fff0f0' : '#fff8eb'"
               [style.border]="minutesRestantes <= 5 ? '1px solid #ffcdd2' : '1px solid #ffe0b2'"
               style="border-radius: 14px; padding: 16px 20px; gap: 16px;">
            <div [style.background]="minutesRestantes <= 5 ? '#ffebee' : '#fff3e0'"
                 style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="bi" [ngClass]="minutesRestantes === 0 && secondesRestantes === 0 ? 'bi-exclamation-triangle-fill' : 'bi-clock-history'"
                 [style.color]="minutesRestantes <= 5 ? '#d32f2f' : '#e65100'"
                 style="font-size: 1.4rem;"></i>
            </div>
            <div class="flex-grow-1">
              <div *ngIf="minutesRestantes > 0" style="font-weight: 600; font-size: 0.95rem;"
                   [style.color]="minutesRestantes <= 5 ? '#c62828' : '#e65100'">
                {{ t.tr('panier.expireDans') }}
                <span style="font-variant-numeric: tabular-nums; font-weight: 700; font-size: 1.05rem;">
                  {{ minutesRestantes < 10 ? '0' + minutesRestantes : minutesRestantes }}:{{ secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes }}
                </span>
              </div>
              <div *ngIf="minutesRestantes === 0 && secondesRestantes > 0" style="font-weight: 600; font-size: 0.95rem; color: #c62828;">
                {{ t.tr('panier.expireDans') }}
                <span style="font-variant-numeric: tabular-nums; font-weight: 700; font-size: 1.05rem;">
                  00:{{ secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes }}
                </span>
              </div>
              <div *ngIf="minutesRestantes === 0 && secondesRestantes === 0" style="font-weight: 600; font-size: 0.95rem; color: #c62828;">
                {{ t.tr('panier.expire') }}
              </div>
              <div style="font-size: 0.82rem; color: #78909c; margin-top: 3px;">
                {{ t.tr('panier.expireInfo') }}
              </div>
            </div>
          </div>

          <div class="row g-4">
            <!-- Cart Items -->
            <div class="col-lg-8">
              <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="mb-0 fw-bold">
                    <i class="bi bi-bag-fill me-2 text-primary"></i>
                    {{ panier.nombreArticles }} {{ panier.nombreArticles !== 1 ? t.tr('common.produits') : t.tr('common.produit') }}
                  </h6>
                  <button class="btn btn-sm btn-outline-danger" (click)="viderPanier()" [disabled]="enCours">
                    <i class="bi bi-trash me-1"></i>{{ t.tr('panier.viderPanier') }}
                  </button>
                </div>
                <div class="card-body p-0">
                  <div *ngFor="let ligne of panier.lignes; let last = last"
                       class="d-flex align-items-center p-4"
                       [style.border-bottom]="!last ? '1px solid var(--border)' : 'none'">
                    <!-- Product Image -->
                    <div class="me-3" style="width: 60px; height: 60px; background: var(--primary-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                      <img *ngIf="ligne.produitImageUrl" [src]="ligne.produitImageUrl" [alt]="ligne.produitNom" style="width: 100%; height: 100%; object-fit: cover;">
                      <i *ngIf="!ligne.produitImageUrl" class="bi bi-box-seam" style="font-size: 1.4rem; color: var(--primary);"></i>
                    </div>
                    <!-- Product Info -->
                    <div class="flex-grow-1">
                      <div class="fw-bold">{{ ligne.produitNom }}</div>
                      <small class="text-muted">{{ ligne.categorieNom }}</small>
                      <div class="mt-1">
                        <span class="fw-semibold" style="color: var(--primary);">{{ ligne.produitPrix | number:'1.2-2' }} TND</span>
                      </div>
                    </div>
                    <!-- Quantity Controls -->
                    <div class="d-flex align-items-center gap-2 me-4">
                      <button class="btn btn-sm btn-outline-secondary"
                              (click)="modifierQuantite(ligne, ligne.quantite - 1)"
                              [disabled]="enCours || ligne.quantite <= 1"
                              style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-dash"></i>
                      </button>
                      <span class="fw-bold" style="min-width: 30px; text-align: center;">{{ ligne.quantite }}</span>
                      <button class="btn btn-sm btn-outline-secondary"
                              (click)="modifierQuantite(ligne, ligne.quantite + 1)"
                              [disabled]="enCours || ligne.quantite >= (ligne.produitQuantiteStock || 0)"
                              style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                    <!-- Subtotal -->
                    <div class="text-end me-3" style="min-width: 100px;">
                      <div class="fw-bold">{{ ligne.sousTotal | number:'1.2-2' }} TND</div>
                    </div>
                    <!-- Remove -->
                    <button class="btn btn-sm btn-outline-danger"
                            (click)="supprimerProduit(ligne.produitId)"
                            [disabled]="enCours"
                            style="width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="col-lg-4">
              <div class="card" style="position: sticky; top: 80px;">
                <div class="card-header">
                  <h6 class="mb-0 fw-bold"><i class="bi bi-receipt me-2 text-primary"></i>{{ t.tr('panier.resume') }}</h6>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">{{ t.tr('panier.articles') }}</span>
                    <span>{{ panier.nombreArticles }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">{{ t.tr('panier.sousTotal') }}</span>
                    <span>{{ panier.montantTotal | number:'1.2-2' }} TND</span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between mb-4">
                    <span class="fw-bold fs-5">{{ t.tr('panier.total') }}</span>
                    <span class="fw-bold fs-5" style="color: var(--primary);">{{ panier.montantTotal | number:'1.2-2' }} TND</span>
                  </div>
                  <a routerLink="/commander" class="btn btn-primary w-100 py-2">
                    <i class="bi bi-credit-card me-2"></i>{{ t.tr('panier.commander') }}
                  </a>
                  <a routerLink="/catalogue" class="btn btn-secondary w-100 mt-2 py-2">
                    <i class="bi bi-arrow-left me-2"></i>{{ t.tr('panier.continuer') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="erreur" class="alert alert-danger mt-3">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ erreur }}
        </div>

      </div>
    </div>
  `
})
export class PanierComponent implements OnInit, OnDestroy {
  panier: Panier | null = null;
  chargement = true;
  enCours = false;
  erreur = '';

  // Timer
  minutesRestantes = -1;
  secondesRestantes = 0;
  private timerInterval: any = null;

  constructor(
    private panierService: PanierService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    this.chargerPanier();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  chargerPanier(): void {
    this.chargement = true;
    this.panierService.chargerPanier().subscribe({
      next: (data) => {
        this.panier = data;
        this.chargement = false;
        this.startTimer();
      },
      error: () => {
        this.chargement = false;
        this.erreur = this.t.tr('panier.erreurChargement');
      }
    });
  }

  modifierQuantite(ligne: LignePanier, nouvelleQuantite: number): void {
    if (nouvelleQuantite < 1) return;
    this.enCours = true;
    this.erreur = '';
    this.panierService.modifierQuantite(ligne.produitId, nouvelleQuantite).subscribe({
      next: (data) => {
        this.panier = data;
        this.enCours = false;
        this.startTimer();
      },
      error: (err) => {
        this.erreur = err.error?.message || this.t.tr('panier.erreurModif');
        this.enCours = false;
      }
    });
  }

  supprimerProduit(produitId: number): void {
    this.enCours = true;
    this.erreur = '';
    this.panierService.supprimerProduit(produitId).subscribe({
      next: (data) => {
        this.panier = data;
        this.enCours = false;
        this.startTimer();
      },
      error: () => {
        this.erreur = this.t.tr('panier.erreurSupp');
        this.enCours = false;
      }
    });
  }

  viderPanier(): void {
    this.enCours = true;
    this.erreur = '';
    this.panierService.viderPanier().subscribe({
      next: () => {
        this.panier = { sessionId: '', lignes: [], nombreArticles: 0, montantTotal: 0 };
        this.enCours = false;
        this.stopTimer();
        this.minutesRestantes = -1;
      },
      error: () => {
        this.erreur = this.t.tr('panier.erreurVider');
        this.enCours = false;
      }
    });
  }

  // ─── Timer logic ───────────────────────────────────

  private startTimer(): void {
    this.stopTimer();

    if (!this.panier?.expireA || this.panier.lignes.length === 0) {
      this.minutesRestantes = -1;
      return;
    }

    this.updateCountdown();
    this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updateCountdown(): void {
    if (!this.panier?.expireA) return;

    const expireAt = new Date(this.panier.expireA).getTime();
    const now = Date.now();
    const diff = Math.max(0, expireAt - now);

    this.minutesRestantes = Math.floor(diff / 60000);
    this.secondesRestantes = Math.floor((diff % 60000) / 1000);

    if (diff <= 0) {
      this.stopTimer();
      // Reload cart - backend will return empty
      this.chargerPanier();
    }
  }
}
