import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Message {
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
})
export class MensajesComponent implements OnInit {
  apiUrl = 'http://localhost:5208/api/messages';
  searchQuery: string = ''; // Texto del buscador
  searchResults: { username: string }[] = []; // Resultados del buscador
  searchError: string = '';

  username: string = ''; // Usuario logueado
  recipient: string = ''; // Usuario seleccionado para el chat
  messages: Message[] = []; // Mensajes de la conversación
  newMessage: string = ''; // Texto del nuevo mensaje
  isLoggedIn: boolean = false; // Estado de login

  constructor(private http: HttpClient, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (!status) {
        this.router.navigate(['/login']); // Redirigir al login si no está logueado
      } else {
        this.username = this.authService.getUsername(); // Obtener el usuario logueado
      }
    });
  }

  // Buscar usuarios
  searchUsers(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      this.searchError = '';
      return;
    }

    this.http
      .get<{ username: string }[]>(`${this.apiUrl}/search?query=${this.searchQuery}`)
      .subscribe({
        next: (data) => {
          this.searchResults = data;
          this.searchError = '';
        },
        error: (err) => {
          if (err.status === 404) {
            this.searchError = 'User not found.';
            this.searchResults = [];
          } else {
            console.error('Error searching users:', err);
          }
        },
      });
  }

  // Cargar la conversación con el usuario seleccionado
  loadMessages(username: string): void {
    this.recipient = username;
  
    this.http
      .get<Message[]>(`${this.apiUrl}/${this.username}/${this.recipient}`)
      .subscribe({
        next: (data) => {
          this.messages = data; // Cargar mensajes desde el backend
        },
        error: (err) => {
          console.error('Error loading messages:', err);
        },
      });
  }

  // Enviar un nuevo mensaje
  sendMessage(): void {
    if (!this.newMessage.trim() || !this.recipient.trim()) return;
  
    const message = {
      from: this.username, // Asegúrate de que sea el nombre del usuario real
      to: this.recipient,
      content: this.newMessage,
      timestamp: new Date().toISOString(),
    };
  
    this.http.post(`${this.apiUrl}`, message).subscribe(() => {
      this.messages.push(message);
      this.newMessage = '';
    });
  }
}
