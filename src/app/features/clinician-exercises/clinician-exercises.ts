import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinician-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinician-exercises.html'
})
export class ClinicianExercises {
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery = '';
  activeTagFilter = 'All';
  selectedExercise: any = null;

  showAddModal = false;
  showAssignModal = false;
  showToast = false;
  toastMessage = '';

  newProtocol = {
    title: '',
    desc: '',
    tags: 'Knee, Intermediate, Resistance Band',
    details: '3 Sets • 10 Reps | 3s Hold • 4x/wk',
    telemetry: 'Goniometer Synced'
  };

  assignTarget = {
    patientName: 'Ahmed Mohamed (#PC-4091)',
    frequency: 'Daily (2x per day)',
    notes: 'Prioritize slow eccentric descent; halt if pain VAS exceeds 4.'
  };

  stats = [
    { value: '148', label: 'Evidence Protocols', icon: 'bi-journal-medical', color: 'primary' },
    { value: '42', label: 'Wearable Biofeedback', icon: 'bi-broadcast', color: 'success' },
    { value: '100%', label: 'APTA Compliant', icon: 'bi-shield-check', color: 'primary' },
    { value: '12', label: 'Updated This Month', icon: 'bi-arrow-clockwise', color: 'dark' }
  ];

  exercises = [
    {
      id: '#EX-KN-104',
      title: 'Seated Knee Extension with Resistance Band',
      desc: 'Controlled kinetic chain extension targeting terminal Vastus Medialis tracking and patellar stability.',
      video: '0:45 Video Guide',
      tags: ['Quadriceps', 'Beginner', 'Band & Chair'],
      details: '3 Sets • 12 Reps | 3s Hold • Daily (AM/PM)',
      telemetry: 'Active ROM Telemetry (0° Extension Target)'
    },
    {
      id: '#EX-KN-088',
      title: 'Supported Isometric Wall Squats',
      desc: 'Closed kinetic chain loading for patellar tendon stiffness and quadriceps co-activation without shear stress.',
      video: '1:10 HD Audio',
      tags: ['Knee / Core', 'Intermediate', 'Wall Only'],
      details: '3 Sets x 10 Reps | 5s Hold at 60° • 4x/wk',
      telemetry: 'Haptic Angle Alert (<65°)'
    },
    {
      id: '#EX-KN-012',
      title: 'Supine Straight Leg Raise & Hold',
      desc: 'Eliminates extensor lag post-surgery while maintaining strict pelvic stability with ankle dorsiflexion.',
      video: '0:30 Audio',
      tags: ['Knee / Hip', 'Beginner', 'Mat Only'],
      details: '2 Sets x 10 Reps | 3s Peak Hold • Daily',
      telemetry: 'EMG Surface Telemetry'
    },
    {
      id: '#EX-KN-045',
      title: 'Prone Hamstring Curl with Yellow Elastic',
      desc: 'Posterior chain kinetic activation isolating biceps femoris and popliteal unlocking mechanism.',
      video: '0:40 Video Guide',
      tags: ['Hamstrings', 'Beginner', 'Elastic Loop'],
      details: '3 Sets x 10 Reps | 2s Hold • 3x/wk',
      telemetry: 'Tension Sensor Synced'
    }
  ];

  constructor() {
    this.selectedExercise = this.exercises[0];
  }

  get filteredExercises() {
    return this.exercises.filter(ex => {
      const matchesSearch = !this.searchQuery.trim() || 
        ex.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        ex.id.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        ex.tags.some(t => t.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchesTag = this.activeTagFilter === 'All' || 
        ex.tags.some(t => t.toLowerCase().includes(this.activeTagFilter.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  selectExercise(ex: any) {
    this.selectedExercise = ex;
  }

  openAddProtocol() {
    this.newProtocol = {
      title: '',
      desc: '',
      tags: 'Knee, Intermediate, Resistance Band',
      details: '3 Sets • 10 Reps | 3s Hold • 4x/wk',
      telemetry: 'Goniometer Synced'
    };
    this.showAddModal = true;
  }

  closeAddProtocol() {
    this.showAddModal = false;
  }

  saveProtocol() {
    if (!this.newProtocol.title.trim()) {
      this.triggerToast('Please provide a protocol title.');
      return;
    }
    const id = '#EX-KN-' + Math.floor(100 + Math.random() * 900);
    const item = {
      id: id,
      title: this.newProtocol.title,
      desc: this.newProtocol.desc || 'Standard clinical rehabilitation protocol with biofeedback integration.',
      video: '1:00 Guided Video',
      tags: this.newProtocol.tags.split(',').map(s => s.trim()),
      details: this.newProtocol.details,
      telemetry: this.newProtocol.telemetry
    };
    this.exercises.unshift(item);
    this.selectedExercise = item;
    this.showAddModal = false;
    this.triggerToast(`Protocol "${item.title}" created with ID ${id}!`);
  }

  openAssign(ex: any, event: Event) {
    event.stopPropagation();
    this.selectedExercise = ex;
    this.showAssignModal = true;
  }

  closeAssign() {
    this.showAssignModal = false;
  }

  confirmAssign() {
    this.showAssignModal = false;
    this.triggerToast(`Protocol ${this.selectedExercise.id} assigned to ${this.assignTarget.patientName}!`);
  }

  setTagFilter(tag: string) {
    this.activeTagFilter = this.activeTagFilter === tag ? 'All' : tag;
  }
}
