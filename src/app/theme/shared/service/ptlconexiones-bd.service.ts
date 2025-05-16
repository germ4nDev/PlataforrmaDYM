/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLConexionBD } from '../_helpers/models/PTLConexionBD.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLConexionesBDService {
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

  getConexiones() {
    const url = `${base_url}/conexiones-bd`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          conexiones: resp.conexiones
        };
      })
    );
  }

  getConexionById(id: number) {
    const url = `${ base_url }/conexiones-bd/${ id }`;
    return this.http.get( url, this.headers )
  }

  createConexion(conexion: PTLConexionBD) {
    const url = `${ base_url }/conexiones-bd`;
    return this.http.post( url, conexion, this.headers );
  }

  updateConexion(conexion: PTLConexionBD) {
    const url = `${ base_url }/conexiones-bd/${ conexion.conexionId }`;
    return this.http.put( url, conexion, this.headers );
  }

  deleteConexion(id: number) {
    const url = `${ base_url }/conexiones-bd/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
