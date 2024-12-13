import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Registro global del servicio
})
export class AuthService {
  private apiUrl = 'http://localhost:7273/api'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      username,
      passwordHash: password,
    });
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      username,
      passwordHash: password,
    });
  }
}

