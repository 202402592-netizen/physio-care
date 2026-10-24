import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sub: Subscription | null = null;

  currentUser: User | null = null;
  showProfileMenu = false;
  showNotifications = false;
  showHelpModal = false;
  searchQuery = '';
  hasUnread = true;

  notifications = [
    {
      id: 1,
      title: 'Dr. Sarah Ahmed updated your protocol',
      time: '15m ago',
      icon: 'bi-journal-check',
      color: 'primary',
      read: false
    },
    {
      id: 2,
      title: 'Upcoming Clinical Session tomorrow at 10:00 AM',
      time: '1h ago',
      icon: 'bi-calendar-event',
      color: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Adherence Streak: 5 days continuous tracking!',
      time: '1d ago',
      icon: 'bi-award',
      color: 'warning',
      read: true
    }
  ];

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get userRoleDisplay(): string {
    const role = this.currentUser?.role;
    if (role === 'admin') return 'System Admin';
    if (role === 'doctor' || role === 'clinician') return 'Physiotherapist';
    return 'Patient';
  }

  get userAvatar(): string {
    const name = encodeURIComponent(this.currentUser?.name || 'Ahmed Mohamed');
    return `https://ui-avatars.com/api/?name=${name}&background=194cbe&color=fff`;
  }

  get settingsRoute(): string {
    const role = this.currentUser?.role;
    if (role === 'admin') return '/admin/settings';
    if (role === 'doctor' || role === 'clinician') return '/doctor/settings';
    return '/patient/settings';
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    if (this.showProfileMenu) this.showNotifications = false;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) this.showProfileMenu = false;
  }

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
    this.hasUnread = false;
  }

  openHelp() {
    this.showHelpModal = true;
    this.showProfileMenu = false;
    this.showNotifications = false;
  }

  closeHelp() {
    this.showHelpModal = false;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      const role = this.currentUser?.role;
      if (q.includes('exercise')) {
        this.router.navigate([role === 'doctor' ? '/doctor/exercises' : '/patient/exercises']);
      } else if (q.includes('appoint')) {
        this.router.navigate([role === 'doctor' ? '/doctor/appointments' : '/patient/appointments']);
      } else if (q.includes('progress') || q.includes('score')) {
        this.router.navigate(['/patient/progress']);
      } else if (q.includes('report')) {
        this.router.navigate(['/patient/reports']);
      }
    }
  }

  logout() {
    this.showProfileMenu = false;
    this.authService.logout();
  }
}
