import { Observable } from 'rxjs';

import { HttpResponse } from '../clients/http-client';
import OccurrenceClient from '../clients/occurrence.client';
import OccurrenceData from '../data-types/occurrence-data';

export class OccurrenceService {
  private occurrenceClient: OccurrenceClient;

  constructor({ occurrenceClient }: { occurrenceClient: OccurrenceClient }) {
    this.occurrenceClient = occurrenceClient;
  }

  listAll(): Observable<HttpResponse<OccurrenceData[], Headers>> {
    return this.occurrenceClient.listAll();
  }
}

export default OccurrenceService;
