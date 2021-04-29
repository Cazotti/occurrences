import { Observable, of } from 'rxjs';

import { HttpResponse } from '../clients/http-client';
import OccurrenceClient from '../clients/occurrence.client';
import SessionData from '../data-types/session-data';

export interface SessionAdapter {
  destroy(): Observable<void>;
}

export class AuthService {
  private occurrenceClient: OccurrenceClient;

  constructor({ occurrenceClient }: { occurrenceClient: OccurrenceClient }) {
    this.occurrenceClient = occurrenceClient;
  }

  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<HttpResponse<SessionData, Headers>> {
    const client = this.occurrenceClient;
    return client.signIn({ email, password });
  }

  signOut(): Observable<void> {
    return of(localStorage.removeItem('Token'));
  }

  setTokenToLocalStorage(token: string): void {
    localStorage.setItem('Token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('Token')){
      return true;
    }
    return false;
  }
}

export default AuthService;
