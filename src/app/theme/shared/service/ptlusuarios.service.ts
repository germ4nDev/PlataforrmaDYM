/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLUsuarios } from '../_helpers/models/PTLUsuarios.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLUsuariosService {
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

    getUsuarios() {
        const url = `${ base_url }/api/PTLUsuarios/GetListUsuarios`;
        return this.http.get<PTLUsuarios[]>( url, this.headers )
        .pipe(
            map((resp: PTLUsuarios[]) => {
                console.log('respuesta servicio', resp);
                return {
                    ok: true,
                    resp
                };
            })
        );
    }

    getUsuarioById(id: number) {
        const url = `${base_url}/api/PTLUsuarios/GetUsuarioById/${id}`;
        return this.http.get(url, this.headers)
        .pipe(
            map((resp: any) => {
                console.log('respuesta servicio Id', resp);
                return resp;
            })
        );
        }


    insertarUsuarios(usuario: PTLUsuarios) {
        const url = `${base_url}/api/PTLUsuarios/PostInsertarUsuario`;
        return this.http.post<{ ok: boolean, mensaje: string }>(url, usuario, this.headers)
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

    modificarUsuarios(usuario: PTLUsuarios) {
        const url = `${base_url}/api/PTLUsuarios/PutModificarUsuario`;
        return this.http.put<{ ok: boolean, mensaje: string }>(url, usuario, this.headers)
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

    eliminarUsuarios(id: number) {
        const url = `${base_url}/api/PTLUsuarios/DeleteUsuario/${id}`;
        return this.http.delete<{ ok: boolean, mensaje: string }>(url, this.headers)
          .pipe(
            map(resp => {
              console.log('respuesta servicio eliminar', resp);
              return resp;
            })
          );
      }


}
