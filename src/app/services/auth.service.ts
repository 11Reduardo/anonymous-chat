import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5208/api';
  
  // Estado de login
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, passwordHash: password });
  }
  

  private currentUser: string = ''; // Almacena el nombre del usuario logueado

  login(username: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { username, passwordHash: password })
      .pipe(
        tap(() => {
          this.isLoggedIn$.next(true); // Actualiza el estado
          this.currentUser = username; // Guarda el nombre del usuario logueado
        })
      );
  }

  logout(): void {
    this.loggedInSubject.next(false); // Cambiar estado a no logueado
  }

getUsername(): string {
  return this.currentUser; // Devuelve el nombre del usuario logueado
}
}

