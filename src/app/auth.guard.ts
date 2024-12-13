import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loggedIn = false; // Cambiar por el estado real de autenticación

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.loggedIn) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
    return true;
  }
}
