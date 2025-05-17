/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLEmpresaSC } from '../_helpers/models/PTLEmpresaSC.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLEmpresasSCService {
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

  getEmpresas() {
    const url = `${base_url}/empresas-sc`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          empresas: resp.empresas
        };
      })
    );
  }

  getEmpresaById(id: number) {
    const url = `${ base_url }/empresas-sc/${ id }`;
    return this.http.get( url, this.headers )
  }

  createEmpresa(empresas: PTLEmpresaSC) {
    const url = `${ base_url }/empresas-sc`;
    return this.http.post( url, empresas, this.headers );
  }

  updateEmpresa(empresas: PTLEmpresaSC) {
    const url = `${ base_url }/empresas-sc/${ empresas.empresaId }`;
    return this.http.put( url, empresas, this.headers );
  }

  deleteEmpresa(id: number) {
    const url = `${ base_url }/empresas-sc/${ id }`;
    return this.http.delete( url, this.headers );
  }
}
