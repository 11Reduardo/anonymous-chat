import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './app/login/login.component';
import { ChatComponent } from './app/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'chat', component: ChatComponent }, // Ruta al componente del chat
      ],
      withComponentInputBinding()
    ),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule)
  ],
});
