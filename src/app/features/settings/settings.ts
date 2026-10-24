import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html'
})
export class Settings implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private sub: Subscription | null = null;

  currentUser: User | null = null;
  activeTab: 'personal' | 'medical' | 'notifications' | 'display' | 'security' = 'personal';
  isEditing = true;
  showToast = false;
  toastMessage = '';

  // Form Models
  profile = {
    fullName: 'Ahmed Mohamed',
    preferredName: 'Ahmed',
    email: 'ahmed.mohamed@example.com',
    phone: '+1 (555) 382-5104',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=194cbe&color=fff'
  };

  medical = {
    diagnosis: 'Right Knee ACL Reconstruction & Lateral Meniscal Repair',
    surgeryDate: '2025-08-10',
    bloodType: 'O Positive (O+)',
    allergies: 'Penicillin, Latex (Mild contact dermatitis)',
    emergencyContact: 'Fatima Mohamed (Spouse) — +1 (555) 942-0192',
    primaryPhysician: 'Dr. Robert Vance, MD (Orthopedic Surgery)'
  };

  notifications = {
    emailReminders: true,
    smsAlerts: true,
    weeklyDigest: true,
    sensorAlerts: false
  };

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true
  };

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profile.fullName = user.name || this.profile.fullName;
        this.profile.email = user.email || this.profile.email;
        this.profile.preferredName = user.name ? user.name.split(' ')[0] : 'Ahmed';
        this.profile.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Ahmed')}&background=194cbe&color=fff`;
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get userRoleDisplay(): string {
    const role = this.currentUser?.role;
    if (role === 'admin') return 'Administrator';
    if (role === 'doctor' || role === 'clinician') return 'Physiotherapist';
    return 'Patient';
  }

  setTab(tab: 'personal' | 'medical' | 'notifications' | 'display' | 'security', event: Event) {
    event.preventDefault();
    this.activeTab = tab;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  saveChanges() {
    this.authService.updateUserProfile(this.profile.fullName, this.profile.email);
    this.triggerToast('Profile & preferences saved successfully to your PhysioCare account!');
  }

  changePhoto(event: Event) {
    event.preventDefault();
    const newName = prompt('Enter name or initial for new avatar photo:', this.profile.fullName);
    if (newName) {
      this.profile.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=108560&color=fff`;
      this.triggerToast('Profile photo updated.');
    }
  }

  removePhoto(event: Event) {
    event.preventDefault();
    this.profile.avatar = 'https://ui-avatars.com/api/?name=User&background=6b7280&color=fff';
    this.triggerToast('Profile photo reset to default avatar.');
  }

  updateSecurity() {
    if (this.security.newPassword && this.security.newPassword !== this.security.confirmPassword) {
      this.triggerToast('Error: New password and confirmation do not match.');
      return;
    }
    this.security.currentPassword = '';
    this.security.newPassword = '';
    this.security.confirmPassword = '';
    this.triggerToast('Security credentials updated successfully.');
  }
}
