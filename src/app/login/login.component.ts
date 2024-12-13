import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        alert('User registered successfully!');
        console.log(response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Login successful!');
        console.log(response);
        // Puedes guardar el token en localStorage si el backend lo envía
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
