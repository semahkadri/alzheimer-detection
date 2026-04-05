import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./composants/layouts/layout-frontoffice/layout-frontoffice.component')
        .then(m => m.LayoutFrontofficeComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./composants/frontoffice/accueil/accueil.component')
            .then(m => m.AccueilComponent)
      },
      {
        path: 'catalogue',
        loadComponent: () =>
          import('./composants/frontoffice/catalogue/catalogue.component')
            .then(m => m.CatalogueComponent)
      },
      {
        path: 'catalogue/:id',
        loadComponent: () =>
          import('./composants/frontoffice/detail-produit/detail-produit.component')
            .then(m => m.DetailProduitComponent)
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import('./composants/frontoffice/categorie-produits/categorie-produits.component')
            .then(m => m.CategorieProduitsComponent)
      },
      {
        path: 'panier',
        loadComponent: () =>
          import('./composants/frontoffice/panier/panier.component')
            .then(m => m.PanierComponent)
      },
      {
        path: 'commander',
        loadComponent: () =>
          import('./composants/frontoffice/commander/commander.component')
            .then(m => m.CommanderComponent)
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./composants/frontoffice/wishlist/wishlist.component')
            .then(m => m.WishlistComponent)
      },
      {
        path: 'commande/:ref',
        loadComponent: () =>
          import('./composants/frontoffice/confirmation-commande/confirmation-commande.component')
            .then(m => m.ConfirmationCommandeComponent)
      },
      {
        path: 'comparer',
        loadComponent: () =>
          import('./composants/frontoffice/comparer/comparer.component')
            .then(m => m.ComparerComponent)
      },
      {
        path: 'mes-commandes',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./composants/frontoffice/mes-commandes/mes-commandes.component')
            .then(m => m.MesCommandesComponent)
      },
      {
        path: 'profil',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./composants/frontoffice/profil/profil.component')
            .then(m => m.ProfilComponent)
      }
    ]
  },
  // Auth pages — outside layout (full-page centered)
  {
    path: 'connexion',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./composants/frontoffice/connexion/connexion.component')
        .then(m => m.ConnexionComponent)
  },
  {
    path: 'inscription',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./composants/frontoffice/inscription/inscription.component')
        .then(m => m.InscriptionComponent)
  },
  {
    path: 'verifier-email',
    loadComponent: () =>
      import('./composants/frontoffice/verifier-email/verifier-email.component')
        .then(m => m.VerifierEmailComponent)
  },
  {
    path: 'mot-de-passe-oublie',
    loadComponent: () =>
      import('./composants/frontoffice/mot-de-passe-oublie/mot-de-passe-oublie.component')
        .then(m => m.MotDePasseOublieComponent)
  },
  {
    path: 'reset-mot-de-passe',
    loadComponent: () =>
      import('./composants/frontoffice/reset-mot-de-passe/reset-mot-de-passe.component')
        .then(m => m.ResetMotDePasseComponent)
  },
  // Admin — protected by adminGuard
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./composants/layouts/layout-backoffice/layout-backoffice.component')
        .then(m => m.LayoutBackofficeComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./composants/tableau-de-bord/tableau-de-bord.component')
            .then(m => m.TableauDeBordComponent)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./composants/categorie/liste-categories/liste-categories.component')
            .then(m => m.ListeCategoriesComponent)
      },
      {
        path: 'categories/ajouter',
        loadComponent: () =>
          import('./composants/categorie/formulaire-categorie/formulaire-categorie.component')
            .then(m => m.FormulaireCategorieComponent)
      },
      {
        path: 'categories/modifier/:id',
        loadComponent: () =>
          import('./composants/categorie/formulaire-categorie/formulaire-categorie.component')
            .then(m => m.FormulaireCategorieComponent)
      },
      {
        path: 'produits',
        loadComponent: () =>
          import('./composants/produit/liste-produits/liste-produits.component')
            .then(m => m.ListeProduitsComponent)
      },
      {
        path: 'produits/ajouter',
        loadComponent: () =>
          import('./composants/produit/formulaire-produit/formulaire-produit.component')
            .then(m => m.FormulaireProduitComponent)
      },
      {
        path: 'produits/modifier/:id',
        loadComponent: () =>
          import('./composants/produit/formulaire-produit/formulaire-produit.component')
            .then(m => m.FormulaireProduitComponent)
      },
      {
        path: 'commandes',
        loadComponent: () =>
          import('./composants/commande/liste-commandes/liste-commandes.component')
            .then(m => m.ListeCommandesComponent)
      },
      {
        path: 'commandes/:id',
        loadComponent: () =>
          import('./composants/commande/detail-commande/detail-commande.component')
            .then(m => m.DetailCommandeComponent)
      },
      {
        path: 'analyse-stock',
        loadComponent: () =>
          import('./composants/analyse-stock/analyse-stock.component')
            .then(m => m.AnalyseStockComponent)
      },
      {
        path: 'emails',
        loadComponent: () =>
          import('./composants/email/liste-emails/liste-emails.component')
            .then(m => m.ListeEmailsComponent)
      },
      {
        path: 'utilisateurs',
        loadComponent: () =>
          import('./composants/commande/liste-utilisateurs/liste-utilisateurs.component')
            .then(m => m.ListeUtilisateursComponent)
      },
      {
        path: 'utilisateurs/ajouter',
        loadComponent: () =>
          import('./composants/commande/formulaire-utilisateur/formulaire-utilisateur.component')
            .then(m => m.FormulaireUtilisateurComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
