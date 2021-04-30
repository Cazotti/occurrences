import { Observable, of } from 'rxjs';

import { HttpResponse } from '../clients/http-client';
import OccurrenceClient from '../clients/occurrence.client';
import SessionData from '../data-types/session-data';

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
    return this.occurrenceClient.authenticate({ email, password });
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

  signOut(): Observable<void> {
    return of(localStorage.removeItem('Token'));
  }

  setTokenToLocalStorage(token: string): void {
    localStorage.setItem('Token', token);
  }
}

export default AuthService;
