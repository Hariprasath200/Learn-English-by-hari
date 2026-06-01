import { Component, signal, afterNextRender } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  // 👈 signals instead of normal variables
  status = signal<'checking' | 'online' | 'offline'>('checking');
  responseTime = signal(0);
  apiResponse = signal<any>(null);
  errorMessage = signal('');

  constructor(private apiService: ApiService) {
    afterNextRender(() => {
      this.testApi();
    });
  }

  testApi() {
    console.log('🔄 testApi called');
    this.status.set('checking');       // 👈 .set() to update signal
    const start = Date.now();

    this.apiService.checkHealth().subscribe({
      next: (res) => {
        console.log('✅ API Response:', res);
        this.status.set('online');
        this.responseTime.set(Date.now() - start);
        this.apiResponse.set(res);
      },
      error: (err) => {
        console.log('❌ API Error:', err);
        this.status.set('offline');
        this.responseTime.set(Date.now() - start);
        this.errorMessage.set(err.message || 'API unreachable');
      }
    });
  }
}