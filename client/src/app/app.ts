import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { Home } from '../features/home/home';
import { User } from '../models/account';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected members = signal<User[] | null>(null);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.http
      .get<User[]>('http://localhost:5055/api/members')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.members.set(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
