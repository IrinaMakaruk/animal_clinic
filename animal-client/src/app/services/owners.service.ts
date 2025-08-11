import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { handleError } from '../helpers/error-handler';

import { catchError } from 'rxjs/operators';
import { Owner, Pet } from '../models';

@Injectable({ providedIn: 'root' })

export class OwnersService {
	constructor(private http: HttpClient) { }

	getAllOwnersWithPets() {
		return this.http.get<Array<Owner>>(`${environment.apiUrl}/owners?filter={"include":[{"relation": "pets"},{"relation": "address"}]}`).pipe(catchError(handleError));
	}
	
	getOwnersWithPetsCount() {
		return this.http.get<number>(`${environment.apiUrl}/owners/count`).pipe(catchError(handleError));
	}

	getOwnerInfoWithPets( id: number ) {
		return this.http.get<Owner>(`${environment.apiUrl}/owners/${id}?filter={"include":[{"relation": "pets"},{"relation": "address"}]}`).pipe(catchError(handleError));
	}

	getOwnerPets( id: number ) {
		return this.http.get<Array<Pet>>(`${environment.apiUrl}/owners/${id}/pets?filter={"include":[{"relation": "species"}]}`).pipe(catchError(handleError));
	}

	editOwner( owner: Owner ) {
		return this.http.put(`${environment.apiUrl}/owners/${owner.id}`, owner).pipe(catchError(handleError));
	}

	deleteOwner( id: number) {
		return this.http.delete<number>(`${environment.apiUrl}/owners/${id}`).pipe(catchError(handleError));
	}

	addOwner( owner: Owner ) {
		return this.http.post(`${environment.apiUrl}/owners/add`, owner).pipe(catchError(handleError));
	}
}
