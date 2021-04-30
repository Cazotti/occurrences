import { Observable, Subject } from 'rxjs';
import axios from 'axios';

import { getAuthService } from '../../initializer';
import {
  HttpClientAdapter,
  HttpRequestArgs,
  HttpResponse,
} from './http.client';

export class HttpClientSuperAgentAdapter implements HttpClientAdapter {
  get( args: HttpRequestArgs ): Observable<HttpResponse<Body, Headers>> {
    const subject = new Subject<HttpResponse<Body, Headers>>();
    const { url } = args;

    axios.get( url, { headers: { Authorization: 'Bearer ' + getAuthService().getToken() } } )
      .then((res) => {
        const { data: body, status, headers } = res;
        subject.next({ body, status, headers });
      })
      .then(() => subject.complete())
      .catch((err) => subject.error(err))
    return subject.asObservable();
  }

  post( args: HttpRequestArgs ): Observable<HttpResponse<Body, Headers>> {
    const subject = new Subject<HttpResponse<Body, Headers>>();
    const { url, body } = args;

    axios.post( url, body, { headers: { Authorization: 'Bearer ' + getAuthService().getToken() } } )
      .then((res) => {
        const { data: body, status, headers } = res;
        subject.next({ body, status, headers });
      })
      .then(() => subject.complete())
      .catch((err) => subject.error(err))
    return subject.asObservable();
  }
}
