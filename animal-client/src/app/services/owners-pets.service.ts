import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

import { handleError } from '@helpers/error-handler';

import { Owner, Pet } from '@models';

import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class OwnersPetsService {
  
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

  addOwnerPet( id:number, pet: Pet ) {
    return this.http.post(`${environment.apiUrl}/owners/${id}/pets`, pet).pipe(catchError(handleError));
  }

}