import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinician-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinician-appointments.html'
})
export class ClinicianAppointments {
  timeframe: 'Day' | 'Week' | 'Month' = 'Day';
  showNewAppointmentModal = false;
  showToast = false;
  toastMessage = '';

  newAppt = {
    time: '02:00 - 02:45 PM',
    patient: 'Layla Nour',
    details: 'MRN #PC-3104 • Female 28y',
    type: 'Cervical Spine Mobilization',
    protocol: 'Postural Restoration • Phase 2',
    room: 'Room 3B (Central Wing)'
  };

  stats = [
    { label: 'TODAY\'S SESSIONS', value: '8', subText: 'scheduled', icon: 'bi-calendar-event', color: 'primary', badges: [{ text: '5 In-Clinic', color: 'primary' }, { text: '3 Tele-Rehab', color: 'success' }] },
    { label: 'COMPLETED SESSIONS', value: '5', subText: '62.5% On Track', icon: 'bi-check-circle', color: 'success', footer: '100% Telemetry Synced' },
    { label: 'REMAINING QUEUE', value: '3', subText: 'Active Pipeline', icon: 'bi-clock', color: 'primary', footer: 'Next at 10:30 AM: Mariam Ali' },
    { label: 'CANCELLATIONS', value: '0', subText: 'Optimal Attendance', icon: 'bi-x-circle', color: 'secondary', footer: 'Patient show-up rate: 100%' }
  ];

  schedule = [
    { time: '09:00 - 09:45 AM', patient: 'Ahmed Mohamed', details: 'MRN #PC-4091 • Male 32y', type: 'Right Knee ACL Reconstruction', protocol: 'Phase 3: Quadriceps', status: 'Completed (92% ROM)', room: 'Room 3B (Central Wing)' },
    { time: '10:30 - 11:15 AM', patient: 'Mariam Ali', details: 'MRN #PC-3812 • Female 45y', type: 'Left Rotator Cuff', protocol: 'Scapulohumeral rhythm', status: 'In Waiting Room', room: 'Room 2A (Upper Extremity)' },
    { time: '12:00 - 12:45 PM', patient: 'Omar Hassan', details: 'MRN #PC-4219 • Male 39y', type: 'L4-L5 Lumbar Disc', protocol: 'Core stability biofeedback', status: 'Pending Clearance', room: 'Room 1C (Spine Suite)' }
  ];

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  setTimeframe(tf: 'Day' | 'Week' | 'Month') {
    this.timeframe = tf;
    this.triggerToast(`Schedule view updated to: ${tf}`);
  }

  openNewAppointment() {
    this.showNewAppointmentModal = true;
  }

  closeNewAppointment() {
    this.showNewAppointmentModal = false;
  }

  saveAppointment() {
    this.schedule.push({
      time: this.newAppt.time,
      patient: this.newAppt.patient,
      details: this.newAppt.details,
      type: this.newAppt.type,
      protocol: this.newAppt.protocol,
      status: 'Scheduled',
      room: this.newAppt.room
    });
    this.showNewAppointmentModal = false;
    this.triggerToast(`New clinical session scheduled for ${this.newAppt.patient}.`);
  }

  syncCalendar() {
    this.triggerToast('EHR schedules synchronized with Outlook 365 & Google Health.');
  }

  printRunSheet() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  toggleStatus(session: any) {
    if (session.status.includes('Waiting')) {
      session.status = 'In Session';
    } else if (session.status.includes('In Session')) {
      session.status = 'Completed';
    } else {
      session.status = 'In Waiting Room';
    }
    this.triggerToast(`Session for ${session.patient} updated to: ${session.status}`);
  }
}
