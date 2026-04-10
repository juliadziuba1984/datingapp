import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms'; // Import FormsModule
import {LoginCreds} from '../../models/account';
import {AccountService} from '../../core/services/account-service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ToastService} from '../../core/services/toast-service';
import {themes} from './theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  protected creds: LoginCreds = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const element = document.activeElement as HTMLElement;
    if (element)
      element.blur();
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigateByUrl('/members');
        this.toastService.success('Logged in successfully');
      },
      error: (error: any) => {
        this.toastService.error(error.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
