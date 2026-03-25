import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginCreds, User } from '../../models/account';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  protected creds: LoginCreds = {
    email: '',
    password: '',
  };

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
