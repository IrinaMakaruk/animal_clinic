import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PetService } from '../../../services';
import { Pet } from '../../../models';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="pets-container">
      <div class="header">
        <h1>Pets</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Pet
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div *ngIf="isLoading" class="loading">
            <mat-spinner></mat-spinner>
            <p>Loading pets...</p>
          </div>

          <div *ngIf="!isLoading && pets.length === 0" class="no-data">
            <mat-icon>pets</mat-icon>
            <p>No pets found</p>
            <button mat-raised-button color="primary">Add First Pet</button>
          </div>

          <table mat-table [dataSource]="pets" *ngIf="!isLoading && pets.length > 0">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let pet">{{ pet.name }}</td>
            </ng-container>

            <ng-container matColumnDef="species">
              <th mat-header-cell *matHeaderCellDef>Species</th>
              <td mat-cell *matCellDef="let pet">{{ pet.species?.name || 'Unknown' }}</td>
            </ng-container>

            <ng-container matColumnDef="owner">
              <th mat-header-cell *matHeaderCellDef>Owner</th>
              <td mat-cell *matCellDef="let pet">{{ pet.owner?.fullName || 'Unknown' }}</td>
            </ng-container>

            <ng-container matColumnDef="age">
              <th mat-header-cell *matHeaderCellDef>Age</th>
              <td mat-cell *matCellDef="let pet">{{ pet.age || 'N/A' }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let pet">
                <button mat-icon-button [routerLink]="['/home/pets', pet.id]">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .pets-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .loading, .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      text-align: center;
    }

    .loading mat-spinner {
      margin-bottom: 20px;
    }

    .no-data mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
    }

    h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class PetsListComponent implements OnInit {
  private petService = inject(PetService);

  pets: Pet[] = [];
  isLoading = true;
  displayedColumns: string[] = ['name', 'species', 'owner', 'age', 'actions'];

  ngOnInit(): void {
    this.loadPets();
  }

  private loadPets(): void {
    this.petService.getAllPets().subscribe({
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