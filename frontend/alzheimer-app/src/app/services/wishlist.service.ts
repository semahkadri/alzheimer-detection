import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../modeles/produit.model';

const BASE_KEY = 'pharmacare_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private items$ = new BehaviorSubject<Produit[]>(this.load());

  /** Get storage key scoped by user (if logged in) */
  private getKey(): string {
    try {
      const user = JSON.parse(localStorage.getItem('utilisateur') || 'null');
      return user?.id ? `${BASE_KEY}_${user.id}` : BASE_KEY;
    } catch { return BASE_KEY; }
  }

  private load(): Produit[] {
    try { return JSON.parse(localStorage.getItem(this.getKey()) || '[]'); }
    catch { return []; }
  }

  private persist(items: Produit[]): void {
    localStorage.setItem(this.getKey(), JSON.stringify(items));
    this.items$.next(items);
  }

  /** Call when user logs in or out to switch wishlist scope */
  recharger(): void {
    this.items$.next(this.load());
  }

  get wishlist$() { return this.items$.asObservable(); }
  get count(): number { return this.items$.value.length; }

  isInWishlist(id: number): boolean {
    return this.items$.value.some(p => p.id === id);
  }

  toggle(produit: Produit): boolean {
    const current = this.items$.value;
    const idx = current.findIndex(p => p.id === produit.id);
    if (idx >= 0) {
      this.persist(current.filter(p => p.id !== produit.id));
      return false;
    } else {
      this.persist([...current, produit]);
      return true;
    }
  }

  remove(id: number): void {
    this.persist(this.items$.value.filter(p => p.id !== id));
  }

  clear(): void {
    this.persist([]);
  }
}
