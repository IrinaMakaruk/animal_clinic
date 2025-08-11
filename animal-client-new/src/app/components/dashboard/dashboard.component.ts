import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { OwnerService, PetService, WildAnimalService, SpeciesService } from '../../services';
import { Owner, Pet, WildAnimal, Species } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>people</mat-icon>
            <mat-card-title>Owners</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ ownerCount }}</div>
            <div class="stat-label">Total Owners</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button routerLink="/home/owners">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>pets</mat-icon>
            <mat-card-title>Pets</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ petCount }}</div>
            <div class="stat-label">Total Pets</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button routerLink="/home/pets">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>park</mat-icon>
            <mat-card-title>Wild Animals</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ wildAnimalCount }}</div>
            <div class="stat-label">Wild Animals Tracked</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button routerLink="/home/wild-animals">View All</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>category</mat-icon>
            <mat-card-title>Species</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{ speciesCount }}</div>
            <div class="stat-label">Species Registered</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>Manage Species</button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div class="recent-activity">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Welcome to the Animals Management System!</p>
            <p>Use the navigation menu to manage owners, pets, and wild animals.</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #3f51b5;
    }

    .stat-label {
      color: #666;
      margin-top: 8px;
    }

    .recent-activity {
      margin-top: 20px;
    }

    h1 {
      margin-bottom: 30px;
      color: #333;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private petService = inject(PetService);
  private wildAnimalService = inject(WildAnimalService);
  private speciesService = inject(SpeciesService);

  ownerCount = 0;
  petCount = 0;
  wildAnimalCount = 0;
  speciesCount = 0;

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.ownerService.getAllOwners().subscribe({
      next: (owners) => this.ownerCount = owners.length,
      error: (error) => console.error('Error loading owners:', error)
    });

    this.petService.getAllPets().subscribe({
      next: (pets) => this.petCount = pets.length,
      error: (error) => console.error('Error loading pets:', error)
    });

    this.wildAnimalService.getAllWildAnimals().subscribe({
      next: (animals) => this.wildAnimalCount = animals.length,
      error: (error) => console.error('Error loading wild animals:', error)
    });

    this.speciesService.getAllSpecies().subscribe({
      next: (species) => this.speciesCount = species.length,
      error: (error) => console.error('Error loading species:', error)
    });
  }
}