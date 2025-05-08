import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLUsuario } from '../_helpers/models/PTLUsuario.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLUsuariosService {
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

  getUsuarios() {
    const url = `${base_url}/usuarios`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: any) => {
        return {
          ok: true,
          usuarios: resp.usuarios
        };
      })
    );
  }

  getUsuariosById(id: number) {
    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.get( url, this.headers )
  }

  createUsuario(usuario: PTLUsuario) {
    const url = `${ base_url }/usuarios`;
    return this.http.post( url, usuario, this.headers );
  }

  updateUsuario(usuario: PTLUsuario) {
    const url = `${ base_url }/usuarios/${ usuario.usuarioId }`;
    return this.http.put( url, usuario, this.headers );
  }

  deleteUsuario(id: number) {
    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
