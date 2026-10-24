import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-treatment-plan',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './treatment-plan.html',
  styleUrl: './treatment-plan.css'
})
export class TreatmentPlan {
  private router = inject(Router);

  showReviewModal = false;
  showMessageModal = false;
  showToast = false;
  toastMessage = '';
  reviewNotes = '';
  messageText = '';

  selectedExercise: any = null;

  planDetails = {
    title: 'Knee Protocol (Phase 2): Dynamic Strength & Mobility',
    diagnosis: 'Right Knee ACL Reconstruction & Lateral Meniscal Repair',
    clinician: 'Dr. Sarah Ahmed, DPT, OCS',
    clinicianTitle: 'Lead Orthopedic Physical Therapist',
    startDate: 'September 01, 2025',
    targetDate: 'November 20, 2025',
    status: 'Active Protocol',
    progress: 68,
    frequency: '4 sessions / week',
    focus: 'Quadriceps hypertrophy, patellar tracking, and hamstring co-activation.'
  };

  phases = [
    {
      phase: 'Phase 1',
      title: 'Acute Protection & Effusion Control',
      status: 'Completed',
      statusClass: 'bg-success text-white',
      completion: '100%',
      icon: 'bi-check-circle-fill'
    },
    {
      phase: 'Phase 2',
      title: 'Early Strength & Kinetic Loading',
      status: 'Active (Current)',
      statusClass: 'bg-primary text-white',
      completion: '68%',
      icon: 'bi-play-circle-fill'
    },
    {
      phase: 'Phase 3',
      title: 'Dynamic Proprioception & Agility',
      status: 'Scheduled',
      statusClass: 'bg-secondary bg-opacity-25 text-dark',
      completion: '0%',
      icon: 'bi-clock'
    },
    {
      phase: 'Phase 4',
      title: 'Return to Full Athletic Clearance',
      status: 'Target: Dec 2025',
      statusClass: 'bg-light text-muted',
      completion: '0%',
      icon: 'bi-flag'
    }
  ];

  exercises = [
    {
      id: 1,
      name: 'Quad Set & Straight Leg Raise',
      target: 'Quadriceps / VMO',
      sets: 3,
      reps: 12,
      frequency: 'Daily (2x per day)',
      instructions: 'Lock knee straight, tighten thigh muscle, and raise leg 12 inches with ankle dorsiflexed. Hold 3 seconds.',
      biofeedback: 'Bio-sensor: Full Extension (0° Target)',
      icon: 'bi-person-walking',
      color: 'primary'
    },
    {
      id: 2,
      name: 'Supported Wall Squats (45°)',
      target: 'Gluteal & Quadriceps Load',
      sets: 3,
      reps: 10,
      frequency: '4 days / week',
      instructions: 'Back flush against wall, slide down to 45 degrees knee flexion. Keep knees aligned over second toe.',
      biofeedback: 'Goniometer: 45° Angle Sync',
      icon: 'bi-person-arms-up',
      color: 'success'
    },
    {
      id: 3,
      name: 'Prone Hamstring Curl with Band',
      target: 'Hamstring & Popliteus',
      sets: 3,
      reps: 15,
      frequency: '3 days / week',
      instructions: 'Lie face down, flex knee against moderate resistance band. Control the eccentric return phase smoothly.',
      biofeedback: 'Cadence: 3s eccentric hold',
      icon: 'bi-person-yoga',
      color: 'info'
    },
    {
      id: 4,
      name: 'Single-Leg Balance on Foam Pad',
      target: 'Proprioception & Ankle Stabilizers',
      sets: 4,
      reps: 30, // 30 sec hold
      frequency: 'Daily',
      instructions: 'Stand on right leg with micro-flexion at knee. Maintain level pelvis without trunk tilting.',
      biofeedback: 'Sway Index: < 2.5cm variance',
      icon: 'bi-compass',
      color: 'warning'
    }
  ];

  triggerToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  downloadPlan() {
    this.triggerToast('Treatment Plan PDF exported successfully! Downloading to your device...');
  }

  openReviewModal() {
    this.reviewNotes = '';
    this.showReviewModal = true;
  }

  closeReviewModal() {
    this.showReviewModal = false;
  }

  submitReviewRequest() {
    this.showReviewModal = false;
    this.triggerToast('Plan review request sent to Dr. Sarah Ahmed. You will receive an update within 24 hours.');
  }

  openMessageModal() {
    this.messageText = '';
    this.showMessageModal = true;
  }

  closeMessageModal() {
    this.showMessageModal = false;
  }

  sendMessage() {
    this.showMessageModal = false;
    this.triggerToast('Message sent to Dr. Sarah Ahmed.');
  }

  startExercise(exercise: any) {
    this.router.navigate(['/patient/exercises']);
  }
}
