import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, LoginCredentials, RegisterData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for existing token on service initialization
    const token = localStorage.getItem('access_token');
    if (token) {
      // In a real app, you'd validate the token here
      this.loadUserFromToken();
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(userData: RegisterData): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => this.saveUserData(response)),
        catchError(this.handleError)
      );
  }

  login(credentials: LoginCredentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.saveTokenAndNavigate(response.token)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  private saveUserData(response: { user: User; token: string }): void {
    localStorage.setItem('access_token', response.token);
    this.currentUserSubject.next(response.user);
    this.router.navigate(['/home']);
  }

  private saveTokenAndNavigate(token: string): void {
    localStorage.setItem('access_token', token);
    this.loadUserFromToken();
    this.router.navigate(['/home']);
  }

  private loadUserFromToken(): void {
    // In a real app, you'd decode the JWT token or make an API call to get user info
    // For now, we'll make a call to the profile endpoint
    const headers = this.getAuthHeaders();
    this.http.post<User>(`${environment.apiUrl}/auth/profile`, {}, { headers })
      .pipe(
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Invalid token'));
        })
      )
      .subscribe(user => this.currentUserSubject.next(user));
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}