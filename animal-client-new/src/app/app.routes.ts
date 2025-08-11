import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services';

// Auth guard function
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'owners',
        loadComponent: () => import('./components/owners/owners-list/owners-list.component').then(c => c.OwnersListComponent)
      },
      {
        path: 'owners/:id',
        loadComponent: () => import('./components/owners/owner-detail/owner-detail.component').then(c => c.OwnerDetailComponent)
      },
      {
        path: 'pets',
        loadComponent: () => import('./components/pets/pets-list/pets-list.component').then(c => c.PetsListComponent)
      },
      {
        path: 'pets/:id',
        loadComponent: () => import('./components/pets/pet-detail/pet-detail.component').then(c => c.PetDetailComponent)
      },
      {
        path: 'wild-animals',
        loadComponent: () => import('./components/wild-animals/wild-animals-list/wild-animals-list.component').then(c => c.WildAnimalsListComponent)
      },
      {
        path: 'wild-animals/:id',
        loadComponent: () => import('./components/wild-animals/wild-animal-detail/wild-animal-detail.component').then(c => c.WildAnimalDetailComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];