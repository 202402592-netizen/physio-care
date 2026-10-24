import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboard {
  selectedHub = 'All Hubs (Main & Satellite)';
  selectedDateRange = 'Aug 17 - Sep 15, 2025';
  userRoleFilter = 'All';
  showDirectoryModal = false;
  showFloorScheduleModal = false;
  showToast = false;
  toastMessage = '';

  stats = [
    { label: 'TOTAL PATIENTS', value: '1,248', trend: '+ 12.4% MoM', trendColor: 'success', subText: 'vs last 30d', footer: '1,082 Active in care • 166 Discharged', icon: 'bi-people', iconBg: 'primary' },
    { label: 'ACTIVE CLINICIANS', value: '32', trend: '2 this quarter', trendColor: 'primary', subText: '94% Utilization', footer: '28 On duty today • 4 On leave', icon: 'bi-person-badge', iconBg: 'success' },
    { label: 'APPOINTMENTS TODAY', value: '86', trend: '92% Capacity', trendColor: 'primary', subText: 'Scheduled', footer: '64 Done • 18 Queue • 4 No-show', icon: 'bi-calendar-check', iconBg: 'primary' },
    { label: 'ACTIVE CARE PLANS', value: '734', trend: '- 8.1% Adherence', trendColor: 'danger', subText: 'Sensor synced', footer: '482 Post-Surg • 252 Conservative', icon: 'bi-journal-medical', iconBg: 'primary' }
  ];

  users = [
    { name: 'Dr. Emily Chen, PT', email: 'dr.chen@physiocare.io', role: 'Physiotherapist', roleColor: 'primary', registered: 'Sep 15, 2025', status: 'Pending Lic.', statusColor: 'warning' },
    { name: 'Ahmed Mohamed', email: 'MRN #PC-4091', role: 'Patient', roleColor: 'dark', registered: 'Sep 14, 2025', status: 'Active', statusColor: 'success' },
    { name: 'Dr. Marcus Rivera', email: 'dr.rivera@physiocare.io', role: 'Physiotherapist', roleColor: 'primary', registered: 'Sep 13, 2025', status: 'Active', statusColor: 'success' },
    { name: 'Elena Rostova', email: 'MRN #PC-4098', role: 'Patient', roleColor: 'dark', registered: 'Sep 12, 2025', status: 'Active', statusColor: 'success' },
    { name: 'David K. Miller', email: 'd.miller@physiocare.io', role: 'Clinic Lead', roleColor: 'dark', registered: 'Sep 10, 2025', status: 'Active', statusColor: 'success' }
  ];

  queue = [
    { patient: 'James Wilson', time: '09:00 AM', status: 'In Progress', statusColor: 'primary', provider: 'Dr. Rivera', room: 'Station 2' },
    { patient: 'Sarah Connor', time: '09:30 AM', status: 'Waiting', statusColor: 'warning', provider: 'Dr. Chen', room: 'Station 4' },
    { patient: 'Mike Tyson', time: '10:00 AM', status: 'Scheduled', statusColor: 'secondary', provider: 'Dr. Rivera', room: 'Station 2' },
    { patient: 'Lisa Taylor', time: '11:15 AM', status: 'Scheduled', statusColor: 'secondary', provider: 'Dr. Sarah Ahmed', room: 'Station 1' }
  ];

  get filteredUsers() {
    if (this.userRoleFilter === 'All') return this.users;
    if (this.userRoleFilter === 'Patients') return this.users.filter(u => u.role === 'Patient');
    if (this.userRoleFilter === 'Physios') return this.users.filter(u => u.role === 'Physiotherapist');
    return this.users;
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  cycleHub() {
    const hubs = [
      'All Hubs (Main & Satellite)',
      'Main Hub — Central Medical Complex',
      'Satellite Clinic — Northside Pavilion'
    ];
    const currentIndex = hubs.indexOf(this.selectedHub);
    this.selectedHub = hubs[(currentIndex + 1) % hubs.length];
    this.triggerToast(`Viewing operational metrics for: ${this.selectedHub}`);
  }

  cycleDateRange() {
    const ranges = [
      'Aug 17 - Sep 15, 2025',
      'Last 7 Days',
      'This Fiscal Quarter'
    ];
    const idx = ranges.indexOf(this.selectedDateRange);
    this.selectedDateRange = ranges[(idx + 1) % ranges.length];
    this.triggerToast(`Date filter adjusted to: ${this.selectedDateRange}`);
  }

  setUserFilter(filter: string) {
    this.userRoleFilter = filter;
  }

  openDirectory() {
    this.showDirectoryModal = true;
  }

  closeDirectory() {
    this.showDirectoryModal = false;
  }

  openFloorSchedule() {
    this.showFloorScheduleModal = true;
  }

  closeFloorSchedule() {
    this.showFloorScheduleModal = false;
  }
}
