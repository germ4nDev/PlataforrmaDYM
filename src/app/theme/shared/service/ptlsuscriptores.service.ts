/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLSuscriptor } from '../_helpers/models/PTLSuscriptor.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLSuscriptoresService {
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

  getSuscriptores() {
    const url = `${base_url}/suscriptor-paquetes`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          suscriptores: resp.suscriptores
        };
      })
    );
  }

  getSuscriptorById(id: number) {
    const url = `${ base_url }/suscriptor-paquetes/${ id }`;
    return this.http.get( url, this.headers )
  }

  createSuscriptor(suscriptor: PTLSuscriptor) {
    const url = `${ base_url }/suscriptor-paquetes`;
    return this.http.post( url, suscriptor, this.headers );
  }

  updateSuscriptor(suscriptor: PTLSuscriptor) {
    const url = `${ base_url }/suscriptor-paquetes/${ suscriptor.suscriptorId }`;
    return this.http.put( url, suscriptor, this.headers );
  }

  deleteSuscriptor(id: number) {
    const url = `${ base_url }/suscriptor-paquetes/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
