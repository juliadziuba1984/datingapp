import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected members = signal<any>(null);
   private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.http.get('http://localhost:5055/api/members').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (response) => {
        console.log('API is healthy:', response);
        this.members.set(response);
      },
      error: (error) => {
        console.error('API health check failed:', error);
        this.title.set('API is unhealthy');
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
