import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Owner } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllOwners(): Observable<Owner[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Owner[]>(`${environment.apiUrl}/api/owners`, { headers })
      .pipe(catchError(this.handleError));
  }

  getOwnerById(id: number): Observable<Owner> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Owner>(`${environment.apiUrl}/api/owners/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createOwner(owner: Partial<Owner>): Observable<Owner> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Owner>(`${environment.apiUrl}/api/owners`, owner, { headers })
      .pipe(catchError(this.handleError));
  }

  updateOwner(id: number, owner: Partial<Owner>): Observable<Owner> {
    const headers = this.authService.getAuthHeaders();
    return this.http.patch<Owner>(`${environment.apiUrl}/api/owners/${id}`, owner, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteOwner(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${environment.apiUrl}/api/owners/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Owner service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}