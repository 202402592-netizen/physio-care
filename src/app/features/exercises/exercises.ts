import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class Exercises {
  activeCategory = 'all';
  searchQuery = '';
  selectedExerciseModal: any = null;
  painRating = 3;
  completedReps = 10;
  showToast = false;
  toastMessage = '';

  categories = [
    { id: 'all', label: 'All Exercises' },
    { id: 'strength', label: 'Strength' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'balance', label: 'Balance' },
    { id: 'endurance', label: 'Endurance' }
  ];

  exerciseList = [
    {
      id: 1,
      title: 'Knee Stretch (Quad & Hamstring)',
      category: 'flexibility',
      details: '3 Sets • 12 Repetitions • 30s Hold',
      duration: '8 mins',
      difficulty: 'Beginner',
      difficultyColor: 'success',
      completed: true,
      icon: 'bi-person-yoga',
      color: 'success',
      target: 'Hamstring & Patella',
      instructions: 'Keep back flat, extend knee gradually until tension is felt in distal hamstring. Hold for 30s without bouncing.'
    },
    {
      id: 2,
      title: 'Straight Leg Raise (Supine)',
      category: 'strength',
      details: '3 Sets • 10 Repetitions • Ankle Weight',
      duration: '10 mins',
      difficulty: 'Intermediate',
      difficultyColor: 'primary',
      completed: true,
      icon: 'bi-person-walking',
      color: 'primary',
      target: 'Quadriceps / Hip Flexor',
      instructions: 'Contract quad muscle fully before lifting. Raise heel 8-12 inches off table, pause for 2 seconds, then lower slowly.'
    },
    {
      id: 3,
      title: 'Supported Wall Squat (45°)',
      category: 'strength',
      details: '2 Sets • 15 Repetitions • 45° Angle',
      duration: '12 mins',
      difficulty: 'Intermediate',
      difficultyColor: 'primary',
      completed: false,
      icon: 'bi-person-arms-up',
      color: 'secondary',
      target: 'Gluteus & Vastus Medialis',
      instructions: 'Rest upper and lower back firmly against wall. Lower slowly to 45° knee bend. Ensure knees do not track inward.'
    },
    {
      id: 4,
      title: 'Single-Leg Foam Pad Balance',
      category: 'balance',
      details: '4 Sets • 30s Hold • Eyes Open',
      duration: '6 mins',
      difficulty: 'Beginner',
      difficultyColor: 'success',
      completed: false,
      icon: 'bi-compass',
      color: 'warning',
      target: 'Ankle & Core Proprioceptors',
      instructions: 'Stand upright on balance foam. Focus gaze at fixed eye-level marker. Maintain pelvic stability.'
    },
    {
      id: 5,
      title: 'Prone Back & Hamstring Arc',
      category: 'flexibility',
      details: '2 Sets • 10 Repetitions • Gentle Arc',
      duration: '6 mins',
      difficulty: 'Beginner',
      difficultyColor: 'success',
      completed: false,
      icon: 'bi-person-wheelchair',
      color: 'info',
      target: 'Erector Spinae & Hamstring',
      instructions: 'Lie prone with arms relaxed. Slowly arch upper thoracic spine while contracting glutes.'
    },
    {
      id: 6,
      title: 'Low-Resistance Stationary Ergometer',
      category: 'endurance',
      details: '1 Set • 15 Mins • 55 RPM',
      duration: '15 mins',
      difficulty: 'Beginner',
      difficultyColor: 'success',
      completed: false,
      icon: 'bi-bicycle',
      color: 'primary',
      target: 'Cardiovascular & Joint Synovial Flow',
      instructions: 'Pedal at steady 50-60 RPM with zero joint torque to promote knee fluid circulation.'
    }
  ];

  get completedCount(): number {
    return this.exerciseList.filter(e => e.completed).length;
  }

  get filteredExercises() {
    return this.exerciseList.filter(ex => {
      const matchesCat = this.activeCategory === 'all' || ex.category === this.activeCategory;
      const matchesSearch = !this.searchQuery.trim() || 
        ex.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        ex.target.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }

  setCategory(catId: string) {
    this.activeCategory = catId;
  }

  openExerciseModal(exercise: any) {
    this.selectedExerciseModal = exercise;
    this.painRating = 3;
    this.completedReps = 10;
  }

  closeExerciseModal() {
    this.selectedExerciseModal = null;
  }

  toggleComplete(exercise: any, event: Event) {
    event.stopPropagation();
    exercise.completed = !exercise.completed;
    this.triggerToast(`${exercise.title} marked as ${exercise.completed ? 'Completed' : 'Pending'}.`);
  }

  saveSessionLog() {
    if (this.selectedExerciseModal) {
      this.selectedExerciseModal.completed = true;
      this.triggerToast(`Exercise completed! Reps: ${this.completedReps}, Pain: ${this.painRating}/10 VAS logged.`);
      this.closeExerciseModal();
    }
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}
