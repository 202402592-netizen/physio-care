import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = 'sarah.jenkins@healthmail.com';
  password = 'password123';
  showPassword = false;
  rememberMe = true;
  loading = false;
  errorMessage = '';

  showForgotPasswordModal = false;
  forgotPasswordEmail = '';
  forgotPasswordSuccess = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both your email address and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.navigateToRole();
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = 'Incorrect email or password. Please verify your credentials.';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot reach the server. Please try again later.';
        } else {
          this.errorMessage = err.error?.message || 'Authentication failed. Please try again.';
        }
      }
    });
  }

  loginAs(role: 'patient' | 'doctor' | 'admin') {
    this.errorMessage = '';
    this.authService.loginAs(role);
  }

  openForgotPassword() {
    this.forgotPasswordEmail = this.email;
    this.forgotPasswordSuccess = false;
    this.showForgotPasswordModal = true;
  }

  closeForgotPassword() {
    this.showForgotPasswordModal = false;
  }

  sendPasswordReset() {
    if (this.forgotPasswordEmail) {
      this.forgotPasswordSuccess = true;
      setTimeout(() => {
        this.showForgotPasswordModal = false;
      }, 2500);
    }
  }
}
