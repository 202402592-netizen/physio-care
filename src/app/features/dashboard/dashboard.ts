import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sub: Subscription | null = null;

  currentUser: User | null = null;
  selectedExerciseModal: any = null;

  stats = [
    {
      title: 'Pain Level',
      value: '4',
      suffix: '/ 10 VAS',
      subtitle: 'Reduced from 8 / 10 baseline score recorded at initial intake',
      icon: 'bi-heart-pulse',
      iconColor: 'danger',
      badgeText: 'Improved',
      badgeIcon: 'bi-arrow-down',
      bars: [
        { color: 'success', active: true },
        { color: 'success', active: true },
        { color: 'warning', active: true },
        { color: 'danger', active: false },
        { color: 'danger', active: false }
      ]
    },
    {
      title: 'Compliance',
      value: '85%',
      suffix: 'completion rate',
      subtitle: 'Targeting > 80% to accelerate mobility recovery without fatigue',
      icon: 'bi-check-circle',
      iconColor: 'success',
      badgeText: '+15% This Wk',
      badgeIcon: 'bi-graph-up',
      bars: [
        { color: 'success', active: true },
        { color: 'success', active: true },
        { color: 'success', active: true },
        { color: 'success', active: true },
        { color: 'light', active: true }
      ]
    },
    {
      title: 'Overall Progress',
      value: '72%',
      suffix: 'recovery phase',
      subtitle: 'On track for full independent recovery clearance by Nov 20',
      icon: 'bi-sliders',
      iconColor: 'primary',
      badgeText: '+17% MoM',
      badgeIcon: 'bi-graph-up-arrow',
      bars: [
        { color: 'primary', active: true },
        { color: 'primary', active: true },
        { color: 'primary', active: true },
        { color: 'light', active: true },
        { color: 'light', active: true }
      ]
    }
  ];

  exercises = [
    {
      title: 'Knee Stretch (Quad & Hamstring)',
      details: '3 Sets • 12 Repetitions • 30s Hold',
      status: 'Completed',
      statusIcon: 'bi-check-circle-fill',
      time: '8 mins',
      icon: 'bi-person-yoga',
      color: 'success',
      actionText: 'Review Form',
      actionIcon: 'bi-eye'
    },
    {
      title: 'Straight Leg Raise',
      details: '3 Sets • 10 Repetitions • Ankle Weight',
      status: 'In Progress',
      statusIcon: 'bi-play-circle-fill',
      time: '10 mins',
      icon: 'bi-person-walking',
      color: 'primary',
      actionText: 'Continue Exercise',
      actionIcon: 'bi-play-fill'
    },
    {
      title: 'Supported Wall Squat',
      details: '2 Sets • 15 Repetitions • 45° Angle',
      status: 'Pending',
      statusIcon: 'bi-clock',
      time: '12 mins',
      icon: 'bi-person-arms-up',
      color: 'secondary',
      actionText: 'Start Exercise',
      actionIcon: 'bi-play'
    },
    {
      title: 'Prone Back & Hamstring Arc',
      details: '2 Sets • 10 Repetitions • Gentle Arc',
      status: 'Pending',
      statusIcon: 'bi-clock',
      time: '6 mins',
      icon: 'bi-person-wheelchair',
      color: 'secondary',
      actionText: 'Start Exercise',
      actionIcon: 'bi-play'
    }
  ];

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get userFirstName(): string {
    if (!this.currentUser?.name) return 'Ahmed';
    return this.currentUser.name.split(' ')[0];
  }

  viewTreatmentPlan() {
    this.router.navigate(['/patient/treatment-plan']);
  }

  handleExerciseAction(exercise: any) {
    this.selectedExerciseModal = exercise;
  }

  closeExerciseModal() {
    this.selectedExerciseModal = null;
  }

  markModalExerciseComplete() {
    if (this.selectedExerciseModal) {
      this.selectedExerciseModal.status = 'Completed';
      this.selectedExerciseModal.color = 'success';
      this.selectedExerciseModal.statusIcon = 'bi-check-circle-fill';
      this.selectedExerciseModal.actionText = 'Review Form';
      this.selectedExerciseModal.actionIcon = 'bi-eye';
      this.selectedExerciseModal = null;
    }
  }

  goToExercisesPage() {
    this.router.navigate(['/patient/exercises']);
  }
}
