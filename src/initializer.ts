import { HttpClientAdapter, HttpClient, HttpClientSuperAgentAdapter} from './clients/http-client';
import AuthService from './services/auth.service';
import OccurrenceClient from './clients/occurrence.client';

export function getHttpClientAdapter(): HttpClientAdapter {
  return new HttpClientSuperAgentAdapter();
}

export function getHttpClient(): HttpClient {
  const adapter = getHttpClientAdapter();
  return new HttpClient({ adapter });
}

export function getOccurrenceClient(): OccurrenceClient {
  const httpClient = getHttpClient();
  return new OccurrenceClient({ httpClient });
}

export function getAuthService(): AuthService {
  const occurrenceClient = getOccurrenceClient();
  return new AuthService({ occurrenceClient });
}
