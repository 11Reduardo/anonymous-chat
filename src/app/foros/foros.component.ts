import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.css'],
})
export class ForosComponent implements OnInit {
  foros: any[] = [];
  isLoggedIn: boolean = false;
  apiUrl = 'http://localhost:5208/api/forums';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadForums();

    // Suscribirse al estado de login
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  loadForums(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.foros = data;
    });
  }

  postMessage(foro: any): void {
    if (!this.isLoggedIn) {
      alert('You must be logged in to post messages.');
      return;
    }
  
    if (!foro.newMessage?.trim()) return;
  
    // Configuración de headers y envío del mensaje como JSON
    const headers = { 'Content-Type': 'application/json' };
    this.http
      .post(`${this.apiUrl}/${foro.id}/messages`, JSON.stringify(foro.newMessage), { headers })
      .subscribe({
        next: () => {
          foro.messages.push(foro.newMessage.trim());
          foro.newMessage = '';
        },
        error: (err) => {
          console.error('Error sending message:', err);
          alert('Failed to send message.');
        },
      });
  }
  
}


