import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ForosComponent } from './app/foros/foros.component';
import { MensajesComponent } from './app/mensajes/mensajes.component';

const routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'foros', component: ForosComponent }, // Página de foros
  { path: 'mensajes', component: MensajesComponent }, // Página de mensajes
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FormsModule), // FormsModule para [(ngModel)]
  ],
}).catch((err) => console.error(err));

console.log(routes);