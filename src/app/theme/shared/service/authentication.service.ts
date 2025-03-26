import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { PTLsuarioAP } from '../_helpers/models/PTLUsuarioAP.model';
// import { User } from '../_helpers/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // eslint-disable-next-line
  private currentUserSubject: BehaviorSubject<PTLsuarioAP | any>;
  public currentUser: Observable<PTLsuarioAP>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // eslint-disable-next-line
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): PTLsuarioAP {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<PTLsuarioAP>(`${environment.apiUrl}/api/account/login`, { email, password }).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/signin-v2']);
  }
}
