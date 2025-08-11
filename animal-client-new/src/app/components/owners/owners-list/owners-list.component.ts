import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { OwnerService } from '../../../services';
import { Owner } from '../../../models';

@Component({
  selector: 'app-owners-list',
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
    <div class="owners-container">
      <div class="header">
        <h1>Owners</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Owner
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div *ngIf="isLoading" class="loading">
            <mat-spinner></mat-spinner>
            <p>Loading owners...</p>
          </div>

          <div *ngIf="!isLoading && owners.length === 0" class="no-data">
            <mat-icon>people_outline</mat-icon>
            <p>No owners found</p>
            <button mat-raised-button color="primary">Add First Owner</button>
          </div>

          <table mat-table [dataSource]="owners" *ngIf="!isLoading && owners.length > 0">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let owner">{{ owner.fullName }}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let owner">{{ owner.email || 'N/A' }}</td>
            </ng-container>

            <ng-container matColumnDef="phone">
              <th mat-header-cell *matHeaderCellDef>Phone</th>
              <td mat-cell *matCellDef="let owner">{{ owner.phoneNumber || 'N/A' }}</td>
            </ng-container>

            <ng-container matColumnDef="pets">
              <th mat-header-cell *matHeaderCellDef>Pets</th>
              <td mat-cell *matCellDef="let owner">
                {{ owner.pets?.length || 0 }} pet(s)
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let owner">
                <button mat-icon-button [routerLink]="['/home/owners', owner.id]">
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
    .owners-container {
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
export class OwnersListComponent implements OnInit {
  private ownerService = inject(OwnerService);

  owners: Owner[] = [];
  isLoading = true;
  displayedColumns: string[] = ['name', 'email', 'phone', 'pets', 'actions'];

  ngOnInit(): void {
    this.loadOwners();
  }

  private loadOwners(): void {
    this.ownerService.getAllOwners().subscribe({
      next: (owners) => {
        this.owners = owners;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading owners:', error);
        this.isLoading = false;
      }
    });
  }
}