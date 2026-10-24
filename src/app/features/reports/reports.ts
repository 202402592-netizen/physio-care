import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html'
})
export class Reports {
  selectedCategory = 'all';
  showRequestModal = false;
  showDocModal = false;
  selectedDoc: any = null;
  requestNote = '';
  showToast = false;
  toastMessage = '';

  categories = [
    { title: 'Progress Reports', count: 3, desc: 'Tracking longitudinal recovery milestones, pain trends, and functional mobility.', color: 'primary', icon: 'bi-graph-up' },
    { title: 'Assessment Reports', count: 4, desc: 'Detailed biomechanical evaluations, ROM goniometer checks, and intake records.', color: 'success', icon: 'bi-person-arms-up' },
    { title: 'Treatment Summaries', count: 2, desc: 'Formal treatment plan roadmaps, active exercise prescriptions, and criteria.', color: 'dark', icon: 'bi-clipboard-check' },
    { title: 'Session Summaries', count: 5, desc: 'Post-visit clinical notes, exercise tolerances, and technician observations.', color: 'secondary', icon: 'bi-file-earmark-medical' }
  ];

  documents = [
    { name: 'Right Knee Post-Op Dynamic Strengthening Progress Report', ref: '#PC-REP-2025-9482', size: '2.4 MB PDF', type: 'Progress Reports', date: 'Sep 12, 2025', doctor: 'Dr. Sarah Ahmed', typeColor: 'primary' },
    { name: 'Evaluation #4 Biomechanical Re-assessment & Goniometry', ref: '#PC-ASM-2025-8812', size: '1.8 MB PDF', type: 'Assessment Reports', date: 'Sep 12, 2025', doctor: 'Dr. Sarah Ahmed', typeColor: 'success' },
    { name: 'Phase 3 Knee Protocol Treatment Plan Summary', ref: '#PC-PLN-2025-1048', size: '3.1 MB PDF', type: 'Treatment Summaries', date: 'Sep 10, 2025', doctor: 'PhysioCare Team', typeColor: 'dark' },
    { name: 'Session #4 In-Clinic Resistance & Joint Effusion Note', ref: '#PC-SES-2025-6519', size: '850 KB PDF', type: 'Session Summaries', date: 'Sep 08, 2025', doctor: 'Dr. Sarah Ahmed', typeColor: 'secondary' }
  ];

  get filteredDocs() {
    if (this.selectedCategory === 'all') return this.documents;
    return this.documents.filter(d => d.type === this.selectedCategory);
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  exportAll() {
    this.triggerToast('Exporting all clinical records archive (HIPAA_Records_2025.zip)...');
  }

  openRequest() {
    this.requestNote = '';
    this.showRequestModal = true;
  }

  closeRequest() {
    this.showRequestModal = false;
  }

  submitRequest() {
    this.showRequestModal = false;
    this.triggerToast('Report request dispatched to Dr. Sarah Ahmed. Turnaround time: 1-2 business days.');
  }

  exploreFolder(catTitle: string, event: Event) {
    event.preventDefault();
    this.selectedCategory = this.selectedCategory === catTitle ? 'all' : catTitle;
    this.triggerToast(`Filtered documents: ${this.selectedCategory}`);
  }

  viewDoc(doc: any) {
    this.selectedDoc = doc;
    this.showDocModal = true;
  }

  closeDoc() {
    this.showDocModal = false;
  }

  downloadDoc(doc: any) {
    this.triggerToast(`Downloading ${doc.name} (${doc.size})...`);
    this.showDocModal = false;
  }
}
