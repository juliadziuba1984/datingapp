import { Component, inject, output } from '@angular/core';
import { RegisterCreds } from '../../../models/account';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  onCancelRegister = output<boolean>();
  register() {
    this.accountService.register(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }
  cancel() {
    this.onCancelRegister.emit(true);
  }
}
