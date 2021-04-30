import { Observable } from 'rxjs';

import { HttpResponse } from '../clients/http-client';
import OccurrenceClient from '../clients/occurrence.client';
import OccurrenceData from '../data-types/occurrence-data';

export class OccurrenceService {
  private occurrenceClient: OccurrenceClient;

  constructor({ occurrenceClient }: { occurrenceClient: OccurrenceClient }) {
    this.occurrenceClient = occurrenceClient;
  }

  create({
    code,
    description,
    registerAt
  }: {
    code: string;
    description: string;
    registerAt: string;
  }): Observable<HttpResponse<OccurrenceData, Headers>> {
    return this.occurrenceClient.create({ code, description, registerAt });
  }

  listAll(): Observable<HttpResponse<OccurrenceData[], Headers>> {
    return this.occurrenceClient.listAll();
  }
}

export default OccurrenceService;
