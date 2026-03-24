import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginCreds, User } from '../../models/account';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: LoginCreds = {
    email: '',
    password: '',
  };

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error: Error) => alert(error.message),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
