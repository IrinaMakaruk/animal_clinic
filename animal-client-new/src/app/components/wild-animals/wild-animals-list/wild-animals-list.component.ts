import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { WildAnimalService } from '../../../services';
import { WildAnimal } from '../../../models';

@Component({
  selector: 'app-wild-animals-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="wild-animals-container">
      <div class="header">
        <h1>Wild Animals</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Wild Animal
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div *ngIf="isLoading" class="loading">
            <mat-spinner></mat-spinner>
            <p>Loading wild animals...</p>
          </div>

          <div *ngIf="!isLoading && wildAnimals.length === 0" class="no-data">
            <mat-icon>park</mat-icon>
            <p>No wild animals tracked</p>
            <button mat-raised-button color="primary">Add First Wild Animal</button>
          </div>

          <table mat-table [dataSource]="wildAnimals" *ngIf="!isLoading && wildAnimals.length > 0">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let animal">{{ animal.name }}</td>
            </ng-container>

            <ng-container matColumnDef="species">
              <th mat-header-cell *matHeaderCellDef>Species</th>
              <td mat-cell *matCellDef="let animal">{{ animal.species?.name || 'Unknown' }}</td>
            </ng-container>

            <ng-container matColumnDef="habitat">
              <th mat-header-cell *matHeaderCellDef>Habitat</th>
              <td mat-cell *matCellDef="let animal">{{ animal.habitat || 'N/A' }}</td>
            </ng-container>

            <ng-container matColumnDef="endangered">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let animal">
                <mat-chip-set>
                  <mat-chip [color]="animal.isEndangered ? 'warn' : 'primary'">
                    {{ animal.isEndangered ? 'Endangered' : 'Safe' }}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="dateFound">
              <th mat-header-cell *matHeaderCellDef>Date Found</th>
              <td mat-cell *matCellDef="let animal">
                {{ animal.dateFound ? (animal.dateFound | date) : 'N/A' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let animal">
                <button mat-icon-button [routerLink]="['/home/wild-animals', animal.id]">
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
    .wild-animals-container {
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
export class WildAnimalsListComponent implements OnInit {
  private wildAnimalService = inject(WildAnimalService);

  wildAnimals: WildAnimal[] = [];
  isLoading = true;
  displayedColumns: string[] = ['name', 'species', 'habitat', 'endangered', 'dateFound', 'actions'];

  ngOnInit(): void {
    this.loadWildAnimals();
  }

  private loadWildAnimals(): void {
    this.wildAnimalService.getAllWildAnimals().subscribe({
      next: (animals) => {
        this.wildAnimals = animals;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wild animals:', error);
        this.isLoading = false;
      }
    });
  }
}