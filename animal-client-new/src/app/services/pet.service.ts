import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Pet } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllPets(): Observable<Pet[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Pet[]>(`${environment.apiUrl}/api/pets`, { headers })
      .pipe(catchError(this.handleError));
  }

  getPetsByOwner(ownerId: number): Observable<Pet[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Pet[]>(`${environment.apiUrl}/api/pets/owner/${ownerId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getPetById(id: number): Observable<Pet> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Pet>(`${environment.apiUrl}/api/pets/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createPet(pet: Partial<Pet>): Observable<Pet> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Pet>(`${environment.apiUrl}/api/pets`, pet, { headers })
      .pipe(catchError(this.handleError));
  }

  updatePet(id: number, pet: Partial<Pet>): Observable<Pet> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<Pet>(`${environment.apiUrl}/api/pets/${id}`, pet, { headers })
      .pipe(catchError(this.handleError));
  }

  deletePet(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/api/pets/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Pet service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}