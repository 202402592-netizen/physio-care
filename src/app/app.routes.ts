import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { TreatmentPlan } from './features/treatment-plan/treatment-plan';
import { Exercises } from './features/exercises/exercises';
import { Appointments } from './features/appointments/appointments';
import { Progress } from './features/progress/progress';
import { Reports } from './features/reports/reports';
import { Settings } from './features/settings/settings';
import { ClinicianPatients } from './features/clinician-patients/clinician-patients';
import { ClinicianExercises } from './features/clinician-exercises/clinician-exercises';
import { ClinicianAppointments } from './features/clinician-appointments/clinician-appointments';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';
import { AdminPhysiotherapists } from './features/admin-physiotherapists/admin-physiotherapists';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { 
    path: 'admin', 
    component: Layout,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'physiotherapists', component: AdminPhysiotherapists },
      { path: 'settings', component: Settings }
    ]
  },
  { 
    path: 'doctor', 
    component: Layout,
    canActivate: [RoleGuard],
    data: { roles: ['doctor', 'clinician'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ClinicianPatients },
      { path: 'exercises', component: ClinicianExercises },
      { path: 'appointments', component: ClinicianAppointments },
      { path: 'settings', component: Settings }
    ]
  },
  { 
    path: 'patient', 
    component: Layout,
    canActivate: [RoleGuard],
    data: { roles: ['patient'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'treatment-plan', component: TreatmentPlan },
      { path: 'exercises', component: Exercises },
      { path: 'appointments', component: Appointments },
      { path: 'progress', component: Progress },
      { path: 'reports', component: Reports },
      { path: 'settings', component: Settings }
    ]
  },
  { path: 'settings', redirectTo: 'patient/settings', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
