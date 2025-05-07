import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PTLUsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
import { PTLRoleAP } from '../_helpers/models/PTLRoleAP.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PTLRolesAPService {
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

  getRoles() {
    const url = `${base_url}/roles`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        return {
          ok: true,
          roles: resp.roles
        };
      })
    );
  }

  getRoleById(id: number) {
    const url = `${base_url}/roles/${id}`;
    return this.http.get(url, this.headers);
  }

  createRole(roles: PTLRoleAP) {
    const url = `${base_url}/roles`;
    return this.http.post(url, roles, this.headers);
  }

  updateRole(roles: PTLRoleAP) {
    const url = `${base_url}/roles/${roles.roleId}`;
    return this.http.put(url, roles, this.headers);
  }

  deleteRole(id: number) {
    const url = `${base_url}/roles/${id}`;
    return this.http.delete(url, this.headers);
  }
}
