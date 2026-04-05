export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'UTILISATEUR';
  emailVerifie: boolean;
  actif: boolean;
  dateCreation?: string;
}

export interface ConnexionRequest {
  email: string;
  motDePasse: string;
}

export interface InscriptionRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  confirmationMotDePasse: string;
}

export interface AuthReponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  utilisateur: Utilisateur;
}
