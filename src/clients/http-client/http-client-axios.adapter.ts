import { Observable, Subject } from 'rxjs';
import axios from 'axios';

import { getAuthService } from '../../initializer';
import {
  HttpClientAdapter,
  HttpRequestArgs,
  HttpResponse,
} from './http.client';

axios.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + getAuthService().getToken();
  return config;
});

export class HttpClientSuperAgentAdapter implements HttpClientAdapter {
  get( args: HttpRequestArgs ): Observable<HttpResponse<Body, Headers>> {
    const subject = new Subject<HttpResponse<Body, Headers>>();
    const { url, headers } = args;

    axios.get( url, { headers } )
      .then((res) => {
        const { data: body, status, headers } = res;
        subject.next({ body, status, headers });
      })
      .then(() => subject.complete())
      .catch((err) => subject.error(err))
    return subject.asObservable();
  }

  patch( args: HttpRequestArgs ): Observable<HttpResponse<Body, Headers>> {
    const subject = new Subject<HttpResponse<Body, Headers>>();
    const { url, body, headers} = args;

    axios.patch( url, body, { headers } )
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
    const { url, body, headers } = args;

    axios.post( url, body, { headers } )
      .then((res) => {
        const { data: body, status, headers } = res;
        subject.next({ body, status, headers });
      })
      .then(() => subject.complete())
      .catch((err) => subject.error(err))
    return subject.asObservable();
  }
}
