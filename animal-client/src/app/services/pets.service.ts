import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { handleError } from '../helpers/error-handler';

import { catchError } from 'rxjs/operators';
import { Pet } from '../models';

@Injectable({ providedIn: 'root' })

export class PetsService {
	constructor(private http: HttpClient) { }

	getAllPets(ownerId: number) {
		return this.http.get<Array<Pet>>(`${environment.apiUrl}/owners/${ownerId}/pets?filter={"include":[{"relation": "species"}]}`).pipe(catchError(handleError));
  }
  
  getPetById(petId: number, ownerId: number) {
		return this.http.get<Pet>(`${environment.apiUrl}/owners/${ownerId}/pets?filter={"where":{"id":${petId}},"include":[{"relation": "species"}]}`).pipe(catchError(handleError));
  }
  
	getPetCount() {
		return this.http.get<number>(`${environment.apiUrl}/owner/pets/count`).pipe(catchError(handleError));
	}

	editPet( pet: Pet, ownerId: number ) {
		return this.http.put(`${environment.apiUrl}/owners/${ownerId}?filter={"where":{"id":${pet.id}}}`, pet).pipe(catchError(handleError));
	}

	deletePet( id: number) {
		return this.http.delete<number>(`${environment.apiUrl}/pets/${id}`).pipe(catchError(handleError));
	}

	addPet( pet: Pet ) {
		return this.http.post(`${environment.apiUrl}/employees/add`, pet).pipe(catchError(handleError));
	}
}
