import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PetService } from '../../../services';
import { Pet } from '../../../models';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="pet-detail-container">
      <div *ngIf="isLoading" class="loading">
        <mat-spinner></mat-spinner>
        <p>Loading pet details...</p>
      </div>

      <div *ngIf="!isLoading && pet">
        <div class="header">
          <h1>{{ pet.name }}</h1>
          <div class="actions">
            <button mat-raised-button>
              <mat-icon>edit</mat-icon>
              Edit Pet
            </button>
            <button mat-raised-button color="warn">
              <mat-icon>delete</mat-icon>
              Delete Pet
            </button>
          </div>
        </div>

        <div class="content">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Pet Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-grid">
                <div class="info-row">
                  <strong>Name:</strong> {{ pet.name }}
                </div>
                <div class="info-row">
                  <strong>Species:</strong> {{ pet.species?.name || 'Unknown' }}
                </div>
                <div class="info-row">
                  <strong>Owner:</strong> 
                  <a [routerLink]="['/home/owners', pet.ownerId]">
                    {{ pet.owner?.fullName || 'Unknown' }}
                  </a>
                </div>
                <div class="info-row" *ngIf="pet.age">
                  <strong>Age:</strong> {{ pet.age }} years
                </div>
                <div class="info-row" *ngIf="pet.color">
                  <strong>Color:</strong> {{ pet.color }}
                </div>
                <div class="info-row" *ngIf="pet.weight">
                  <strong>Weight:</strong> {{ pet.weight }} lbs
                </div>
                <div class="info-row" *ngIf="pet.dateOfBirth">
                  <strong>Date of Birth:</strong> {{ pet.dateOfBirth | date }}
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div *ngIf="!isLoading && !pet" class="error">
        <mat-icon>error_outline</mat-icon>
        <p>Pet not found</p>
        <button mat-raised-button routerLink="/home/pets">
          Back to Pets
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pet-detail-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .actions {
      display: flex;
      gap: 12px;
    }

    .loading, .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      text-align: center;
    }

    .info-grid {
      display: grid;
      gap: 12px;
    }

    .info-row {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    h1 {
      margin: 0;
      color: #333;
    }

    a {
      color: #3f51b5;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class PetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private petService = inject(PetService);

  pet: Pet | null = null;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPetDetails(+id);
    }
  }

  private loadPetDetails(id: number): void {
    this.petService.getPetById(id).subscribe({
      next: (pet) => {
        this.pet = pet;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pet:', error);
        this.isLoading = false;
      }
    });
  }
}