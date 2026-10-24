import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.html'
})
export class Progress {
  selectedTimeframe = '1 Month';
  recoveryScore = 72;
  showShareModal = false;
  caregiverEmail = '';
  showToast = false;
  toastMessage = '';

  metrics = [
    {
      title: 'Pain Level (VAS Scale)',
      value: '4',
      suffix: '/ 10 VAS',
      badge: '-50% Severity',
      badgeColor: 'success',
      baseline: 'Baseline: 8 / Minimum resting pain'
    },
    {
      title: 'Range of Motion (Flexion)',
      value: '120°',
      suffix: '/ 135° Normal',
      badge: '+ 30° Flexion',
      badgeColor: 'success',
      baseline: 'Baseline: 90° / 88% of target'
    },
    {
      title: 'Quadriceps Strength (MRC)',
      value: '4',
      suffix: '/ 5 MRC (Good)',
      badge: '+ 1 Grade',
      badgeColor: 'primary',
      baseline: 'Baseline: 3 / 5 / Full gravity resistance'
    },
    {
      title: 'Prescription Compliance',
      value: '85%',
      suffix: 'Adherence',
      badge: '+ 15% WoW',
      badgeColor: 'success',
      baseline: '17 / 20 Sessions / Exceeds 80% Target'
    }
  ];

  milestones = [
    {
      title: 'Initial Biomechanical Intake & Evaluation',
      desc: 'Baseline ROM (90°), effusion assessment, surgical site integrity check.',
      status: 'Completed Aug 18',
      icon: 'bi-check-circle-fill',
      color: 'success'
    },
    {
      title: 'Acute Effusion Resolved & Resting VAS < 5',
      desc: 'Swelling decreased by 2.2 cm on joint line. Cryo-compression protocol concluded.',
      status: 'Completed Aug 28',
      icon: 'bi-check-circle-fill',
      color: 'success'
    },
    {
      title: 'First 10 Prescription Sessions Completed',
      desc: 'Quad sets, prone hangs, and heel slides executed with consistent technique.',
      status: 'Completed Sep 05',
      icon: 'bi-check-circle-fill',
      color: 'success'
    },
    {
      title: 'Range of Motion Improved by ≥ 30° (120° Cleared)',
      desc: 'Stationary cycling without resistance cleared by Dr. Sarah Ahmed.',
      status: 'Completed Sep 09',
      icon: 'bi-check-circle-fill',
      color: 'success'
    },
    {
      title: 'Active Strength & Patellofemoral Stability',
      desc: 'Target: 60-second isometric holds with 5 lb blue band resistance without compensation.',
      status: 'In Progress (75%)',
      icon: 'bi-circle-half',
      color: 'primary',
      badge: 'ACTIVE PHASE'
    }
  ];

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  setTimeframe(tf: string) {
    this.selectedTimeframe = tf;
    if (tf === '1 Month') this.recoveryScore = 72;
    if (tf === '3 Months') this.recoveryScore = 84;
    if (tf === '6 Months') this.recoveryScore = 91;
    if (tf === 'All Time') this.recoveryScore = 72;
    this.triggerToast(`Progress view updated to: ${tf}`);
  }

  exportReport() {
    this.triggerToast('Exporting clinical progress report (PDF)... Download starting shortly.');
  }

  openShare() {
    this.caregiverEmail = '';
    this.showShareModal = true;
  }

  closeShare() {
    this.showShareModal = false;
  }

  submitShare() {
    if (this.caregiverEmail) {
      this.showShareModal = false;
      this.triggerToast(`Encrypted progress summary sent to ${this.caregiverEmail}.`);
    }
  }
}
