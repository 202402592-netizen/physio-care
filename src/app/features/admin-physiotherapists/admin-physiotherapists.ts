import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-physiotherapists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-physiotherapists.html'
})
export class AdminPhysiotherapists {
  activeFilter = 'All';
  searchQuery = '';
  selectedPhysio: any = null;
  showDossier = true;
  showAddModal = false;
  showReassignModal = false;
  showShiftsModal = false;
  showToast = false;
  toastMessage = '';

  newPhysio = {
    name: '',
    spec: 'Orthopedic Rehabilitation',
    license: 'PT-99824',
    email: ''
  };

  reassignTarget = {
    fromClinician: 'Dr. Sarah Ahmed',
    toClinician: 'Dr. Arthur Liu',
    patientCount: 5
  };

  shiftDetails = {
    clinician: 'Dr. Sarah Ahmed',
    shift: 'Morning (08:00 AM - 04:00 PM)',
    days: 'Monday - Friday'
  };

  stats = [
    { label: 'Total Physiotherapists', value: '32', icon: 'bi-people', trend: '+2 this quarter', color: 'primary' },
    { label: 'Active Clinicians', value: '28', icon: 'bi-briefcase-medical', trend: '87.5% Duty', color: 'success' },
    { label: 'Pending Approval', value: '3', icon: 'bi-file-earmark-medical', trend: 'Action Required', color: 'warning' },
    { label: 'Inactive / On Leave', value: '1', icon: 'bi-calendar2-x', trend: 'Standard Rotation', color: 'secondary' }
  ];

  physios = [
    { 
      name: 'Dr. Sarah Ahmed, PT, DPT', spec: 'Orthopedic & Knee Rehab', 
      workloadLabel: 'Moderate (80%)', workloadValue: '80%', workloadColor: 'primary',
      activePlans: 18, today: '4 / 4 done', status: 'Active', selected: true,
      patientsCount: 24, maxPatients: 30
    },
    { 
      name: 'Dr. Marcus Rivera, PT, DPT', spec: 'Sports Med & Rotator Cuff', 
      workloadLabel: 'Near Cap (93%)', workloadValue: '93%', workloadColor: 'danger',
      activePlans: 22, today: '5 / 7 done', status: 'Active', selected: false,
      patientsCount: 28, maxPatients: 30
    },
    { 
      name: 'Dr. Emily Chen, PT, DPT', spec: 'Spine & Lumbar Stabilization', 
      workloadLabel: 'Low (0%)', workloadValue: '0%', workloadColor: 'secondary',
      activePlans: 0, today: '—', status: 'Pending', selected: false,
      patientsCount: 0, maxPatients: 30
    },
    { 
      name: 'Dr. Arthur Liu, PT', spec: 'Geriatric Mobility & Hip', 
      workloadLabel: 'Optimal (63%)', workloadValue: '63%', workloadColor: 'success',
      activePlans: 15, today: '4 / 4 done', status: 'Active', selected: false,
      patientsCount: 19, maxPatients: 30
    }
  ];

  constructor() {
    this.selectedPhysio = this.physios[0];
  }

  get filteredPhysios() {
    return this.physios.filter(p => {
      const matchesFilter = this.activeFilter === 'All' || 
        (this.activeFilter === 'Active' && p.status === 'Active') ||
        (this.activeFilter === 'Pending' && p.status === 'Pending') ||
        (this.activeFilter === 'Inactive' && p.status === 'Inactive');

      const matchesSearch = !this.searchQuery.trim() || 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        p.spec.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  selectPhysio(pt: any) {
    this.physios.forEach(p => p.selected = false);
    pt.selected = true;
    this.selectedPhysio = pt;
    this.showDossier = true;
  }

  toggleSelect(pt: any, event: Event) {
    event.stopPropagation();
    this.selectPhysio(pt);
  }

  exportRoster() {
    this.triggerToast('Exporting active clinician roster (CSV)...');
  }

  openAddModal() {
    this.newPhysio = {
      name: '',
      spec: 'Orthopedic Rehabilitation',
      license: 'PT-' + Math.floor(10000 + Math.random() * 90000),
      email: ''
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  savePhysio() {
    if (!this.newPhysio.name.trim()) {
      this.triggerToast('Please provide clinician name.');
      return;
    }
    const item = {
      name: this.newPhysio.name,
      spec: this.newPhysio.spec,
      workloadLabel: 'Optimal (10%)',
      workloadValue: '10%',
      workloadColor: 'success',
      activePlans: 1,
      today: '0 / 1',
      status: 'Active',
      selected: false,
      patientsCount: 2,
      maxPatients: 30
    };
    this.physios.unshift(item);
    this.selectPhysio(item);
    this.showAddModal = false;
    this.triggerToast(`Clinician ${item.name} added to staff roster!`);
  }

  openReassign() {
    this.reassignTarget.fromClinician = this.selectedPhysio ? this.selectedPhysio.name : 'Dr. Sarah Ahmed';
    this.showReassignModal = true;
  }

  closeReassign() {
    this.showReassignModal = false;
  }

  confirmReassign() {
    this.showReassignModal = false;
    this.triggerToast(`Reassigned ${this.reassignTarget.patientCount} patients from ${this.reassignTarget.fromClinician} to ${this.reassignTarget.toClinician}.`);
  }

  openShifts() {
    this.shiftDetails.clinician = this.selectedPhysio ? this.selectedPhysio.name : 'Dr. Sarah Ahmed';
    this.showShiftsModal = true;
  }

  closeShifts() {
    this.showShiftsModal = false;
  }

  saveShifts() {
    this.showShiftsModal = false;
    this.triggerToast(`Shift schedule updated for ${this.shiftDetails.clinician}.`);
  }

  closeDossier() {
    this.showDossier = false;
  }
}
