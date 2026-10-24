import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  role: 'patient' | 'clinician' = 'patient';
  agreeTerms = true;
  showPassword = false;
  loading = false;
  errorMessage = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please review and accept the HIPAA and privacy terms to continue.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.navigateToRole(this.role);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 400 && err.error?.message?.includes('duplicate key')) {
          this.errorMessage = 'An account with this email address already exists. Please log in.';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot reach the server. Please try again later.';
        } else {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
