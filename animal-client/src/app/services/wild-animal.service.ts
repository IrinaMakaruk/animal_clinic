import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { handleError } from '../helpers/error-handler';

import { catchError } from 'rxjs/operators';
import { WildAnimal } from '../models';

@Injectable({ providedIn: 'root' })

export class WildAnimalService {
	constructor(private http: HttpClient) { }

	getAllWildAnimals() {
		return this.http.get<Array<WildAnimal>>(`${environment.apiUrl}/wild-animals?filter={"include":[{"relation": "species"}]}`).pipe(catchError(handleError));
	}
	
	getWildAnimalsCount() {
		return this.http.get<number>(`${environment.apiUrl}/wild-animals/count`).pipe(catchError(handleError));
	}

	deleteWildAnimal( id: number) {
		return this.http.delete<number>(`${environment.apiUrl}/wild-animals/${id}`).pipe(catchError(handleError));
	}
}
