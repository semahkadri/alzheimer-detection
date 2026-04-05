import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthReponse, ConnexionRequest, InscriptionRequest, Utilisateur } from '../modeles/auth.model';
import { PanierService } from './panier.service';
import { WishlistService } from './wishlist.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.authApiUrl}/auth`;
  private usersUrl = `${environment.authApiUrl}/utilisateurs`;

  private utilisateurSubject = new BehaviorSubject<Utilisateur | null>(this.getStoredUser());
  utilisateur$ = this.utilisateurSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private injector: Injector) {}

  // --- Auth endpoints ---

  inscription(data: InscriptionRequest): Observable<{ message: string; email: string; code: string }> {
    return this.http.post<{ message: string; email: string; code: string }>(`${this.apiUrl}/inscription`, data);
  }

  verifierCode(email: string, code: string): Observable<AuthReponse> {
    return this.http.post<AuthReponse>(`${this.apiUrl}/verifier-code`, { email, code }).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  connexion(data: ConnexionRequest): Observable<AuthReponse> {
    return this.http.post<AuthReponse>(`${this.apiUrl}/connexion`, data).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  refreshToken(): Observable<AuthReponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of(null as any);
    return this.http.post<AuthReponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap(res => this.storeAuth(res)),
      catchError(() => {
        this.deconnexion();
        return of(null as any);
      })
    );
  }

  deconnexion(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('utilisateur');
    this.utilisateurSubject.next(null);
    // Switch cart to anonymous session, reload wishlist
    this.syncCartAndWishlist(null);
    this.router.navigate(['/connexion']);
  }

  getMe(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/me`).pipe(
      tap(u => {
        localStorage.setItem('utilisateur', JSON.stringify(u));
        this.utilisateurSubject.next(u);
      })
    );
  }

  motDePasseOublie(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/mot-de-passe-oublie`, { email });
  }

  resetMotDePasse(token: string, nouveauMotDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-mot-de-passe`, { token, nouveauMotDePasse });
  }

  // --- User management (admin) ---

  listerUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.usersUrl);
  }

  changerRole(id: number, role: string): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.usersUrl}/${id}/role?role=${role}`, {});
  }

  activerDesactiver(id: number, actif: boolean): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.usersUrl}/${id}/activer?actif=${actif}`, {});
  }

  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }

  creerUtilisateur(data: { nom: string; prenom: string; email: string; motDePasse: string; role: string }): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.usersUrl, data);
  }

  modifierProfil(nom: string, prenom: string): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.usersUrl}/me`, { nom, prenom }).pipe(
      tap(u => {
        localStorage.setItem('utilisateur', JSON.stringify(u));
        this.utilisateurSubject.next(u);
      })
    );
  }

  changerMotDePasse(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
    return this.http.put(`${this.usersUrl}/me/mot-de-passe`, { ancienMotDePasse, nouveauMotDePasse });
  }

  statsUtilisateurs(): Observable<{ totalUtilisateurs: number; totalAdmins: number }> {
    return this.http.get<{ totalUtilisateurs: number; totalAdmins: number }>(`${this.usersUrl}/stats`);
  }

  // --- Token management ---

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  get currentUser(): Utilisateur | null {
    return this.utilisateurSubject.value;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  private storeAuth(res: AuthReponse): void {
    if (!res) return;
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('utilisateur', JSON.stringify(res.utilisateur));
    this.utilisateurSubject.next(res.utilisateur);
    // Switch cart to user session, reload wishlist
    this.syncCartAndWishlist(res.utilisateur.id);
  }

  /** Sync cart and wishlist to current user (or anonymous) */
  private syncCartAndWishlist(userId: number | null): void {
    try {
      const panierService = this.injector.get(PanierService);
      const wishlistService = this.injector.get(WishlistService);
      panierService.switchToUserSession(userId);
      wishlistService.recharger();
    } catch { /* services not yet available at bootstrap */ }
  }

  private getStoredUser(): Utilisateur | null {
    const stored = localStorage.getItem('utilisateur');
    if (!stored) return null;
    try { return JSON.parse(stored); } catch { return null; }
  }
}
