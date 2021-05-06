import { Observable } from 'rxjs';

// #region Typings
export type HttpMethod = 'GET' | 'DELETE' | 'PATCH' | 'POST' | 'PUT';
export type HttpHeaders = { [key: string]: any };
export type HttpQueryParams = { [key: string]: any };
export type HttpRequestBody = { [key: string]: any } | null | string;

export type HttpRequestArgs = {
  body?: HttpRequestBody;
  headers?: HttpHeaders;
  query?: HttpQueryParams;
  url: string;
};

type Body = any;
type Headers = any;

export interface HttpResponse<Body, Headers> {
  body: Body;
  headers: Headers;
  status: number;
}

export interface HttpClientAdapter {
  delete(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>>;
  get(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>>;
  patch(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>>;
  post(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>>;
}

export interface HttpClientDependencies {
  adapter: HttpClientAdapter;
}

export class HttpClient {
  protected adapter: HttpClientAdapter;

  constructor({ adapter }: HttpClientDependencies) {
    this.adapter = adapter;
  }

  delete<Body, Headers>(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    return this.makeRequest('DELETE', args);
  }

  get<Body, Headers>(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    return this.makeRequest('GET', args);
  }

  patch<Body, Headers>(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    return this.makeRequest('PATCH', args);
  }

  post<Body, Headers>(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    return this.makeRequest('POST', args);
  }

  protected makeRequest(
    method: HttpMethod,
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    let request: Observable<HttpResponse<Body, Headers>>;

    switch (method) {
      case 'DELETE':
        request = this.adapter.delete(args);
        break;
      case 'GET':
        request = this.adapter.get(args);
        break;
      case 'PATCH':
        request = this.adapter.patch(args);
        break;
      case 'POST':
        request = this.adapter.post(args);
        break;
      default:
        throw Error(`Unknown method HTTP method '${method}'`);
    }
    return request;
  }
}
