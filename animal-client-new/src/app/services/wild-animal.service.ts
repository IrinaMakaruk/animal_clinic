import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { WildAnimal } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WildAnimalService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllWildAnimals(): Observable<WildAnimal[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<WildAnimal[]>(`${environment.apiUrl}/api/wild-animals`, { headers })
      .pipe(catchError(this.handleError));
  }

  getWildAnimalById(id: number): Observable<WildAnimal> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<WildAnimal>(`${environment.apiUrl}/api/wild-animals/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createWildAnimal(wildAnimal: Partial<WildAnimal>): Observable<WildAnimal> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<WildAnimal>(`${environment.apiUrl}/api/wild-animals`, wildAnimal, { headers })
      .pipe(catchError(this.handleError));
  }

  updateWildAnimal(id: number, wildAnimal: Partial<WildAnimal>): Observable<WildAnimal> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<WildAnimal>(`${environment.apiUrl}/api/wild-animals/${id}`, wildAnimal, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteWildAnimal(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/api/wild-animals/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Wild animal service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}