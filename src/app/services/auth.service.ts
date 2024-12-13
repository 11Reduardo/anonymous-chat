import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible globalmente
})
export class AuthService {
  private apiUrl = 'http://localhost:5208/api'; // Base del backend

  constructor(private http: HttpClient) {}

  /**
   * Registrar un nuevo usuario.
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   * @returns Observable con la respuesta del backend
   */
  register(username: string, password: string): Observable<any> {
    if (!username || !password) {
      throw new Error('Invalid input: username and password are required.');
    }

    const payload = {
      username,
      passwordHash: password, // El backend espera `passwordHash`
    };

    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  /**
   * Iniciar sesión.
   * @param username - Nombre de usuario
   * @param password - Contraseña del usuario
   * @returns Observable con la respuesta del backend
   */
  login(username: string, password: string): Observable<any> {
    if (!username || !password) {
      throw new Error('Invalid input: username and password are required.');
    }

    const payload = {
      username,
      passwordHash: password,
    };

    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }
}

