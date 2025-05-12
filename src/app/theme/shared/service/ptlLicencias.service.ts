/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLLicencias } from '../_helpers/models/PTLLicencias.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLLicenciasService {
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

    getLicencias() {
        const url = `${ base_url }/api/PTLLicencias/GetListLicencias`;
        return this.http.get<PTLLicencias[]>( url, this.headers )
        .pipe(
            map((resp: PTLLicencias[]) => {
                console.log('respuesta servicio', resp);
                return {
                    ok: true,
                    resp
                };
            })
        );
    }

    getLicenciaById(id: number) {
        const url = `${base_url}/api/PTLLicencias/GetLicenciaById/${id}`;
        return this.http.get(url, this.headers)
        .pipe(
            map((resp: any) => {
                console.log('respuesta servicio Id', resp);
                return resp;
            })
        );
        }


    insertarLicencias(licencia: PTLLicencias) {
        const url = `${base_url}/api/PTLLicencias/PostInsertarLicencias`;
        return this.http.post<{ ok: boolean, mensaje: string }>(url, licencia, this.headers)
            .pipe(
                map(resp => {
                    console.log('respuesta servicio insertar', resp);
                    return {
                        ok: true,
                        resp
                    };
                })
            );
        }

    modificarLicencias(licencia: PTLLicencias) {
        const url = `${base_url}/api/PTLLicencias/PutModificarLicencias`;
        return this.http.put<{ ok: boolean, mensaje: string }>(url, licencia, this.headers)
        .pipe(
            map(resp => {
            console.log('respuesta servicio modificar', resp);
            return {
                ok: true,
                resp
            };
            })
        );
    }

    eliminarLicencias(id: number) {
        const url = `${base_url}/api/PTLLicencias/DeleteLicencias/${id}`;
        return this.http.delete<{ ok: boolean, mensaje: string }>(url, this.headers)
          .pipe(
            map(resp => {
              console.log('respuesta servicio eliminar', resp);
              return resp;
            })
          );
      }


}
