import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OwnerService, PetService } from '../../../services';
import { Owner, Pet } from '../../../models';

@Component({
  selector: 'app-owner-detail',
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
    <div class="owner-detail-container">
      <div *ngIf="isLoading" class="loading">
        <mat-spinner></mat-spinner>
        <p>Loading owner details...</p>
      </div>

      <div *ngIf="!isLoading && owner">
        <div class="header">
          <h1>{{ owner.fullName }}</h1>
          <div class="actions">
            <button mat-raised-button>
              <mat-icon>edit</mat-icon>
              Edit Owner
            </button>
            <button mat-raised-button color="warn">
              <mat-icon>delete</mat-icon>
              Delete Owner
            </button>
          </div>
        </div>

        <div class="content">
          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>Contact Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-row">
                <strong>Email:</strong> {{ owner.email || 'Not provided' }}
              </div>
              <div class="info-row">
                <strong>Phone:</strong> {{ owner.phoneNumber || 'Not provided' }}
              </div>
              <div class="info-row" *ngIf="owner.address">
                <strong>Address:</strong>
                {{ owner.address.street }}, {{ owner.address.city }}, 
                {{ owner.address.state }} {{ owner.address.zipCode }}
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="pets-card">
            <mat-card-header>
              <mat-card-title>Pets ({{ pets.length }})</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div *ngIf="pets.length === 0" class="no-pets">
                <mat-icon>pets</mat-icon>
                <p>This owner has no pets registered.</p>
                <button mat-raised-button color="primary">
                  <mat-icon>add</mat-icon>
                  Add Pet
                </button>
              </div>

              <div *ngIf="pets.length > 0" class="pets-list">
                <div *ngFor="let pet of pets" class="pet-item">
                  <div class="pet-info">
                    <h3>{{ pet.name }}</h3>
                    <p>{{ pet.species?.name || 'Unknown species' }}</p>
                    <p *ngIf="pet.age">Age: {{ pet.age }} years</p>
                  </div>
                  <div class="pet-actions">
                    <button mat-icon-button [routerLink]="['/home/pets', pet.id]">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button>
                      <mat-icon>edit</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div *ngIf="!isLoading && !owner" class="error">
        <mat-icon>error_outline</mat-icon>
        <p>Owner not found</p>
        <button mat-raised-button routerLink="/home/owners">
          Back to Owners
        </button>
      </div>
    </div>
  `,
  styles: [`
    .owner-detail-container {
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

    .content {
      display: grid;
      gap: 20px;
    }

    .loading, .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      text-align: center;
    }

    .info-row {
      margin-bottom: 12px;
    }

    .no-pets {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      text-align: center;
    }

    .no-pets mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .pets-list {
      display: grid;
      gap: 12px;
    }

    .pet-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .pet-info h3 {
      margin: 0 0 4px 0;
    }

    .pet-info p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }

    .pet-actions {
      display: flex;
      gap: 8px;
    }

    h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class OwnerDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ownerService = inject(OwnerService);
  private petService = inject(PetService);

  owner: Owner | null = null;
  pets: Pet[] = [];
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOwnerDetails(+id);
    }
  }

  private loadOwnerDetails(id: number): void {
    this.ownerService.getOwnerById(id).subscribe({
      next: (owner) => {
        this.owner = owner;
        this.loadOwnerPets(id);
      },
      error: (error) => {
        console.error('Error loading owner:', error);
        this.isLoading = false;
      }
    });
  }

  private loadOwnerPets(ownerId: number): void {
    this.petService.getPetsByOwner(ownerId).subscribe({
      next: (pets) => {
        this.pets = pets;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pets:', error);
        this.isLoading = false;
      }
    });
  }
}