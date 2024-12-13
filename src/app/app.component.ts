import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importar RouterOutlet para el enrutamiento
  template: `<router-outlet></router-outlet>`, // Declarar el outlet
})
export class AppComponent {}
