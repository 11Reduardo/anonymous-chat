import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { LoginComponent } from './app/login/login.component';

const routes: Route[] = [
  { path: '', component: LoginComponent }, // Ruta principal
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proveer HttpClient globalmente
    provideRouter(routes), // Configurar las rutas
  ],
}).catch((err) => console.error(err));
