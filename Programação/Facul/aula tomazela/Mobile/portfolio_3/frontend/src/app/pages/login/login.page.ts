import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  isSubmitting = false;
  toastOpen = false;
  toastMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.isSubmitting = true;

    this.authService.login(email as string, password as string).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toastMessage = error?.error?.error || 'Falha ao realizar login';
        this.toastOpen = true;
      }
    });
  }
}
