import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';
import { User } from '@models'
import { handleError } from '@helpers/error-handler';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

	constructor(
		private http: HttpClient,
		private router: Router ) {} 

	public get isLoggedIn(): boolean {
		return localStorage.hasOwnProperty('access_token');
	}
	
	signUp( user:User ) {
		return this.handleAuthRequest( 'users' , user );
	}

	login(username: string, password: string)  {
		return this.handleAuthRequest( 'login' , {username, password} );
	}

	logout() {
		localStorage.removeItem('access_token');
		this.router.navigate(['/']);
	}

	private handleAuthRequest( route: string, user: User ) {
		return this.http.post<any>(`${environment.apiUrl}/${route}`, user)
			.pipe(
				map(user => this.saveUserData( user )),
				catchError(handleError));
	}

	private saveUserData( user: User) {
		localStorage.setItem('access_token', user.token);
		this.router.navigate(['home']);
	}
}
