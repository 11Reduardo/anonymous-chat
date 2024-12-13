import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <h1 class="text-2xl font-bold">Welcome to the Chat!</h1>
    </div>
  `,
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {}
