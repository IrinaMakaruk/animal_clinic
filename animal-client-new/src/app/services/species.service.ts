import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Species } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllSpecies(): Observable<Species[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Species[]>(`${environment.apiUrl}/api/species`, { headers })
      .pipe(catchError(this.handleError));
  }

  getSpeciesById(id: number): Observable<Species> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Species>(`${environment.apiUrl}/api/species/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createSpecies(species: Partial<Species>): Observable<Species> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Species>(`${environment.apiUrl}/api/species`, species, { headers })
      .pipe(catchError(this.handleError));
  }

  updateSpecies(id: number, species: Partial<Species>): Observable<Species> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<Species>(`${environment.apiUrl}/api/species/${id}`, species, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteSpecies(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/api/species/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Species service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}