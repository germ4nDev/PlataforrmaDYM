import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLEnlaceST } from '../_helpers/models/PTLEnlaceST.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLEnlacesSTService {
  user: PTLUsuarioAP = new PTLUsuarioAP(0, 0, '', '', '', false, '');

  constructor(private http: HttpClient) {}

  get token(): string {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '');
    if (this.user.serviceToken !== '') {
      return this.user.serviceToken;
    }
    return '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  getEnlaces() {
    const url = `${base_url}/enlaces-st`;
        return this.http.get(url, this.headers).pipe(
          map((resp: any) => {
            return {
              ok: true,
              enlces: resp.enlces
            };
          })
        );
  }

  getEnlaceById(id: number) {
    const url = `${base_url}/enlaces-st/${id}`;
    return this.http.get(url, this.headers);
  }

  createEnlace(enlace: PTLEnlaceST) {
    const url = `${base_url}/enlaces-st`;
    return this.http.post(url, enlace, this.headers);
  }

  updateEnlace(enlace: PTLEnlaceST) {
    const url = `${base_url}/enlaces-st/${enlace.enlaceId}`;
    return this.http.put(url, enlace, this.headers);
  }

  deleteEnlace(id: number) {
    const url = `${base_url}/enlaces-st/${id}`;
    return this.http.delete(url, this.headers);
  }
}
