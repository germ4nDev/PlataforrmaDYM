import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PTLSitiosAP } from '../_helpers/models/PTLSitioAP.model';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLSitiosAPService {
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

    getSitios() {
        const url = `${ base_url }/PTLSitiosAP`;  // TODO reemplazar por la ruta actual del servicio
        return this.http.get<PTLSitiosAP[]>( url, this.headers )
        .pipe(
            map((resp: PTLSitiosAP[]) => {
                console.log('respuesta servicio', resp);
                return {
                    ok: true,
                    sitios: resp
                };
            })
        );
    }
}
