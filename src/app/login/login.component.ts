import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Maneja los cambios en el input de username.
   */
  onUsernameInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.username = inputElement?.value || '';
  }

  /**
   * Maneja los cambios en el input de password.
   */
  onPasswordInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement?.value || '';
  }

  register(): void {
    if (this.isInputValid()) {
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Registration successful!');
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert('Registration failed! Please try again.');
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  login(): void {
    if (this.isInputValid()) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.router.navigate(['/foros']);
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Login failed! Please check your credentials.');
        },
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  private isInputValid(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }
}



