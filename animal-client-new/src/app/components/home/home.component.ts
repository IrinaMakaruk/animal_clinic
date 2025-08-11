import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <h3>Animals Management</h3>
        </div>
        
        <mat-nav-list>
          <a mat-list-item routerLink="/home/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          
          <a mat-list-item routerLink="/home/owners" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Owners</span>
          </a>
          
          <a mat-list-item routerLink="/home/pets" routerLinkActive="active">
            <mat-icon matListItemIcon>pets</mat-icon>
            <span matListItemTitle>Pets</span>
          </a>
          
          <a mat-list-item routerLink="/home/wild-animals" routerLinkActive="active">
            <mat-icon matListItemIcon>park</mat-icon>
            <span matListItemTitle>Wild Animals</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar color="primary">
          <span class="spacer"></span>
          <span *ngIf="currentUser$ | async as user" class="user-info">
            Welcome, {{ user.username }}
          </span>
          <button mat-icon-button (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>
        
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }

    .sidenav-header {
      padding: 20px;
      background-color: #3f51b5;
      color: white;
      text-align: center;
    }

    .sidenav-header h3 {
      margin: 0;
    }

    .main-content {
      display: flex;
      flex-direction: column;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-info {
      margin-right: 16px;
    }

    .content {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }

    .active {
      background-color: rgba(63, 81, 181, 0.1) !important;
      color: #3f51b5 !important;
    }

    mat-list-item {
      margin-bottom: 8px;
    }
  `]
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser$ = this.authService.currentUser$;

  logout(): void {
    this.authService.logout();
  }
}