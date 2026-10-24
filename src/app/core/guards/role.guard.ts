import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const allowedRoles = route.data['roles'] as string[] | undefined;
      if (allowedRoles && allowedRoles.length > 0) {
        // Handle doctor and clinician role equivalence
        const userRole = currentUser.role;
        const isAuthorized = allowedRoles.some(role => {
          if (role === 'doctor' || role === 'clinician') {
            return userRole === 'doctor' || userRole === 'clinician';
          }
          return role === userRole;
        });

        if (!isAuthorized) {
          this.authService.navigateToRole();
          return false;
        }
      }
      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
