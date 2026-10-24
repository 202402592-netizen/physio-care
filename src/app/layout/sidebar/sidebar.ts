import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private sub: Subscription | null = null;

  navLinks: any[] = [];
  bottomLinks: any[] = [];
  userRole: string | null = null;

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.userRole = user?.role || 'patient';
      this.updateNavigation(this.userRole);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  updateNavigation(role: string) {
    if (role === 'admin') {
      this.navLinks = [
        { path: '/admin/dashboard', icon: 'bi-grid-1x2-fill', label: 'Admin Dashboard' },
        { path: '/admin/physiotherapists', icon: 'bi-people', label: 'Physiotherapists' }
      ];
      this.bottomLinks = [
        { path: '/admin/settings', icon: 'bi-gear', label: 'Settings', action: null },
        { path: '#', icon: 'bi-box-arrow-right', label: 'Logout', action: 'logout' }
      ];
    } else if (role === 'doctor' || role === 'clinician') {
      this.navLinks = [
        { path: '/doctor/dashboard', icon: 'bi-grid-1x2-fill', label: 'Doctor Dashboard' },
        { path: '/doctor/exercises', icon: 'bi-person-arms-up', label: 'Exercises' },
        { path: '/doctor/appointments', icon: 'bi-calendar-event', label: 'Appointments' }
      ];
      this.bottomLinks = [
        { path: '/doctor/settings', icon: 'bi-gear', label: 'Settings', action: null },
        { path: '#', icon: 'bi-box-arrow-right', label: 'Logout', action: 'logout' }
      ];
    } else {
      // Patient default
      this.navLinks = [
        { path: '/patient/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
        { path: '/patient/treatment-plan', icon: 'bi-journal-medical', label: 'My Treatment Plan' },
        { path: '/patient/exercises', icon: 'bi-person-arms-up', label: 'My Exercises' },
        { path: '/patient/appointments', icon: 'bi-calendar-event', label: 'Appointments' },
        { path: '/patient/progress', icon: 'bi-graph-up-arrow', label: 'My Progress' },
        { path: '/patient/reports', icon: 'bi-file-earmark-text', label: 'Reports' }
      ];
      this.bottomLinks = [
        { path: '/patient/settings', icon: 'bi-gear', label: 'Settings', action: null },
        { path: '#', icon: 'bi-box-arrow-right', label: 'Logout', action: 'logout' }
      ];
    }
  }

  handleAction(action: string | null, event: Event) {
    if (action === 'logout') {
      event.preventDefault();
      this.authService.logout();
    }
  }
}
