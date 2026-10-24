import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinician-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinician-patients.html'
})
export class ClinicianPatients {
  activeFilter = 'All';
  searchQuery = '';
  showAddPatientModal = false;
  showPatientDossierModal = false;
  selectedPatient: any = null;
  showToast = false;
  toastMessage = '';

  newPatient = {
    name: '',
    age: 35,
    gender: 'Male',
    protocol: 'Knee Protocol Phase 1 • Acute Care',
    pain: '5/10'
  };

  stats = [
    { label: 'TOTAL PATIENTS', value: '48', trend: '+4 new admissions', trendColor: 'success', subText: 'this month', icon: 'bi-people', iconBg: 'primary' },
    { label: 'ACTIVE PROTOCOLS', value: '32', trend: '67%', trendColor: 'dark', subText: 'of total assigned clinical caseload', icon: 'bi-heart-pulse', iconBg: 'success' },
    { label: 'RE-ASSESSMENT DUE', value: '5', trend: '! Action required', trendColor: 'danger', subText: 'within 48 hours', icon: 'bi-bell', iconBg: 'danger' },
    { label: 'DISCHARGED • COMPLETED', value: '11', trend: '94.2%', trendColor: 'success', subText: 'successful ROM restoration', icon: 'bi-check-circle', iconBg: 'primary' }
  ];

  patients = [
    {
      name: 'Ahmed Mohamed', id: '#PC-4091', age: 32, gender: 'Male',
      protocol: 'Knee Rehabilitation ACL & Meniscus Repair • Phase 3',
      pain: '4/10', painTrend: '-50%',
      progressLabel: 'ROM Recovery', progressValue: '72%', progressColor: 'primary',
      compliance: '85%', complianceSub: 'Synced 2h ago', complianceColor: 'success',
      sessionDate: 'Sep 12, 2025', sessionType: 'In-Clinic (45m)',
      status: 'Active', statusColor: 'success'
    },
    {
      name: 'Mariam Ali', id: '#PC-3812', age: 45, gender: 'Female',
      protocol: 'Shoulder Rehabilitation Rotator Cuff Repair • Phase 2',
      pain: '6/10', painTrend: '+2 Flare', painTrendColor: 'danger',
      progressLabel: 'ROM Recovery', progressValue: '58%', progressColor: 'primary',
      compliance: '52%', complianceSub: 'Sensor drop flagged', complianceColor: 'danger',
      sessionDate: 'Sep 10, 2025', sessionType: 'Tele-Rehab (Virtual)',
      status: 'Needs Attention', statusColor: 'danger'
    },
    {
      name: 'Omar Hassan', id: '#PC-4219', age: 39, gender: 'Male',
      protocol: 'Lower Back Rehabilitation L4-L5 Lumbar Core Stabilization',
      pain: '3/10', painTrend: 'Stable',
      progressLabel: 'Core Stability', progressValue: '81%', progressColor: 'success',
      compliance: '91%', complianceSub: 'High Adherence', complianceColor: 'success',
      sessionDate: 'Sep 13, 2025', sessionType: 'In-Clinic (Manual)',
      status: 'Active', statusColor: 'success'
    },
    {
      name: 'Layla Nour', id: '#PC-3104', age: 28, gender: 'Female',
      protocol: 'Cervical Spine Mobilization Postural Restoration • Phase 2',
      pain: '5/10', painTrend: '',
      progressLabel: 'Cervical ROM', progressValue: '44%', progressColor: 'primary',
      compliance: '78%', complianceSub: 'Routine logs on track', complianceColor: 'dark',
      sessionDate: 'Sep 06, 2025', sessionType: 'Clinical Check (30m)',
      status: 'Re-assessment Due', statusColor: 'warning'
    }
  ];

  get filteredPatients() {
    return this.patients.filter(p => {
      const matchesFilter = this.activeFilter === 'All' || 
        (this.activeFilter === 'Active' && p.status === 'Active') ||
        (this.activeFilter === 'Needs Attention' && p.status === 'Needs Attention') ||
        (this.activeFilter === 'Re-assessment Due' && p.status === 'Re-assessment Due') ||
        (this.activeFilter === 'Discharged / Completed' && p.status === 'Discharged');

      const matchesSearch = !this.searchQuery.trim() || 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        p.protocol.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        p.id.toLowerCase().includes(this.searchQuery.toLowerCase());

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

  setFilter(filter: string, event: Event) {
    event.preventDefault();
    this.activeFilter = filter;
  }

  exportRecords() {
    this.triggerToast('Exporting clinical caseload records (CSV/PDF)...');
  }

  openAddPatient() {
    this.newPatient = {
      name: '',
      age: 35,
      gender: 'Male',
      protocol: 'Knee Protocol Phase 1 • Acute Care',
      pain: '5/10'
    };
    this.showAddPatientModal = true;
  }

  closeAddPatient() {
    this.showAddPatientModal = false;
  }

  savePatient() {
    if (!this.newPatient.name.trim()) {
      this.triggerToast('Please enter patient name.');
      return;
    }
    const id = '#PC-' + Math.floor(1000 + Math.random() * 9000);
    this.patients.unshift({
      name: this.newPatient.name,
      id: id,
      age: this.newPatient.age,
      gender: this.newPatient.gender,
      protocol: this.newPatient.protocol,
      pain: this.newPatient.pain,
      painTrend: 'Intake',
      progressLabel: 'Initial Phase',
      progressValue: '10%',
      progressColor: 'primary',
      compliance: '100%',
      complianceSub: 'Newly Registered',
      complianceColor: 'success',
      sessionDate: 'Today',
      sessionType: 'Intake Evaluation',
      status: 'Active',
      statusColor: 'success'
    });
    this.showAddPatientModal = false;
    this.triggerToast(`Patient ${this.newPatient.name} enrolled with ID ${id}!`);
  }

  selectPatient(p: any) {
    this.selectedPatient = p;
    this.showPatientDossierModal = true;
  }

  closeDossier() {
    this.showPatientDossierModal = false;
  }
}
