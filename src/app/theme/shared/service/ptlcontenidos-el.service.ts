import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLContenidoEL } from '../_helpers/models/PTLContenidoEL.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLContenidosELService {
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

  getContenidos() {
    const url = `${base_url}/contenidos-el`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          contenidos: resp.contenidos
        };
      })
    );
  }

  getContenidoById(id: number) {
    const url = `${base_url}/contenidos-el/${id}`;
    return this.http.get(url, this.headers);
  }

  createContenido(contenido: PTLContenidoEL) {
    const url = `${base_url}/contenidos-el`;
    return this.http.post(url, contenido, this.headers);
  }

  updateContenido(contenido: PTLContenidoEL) {
    const url = `${base_url}/contenidos-el/${contenido.contenidoId}`;
    return this.http.put(url, contenido, this.headers);
  }

  deleteContenido(id: number) {
    const url = `${base_url}/contenidos-el/${id}`;
    return this.http.delete(url, this.headers);
  }
}
