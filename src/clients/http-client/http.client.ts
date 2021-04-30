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
  get(
    opt: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>>;
  post(
    opt: HttpRequestArgs,
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

  get<Body, Headers>(
    args: HttpRequestArgs,
  ): Observable<HttpResponse<Body, Headers>> {
    return this.makeRequest('GET', args);
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
      case 'POST':
        request = this.adapter.post(args);
        break;
      case 'GET':
        request = this.adapter.get(args);
        break;
      default:
        throw Error(`Unknown method HTTP method '${method}'`);
    }
    return request;
  }
}
