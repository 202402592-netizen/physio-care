import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'clinician' | 'admin';
  token?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly API_URL = 'https://physio-care-mu.vercel.app/api/v1/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    let storedUser: User | null = null;
    if (this.isBrowser()) {
      try {
        const raw = localStorage.getItem('currentUser');
        if (raw) {
          storedUser = JSON.parse(raw);
        }
      } catch (e) {
        console.error('Error reading currentUser from localStorage', e);
      }
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Verify token validity with backend if present
    if (this.isBrowser() && this.getToken()) {
      this.getMe().subscribe({
        error: () => {
          // Token expired or invalid
          console.warn('Stored token is invalid or backend unreachable.');
        }
      });
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserValue;
  }

  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.role : null;
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null && !!this.getToken();
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        if (res && res.token && res.data && res.data.user) {
          this.setSession(res.token, res.data.user);
        }
      })
    );
  }

  register(userData: { name: string; email: string; password: string; role: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData).pipe(
      tap(res => {
        if (res && res.token && res.data && res.data.user) {
          this.setSession(res.token, res.data.user);
        }
      })
    );
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/me`).pipe(
      tap(res => {
        if (res && res.data && res.data.user) {
          const token = this.getToken() || '';
          const updatedUser: User = { ...res.data.user, token };
          if (this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          }
          this.currentUserSubject.next(updatedUser);
        }
      })
    );
  }

  private setSession(token: string, user: User) {
    const sessionUser: User = {
      ...user,
      id: user._id || user.id || '1',
      token
    };
    if (this.isBrowser()) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    }
    this.currentUserSubject.next(sessionUser);
  }

  // Quick switch or demo login fallback
  loginAs(role: 'patient' | 'doctor' | 'admin') {
    const defaultEmail = role === 'admin'
      ? 'admin@physiocare.com'
      : (role === 'doctor' ? 'doctor@physiocare.com' : 'patient@physiocare.com');
    const defaultPassword = 'password123';
    const defaultName = role === 'admin'
      ? 'System Administrator'
      : (role === 'doctor' ? 'Dr. Sarah Ahmed, DPT' : 'Ahmed Mohamed');

    // Attempt backend login first
    this.login({ email: defaultEmail, password: defaultPassword }).subscribe({
      next: (res) => {
        this.navigateToRole(role);
      },
      error: () => {
        // If user doesn't exist yet on backend, attempt auto-registration
        const backendRole = role === 'doctor' ? 'clinician' : role;
        this.register({
          name: defaultName,
          email: defaultEmail,
          password: defaultPassword,
          role: backendRole
        }).subscribe({
          next: () => {
            this.navigateToRole(role);
          },
          error: () => {
            // Fallback to active mock session if backend database rejects
            const mockUser: User = {
              id: 'demo-' + Date.now(),
              name: defaultName,
              email: defaultEmail,
              role: role,
              token: 'demo-token-' + role
            };
            this.setSession(mockUser.token!, mockUser);
            this.navigateToRole(role);
          }
        });
      }
    });
  }

  navigateToRole(role?: string) {
    const userRole = role || this.getUserRole();
    if (userRole === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === 'doctor' || userRole === 'clinician') {
      this.router.navigate(['/doctor/dashboard']);
    } else {
      this.router.navigate(['/patient/dashboard']);
    }
  }

  updateUserProfile(name: string, email: string) {
    if (this.currentUserValue) {
      const updated: User = {
        ...this.currentUserValue,
        name,
        email
      };
      if (this.isBrowser()) {
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
      this.currentUserSubject.next(updated);
    }
  }

  logout() {
    if (this.getToken()) {
      this.http.post(`${this.API_URL}/logout`, {}).pipe(
        catchError(() => of(null))
      ).subscribe();
    }
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
