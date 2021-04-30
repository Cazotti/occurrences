import { Observable } from 'rxjs';

import { HttpClient, HttpResponse } from './http-client';
import { OCCURRENCES_API_HOST } from '../env'
import OccurrenceData from '../data-types/occurrence-data';
import SessionData from '../data-types/session-data';

interface AuthenticateArgs {
  email: string;
  password: string;
}

interface OccurrenceArgs {
  code: string;
  description: string;
  registerAt: string;
}

interface OccurrenceClientDependencies {
  httpClient: HttpClient;
}

class OccurrenceClient {
  private httpClient: HttpClient;

  constructor({ httpClient }: OccurrenceClientDependencies) {
    this.httpClient = httpClient;
  }

  authenticate({
    email,
    password,
  }: AuthenticateArgs): Observable<HttpResponse<SessionData, Headers>> {
    return this.httpClient.post({
      url: `${OCCURRENCES_API_HOST}/users/sessions`,
      body: { email, password }
    });
  }

  create({
    code,
    description,
    registerAt,
  }: OccurrenceArgs): Observable<HttpResponse<OccurrenceData, Headers>> {
    return this.httpClient.post({
      url: `${OCCURRENCES_API_HOST}/occurrences`,
      body: { code, description, registerAt }
    });
  }

  listAll(): Observable<HttpResponse<OccurrenceData[], Headers>> {
    return this.httpClient.get({
      url: `${OCCURRENCES_API_HOST}/occurrences`,
    });
  }
}

export default OccurrenceClient;
