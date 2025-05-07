/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PTLSitioAP } from '../_helpers/models/PTLSitioAP.model';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLSitiosAPService {
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

  getSitios() {
    const url = `${base_url}/sitios-ap`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          sitios: resp.sitios
        };
      })
    );
  }

  getSitioById(id: number) {
    const url = `${ base_url }/sitios-ap/${ id }`;
    return this.http.get( url, this.headers )
  }

  createSitio(sitio: PTLSitioAP) {
    const url = `${ base_url }/sitios-ap`;
    return this.http.post( url, sitio, this.headers );
  }

  updateSitio(sitio: PTLSitioAP) {
    const url = `${ base_url }/sitios-ap/${ sitio.sitioId }`;
    return this.http.put( url, sitio, this.headers );
  }

  deleteSitio(id: number) {
    const url = `${ base_url }/sitios-ap/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
