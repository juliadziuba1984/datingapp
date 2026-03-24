import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../models/account';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  constructor() {
    this.initCurrentUser();
  }

  initCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) this.currentUser.set(JSON.parse(user));

    console.log(this.currentUser());
  }

  register(creds: RegisterCreds): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user !== null) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user !== null) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  private setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}
