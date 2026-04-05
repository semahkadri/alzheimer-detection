import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { AuthService } from '../../../services/auth.service';
import { TraductionService } from '../../../services/traduction.service';
import { Commande } from '../../../modeles/commande.model';

@Component({
  selector: 'app-mes-commandes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fo-section">
      <div class="fo-section-container fade-in">

        <!-- Breadcrumb -->
        <div class="fo-breadcrumb">
          <a routerLink="/"><i class="bi bi-house-door"></i></a>
          <i class="bi bi-chevron-right fo-breadcrumb-sep"></i>
          <span class="fo-breadcrumb-current">{{ t.isFr ? 'Mes commandes' : 'My orders' }}</span>
        </div>

        <h1 class="fo-page-title"><i class="bi bi-bag-check me-2"></i>{{ t.isFr ? 'Mes commandes' : 'My orders' }}</h1>
        <p class="fo-page-subtitle">{{ t.isFr ? 'Retrouvez l\\'historique de vos achats' : 'View your purchase history' }}</p>

        <!-- Loading -->
        <div *ngIf="chargement" class="fo-loading">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- Empty -->
        <div *ngIf="!chargement && commandes.length === 0" class="fo-empty-state">
          <i class="bi bi-bag-x"></i>
          <p>{{ t.isFr ? 'Vous n\\'avez pas encore de commandes.' : 'You have no orders yet.' }}</p>
          <a routerLink="/catalogue" class="fo-btn fo-btn-outline">
            <i class="bi bi-grid-3x3-gap me-2"></i>{{ t.isFr ? 'Parcourir le catalogue' : 'Browse catalogue' }}
          </a>
        </div>

        <!-- Orders list -->
        <div *ngIf="!chargement && commandes.length > 0">
          <div *ngFor="let cmd of commandes" class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
                <div>
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <span class="fw-bold" style="color:var(--primary); font-size:0.88rem;">{{ cmd.reference }}</span>
                    <span class="cmd-badge" [ngClass]="getStatutClass(cmd.statut)">
                      <i class="bi" [ngClass]="getStatutIcon(cmd.statut)"></i>
                      {{ getStatutLabel(cmd.statut) }}
                    </span>
                  </div>
                  <small class="text-muted">{{ cmd.dateCommande | date:'dd/MM/yyyy HH:mm' }}</small>
                </div>
                <div class="text-end">
                  <div class="fw-bold" style="font-size:1.1rem; color:var(--primary);">{{ cmd.montantTotal | number:'1.2-2' }} TND</div>
                  <small class="text-muted">{{ cmd.nombreArticles }} {{ cmd.nombreArticles > 1 ? (t.isFr ? 'articles' : 'items') : (t.isFr ? 'article' : 'item') }}</small>
                </div>
              </div>

              <!-- Order lines preview -->
              <div class="mt-3 pt-3" style="border-top:1px solid var(--border);">
                <div *ngFor="let ligne of cmd.lignes; let last = last" class="d-flex justify-content-between align-items-center py-1"
                     [style.border-bottom]="!last ? '1px solid rgba(0,0,0,0.05)' : 'none'">
                  <div>
                    <span class="fw-semibold" style="font-size:0.85rem;">{{ ligne.nomProduit }}</span>
                    <small class="text-muted ms-2">x{{ ligne.quantite }}</small>
                  </div>
                  <span class="fw-semibold" style="font-size:0.85rem;">{{ ligne.sousTotal | number:'1.2-2' }} TND</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class MesCommandesComponent implements OnInit {
  commandes: Commande[] = [];
  chargement = true;

  constructor(
    private commandeService: CommandeService,
    private authService: AuthService,
    public t: TraductionService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user?.email) {
      this.commandeService.listerParEmail(user.email).subscribe({
        next: (data) => { this.commandes = data; this.chargement = false; },
        error: () => { this.chargement = false; }
      });
    } else {
      this.chargement = false;
    }
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'EN_ATTENTE': 'cmd-en-attente', 'CONFIRMEE': 'cmd-confirmee',
      'EN_PREPARATION': 'cmd-en-preparation', 'EXPEDIEE': 'cmd-expediee',
      'LIVREE': 'cmd-livree', 'ANNULEE': 'cmd-annulee'
    };
    return map[statut] || 'cmd-en-attente';
  }

  getStatutIcon(statut: string): string {
    const map: Record<string, string> = {
      'EN_ATTENTE': 'bi-hourglass-split', 'CONFIRMEE': 'bi-check-circle',
      'EN_PREPARATION': 'bi-boxes', 'EXPEDIEE': 'bi-truck',
      'LIVREE': 'bi-bag-check-fill', 'ANNULEE': 'bi-x-circle'
    };
    return map[statut] || 'bi-hourglass-split';
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, Record<string, string>> = {
      'EN_ATTENTE': { fr: 'En attente', en: 'Pending' },
      'CONFIRMEE': { fr: 'Confirmée', en: 'Confirmed' },
      'EN_PREPARATION': { fr: 'En préparation', en: 'Preparing' },
      'EXPEDIEE': { fr: 'Expédiée', en: 'Shipped' },
      'LIVREE': { fr: 'Livrée', en: 'Delivered' },
      'ANNULEE': { fr: 'Annulée', en: 'Cancelled' }
    };
    const lang = this.t.isFr ? 'fr' : 'en';
    return map[statut]?.[lang] || statut;
  }
}
