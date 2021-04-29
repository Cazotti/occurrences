import { Observable, Subject } from 'rxjs';
import axios from 'axios';

import {
  HttpRequestArgs,
  HttpClientAdapter,
  HttpResponse,
} from './http.client';

export class HttpClientSuperAgentAdapter implements HttpClientAdapter {
  post( args: HttpRequestArgs ): Observable<HttpResponse<Body, Headers>> {
    const subject = new Subject<HttpResponse<Body, Headers>>();
    const { url, body } = args;
    axios.post( url, body )
      .then((res) => {
        const { data: body, status, headers } = res;
        subject.next({ body, status, headers });
      })
      .then(() => subject.complete())
      .catch((err) => subject.error(err))
    return subject.asObservable();
  }
}
