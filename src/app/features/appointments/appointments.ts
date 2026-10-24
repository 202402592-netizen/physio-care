import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.html'
})
export class Appointments {
  viewMode: 'list' | 'split' | 'calendar' = 'split';
  filterStatus = 'all';
  showBookModal = false;
  showPrepModal = false;
  showRescheduleModal = false;
  showToast = false;
  toastMessage = '';

  activeSession: any = null;

  bookForm = {
    title: 'Post-Op Knee Follow-Up & Goniometer Tracking',
    date: '2025-10-14',
    time: '11:00 AM (45 min)',
    doctor: 'Dr. Sarah Ahmed, DPT',
    location: 'In-Clinic • Room 3B',
    type: 'In-Clinic Evaluation'
  };

  rescheduleDate = '2025-09-18';
  rescheduleTime = '02:00 PM';

  nextSession = {
    title: 'Dr. Sarah Ahmed, DPT',
    specialty: 'Board Certified Clinical Specialist (OCS) • Lead Physiotherapist',
    rating: '4.9 (120+ sessions)',
    date: 'Monday, September 15, 2025',
    time: '10:00 AM - 10:45 AM (45 Minutes)',
    location: 'In-Clinic • Room 3B',
    teleBackup: true,
    prepNotes: 'Bring comfortable gym shorts, prescribed brace, and ensure wearable motion sensor has at least 50% battery.'
  };

  upcomingSessions = [
    {
      id: 1,
      date: 'SEP 22',
      title: 'Session #6 — Advanced Kinetic Dynamic Loading',
      status: 'Confirmed',
      time: '10:00 AM (45 min)',
      location: 'In-Clinic • Room 3B',
      doctor: 'Dr. Sarah Ahmed'
    },
    {
      id: 2,
      date: 'SEP 29',
      title: 'Session #7 — Biomechanical Gait & Proprioception',
      status: 'Pending Confirmation',
      time: '10:00 AM (45 min)',
      location: 'Tele-Rehab (Video Consult)',
      doctor: 'Dr. Sarah Ahmed'
    },
    {
      id: 3,
      date: 'OCT 06',
      title: 'Session #8 — Mid-Protocol Functional Evaluation',
      status: 'Scheduled',
      time: '10:00 AM (60 min)',
      location: 'Motion Lab 1 (Goniometer Sync)',
      doctor: 'Dr. Sarah Ahmed'
    }
  ];

  get filteredSessions() {
    if (this.filterStatus === 'all') return this.upcomingSessions;
    return this.upcomingSessions.filter(s => s.status.toLowerCase().includes(this.filterStatus.toLowerCase()));
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  openBookModal() {
    this.showBookModal = true;
  }

  closeBookModal() {
    this.showBookModal = false;
  }

  confirmBooking() {
    const formattedDate = 'OCT 14';
    this.upcomingSessions.push({
      id: Date.now(),
      date: formattedDate,
      title: this.bookForm.title,
      status: 'Confirmed',
      time: this.bookForm.time,
      location: this.bookForm.location,
      doctor: this.bookForm.doctor
    });
    this.showBookModal = false;
    this.triggerToast('New appointment scheduled successfully with Dr. Sarah Ahmed!');
  }

  openPrepModal() {
    this.showPrepModal = true;
  }

  closePrepModal() {
    this.showPrepModal = false;
  }

  addToCalendar(sessionTitle?: string) {
    this.triggerToast(`Session "${sessionTitle || this.nextSession.title}" added to your calendar.`);
  }

  openRescheduleModal(session?: any) {
    this.activeSession = session || this.nextSession;
    this.showRescheduleModal = true;
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
  }

  saveReschedule() {
    this.showRescheduleModal = false;
    if (this.activeSession) {
      this.activeSession.time = `${this.rescheduleTime} (Rescheduled)`;
      this.triggerToast('Session successfully rescheduled.');
    }
  }

  cancelSession(session?: any) {
    if (confirm('Are you sure you want to cancel this clinical session?')) {
      if (session) {
        session.status = 'Cancelled';
      }
      this.triggerToast('Session cancelled. A notification has been sent to your clinic.');
    }
  }
}
