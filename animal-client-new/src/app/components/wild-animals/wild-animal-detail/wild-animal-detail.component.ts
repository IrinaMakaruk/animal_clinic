import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { WildAnimalService } from '../../../services';
import { WildAnimal } from '../../../models';

@Component({
  selector: 'app-wild-animal-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="wild-animal-detail-container">
      <div *ngIf="isLoading" class="loading">
        <mat-spinner></mat-spinner>
        <p>Loading wild animal details...</p>
      </div>

      <div *ngIf="!isLoading && wildAnimal">
        <div class="header">
          <h1>{{ wildAnimal.name }}</h1>
          <div class="actions">
            <button mat-raised-button>
              <mat-icon>edit</mat-icon>
              Edit Animal
            </button>
            <button mat-raised-button color="warn">
              <mat-icon>delete</mat-icon>
              Delete Animal
            </button>
          </div>
        </div>

        <div class="content">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Wild Animal Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-grid">
                <div class="info-row">
                  <strong>Name:</strong> {{ wildAnimal.name }}
                </div>
                <div class="info-row">
                  <strong>Species:</strong> {{ wildAnimal.species?.name || 'Unknown' }}
                </div>
                <div class="info-row" *ngIf="wildAnimal.age">
                  <strong>Age:</strong> {{ wildAnimal.age }} years
                </div>
                <div class="info-row" *ngIf="wildAnimal.habitat">
                  <strong>Habitat:</strong> {{ wildAnimal.habitat }}
                </div>
                <div class="info-row">
                  <strong>Conservation Status:</strong>
                  <mat-chip-set>
                    <mat-chip [color]="wildAnimal.isEndangered ? 'warn' : 'primary'">
                      {{ wildAnimal.isEndangered ? 'Endangered' : 'Safe' }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
                <div class="info-row" *ngIf="wildAnimal.dateFound">
                  <strong>Date Found:</strong> {{ wildAnimal.dateFound | date:'fullDate' }}
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card *ngIf="wildAnimal.isEndangered" class="conservation-info">
            <mat-card-header>
              <mat-icon mat-card-avatar color="warn">warning</mat-icon>
              <mat-card-title>Conservation Alert</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>This animal is classified as <strong>endangered</strong>. Special care and monitoring protocols may apply.</p>
              <p>Please contact the wildlife conservation department for additional information.</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div *ngIf="!isLoading && !wildAnimal" class="error">
        <mat-icon>error_outline</mat-icon>
        <p>Wild animal not found</p>
        <button mat-raised-button routerLink="/home/wild-animals">
          Back to Wild Animals
        </button>
      </div>
    </div>
  `,
  styles: [`
    .wild-animal-detail-container {
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

    .info-grid {
      display: grid;
      gap: 12px;
    }

    .info-row {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .conservation-info {
      border-left: 4px solid #f44336;
    }

    h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class WildAnimalDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wildAnimalService = inject(WildAnimalService);

  wildAnimal: WildAnimal | null = null;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadWildAnimalDetails(+id);
    }
  }

  private loadWildAnimalDetails(id: number): void {
    this.wildAnimalService.getWildAnimalById(id).subscribe({
      next: (animal) => {
        this.wildAnimal = animal;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wild animal:', error);
        this.isLoading = false;
      }
    });
  }
}