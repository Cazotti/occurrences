import { Observable } from 'rxjs';

import { HttpClient, HttpResponse } from './http-client';
import SessionData from '../data-types/session-data';
import { OCCURRENCES_API_HOST } from '../env'

interface AuthenticateOpt {
  email: string;
  password: string;
}

interface OccurrenceClientDependencies {
  httpClient: HttpClient;
}

class OccurrenceClient {
  private httpClient: HttpClient;

  constructor({ httpClient }: OccurrenceClientDependencies) {
    this.httpClient = httpClient;
  }

  signIn({
    email,
    password,
  }: AuthenticateOpt): Observable<HttpResponse<SessionData, Headers>> {
    return this.httpClient.post({
      url: `${OCCURRENCES_API_HOST}/users/sessions`,
      body: { email, password }
    });
  }
}

export default OccurrenceClient;
