/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLAplicacion } from '../_helpers/models/PTLAplicacion.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PtlaplicacionesService {
    user : PTLUsuarioAP = new PTLUsuarioAP(0, 0, '', '', '', false, '');

    constructor(private http: HttpClient) { }

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
        }
    }

    getAplicaciones() {
        const url = `${ base_url }/aplicaciones`;
        return this.http.get( url, this.headers )
        .pipe(
          map((resp: any) => {
            return {
              ok: true,
              aplicaciones: resp.aplicaciones
            };
          })
        );
    }

    getAplicacionById(id: string) {
        const url = `${ base_url }/aplicaciones/${ id }`;
        return this.http.get( url, this.headers )
    }

    createAplicacion( aplicacion: PTLAplicacion ) {
        const url = `${ base_url }/aplicaciones`;
        return this.http.post( url, aplicacion, this.headers );
    }

    updateAplicacion( aplicacion: PTLAplicacion  ) {
        const url = `${ base_url }/aplicaciones/${ aplicacion.aplicacionId }`;
        return this.http.put( url, aplicacion, this.headers );
    }

    deleteAplicacion( id: number ) {
        const url = `${ base_url }/aplicaciones/${ id }`;
        return this.http.delete( url, this.headers );
    }
}
