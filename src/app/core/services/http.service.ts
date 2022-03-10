import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {
  private readonly url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get<any>(this.url + url);
  }
  post(url: string, bodyParams: any): Observable<any> {
    return this.http.post(this.url + url, bodyParams);
  }
}
