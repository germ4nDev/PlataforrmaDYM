﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PTLsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<PTLsuarioAP[]>(`${environment.apiUrl}/PTLUsuariosAP`);
  }
}
