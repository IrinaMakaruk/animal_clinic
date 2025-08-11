import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { AuthenticationService } from '../services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	canActivate(): Observable<boolean>|Promise<boolean>|boolean {
		const user = this.authenticationService.isLoggedIn;
		
		if (user) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}
}