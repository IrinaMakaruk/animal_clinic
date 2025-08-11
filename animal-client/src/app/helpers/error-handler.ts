import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleError = (error: HttpErrorResponse) => {
  
  error.error instanceof ErrorEvent 
  ? console.error('An error occurred:', error.error.message)
  : console.error(
      `Backend returned code ${error.status}, ` +
      `with error : ${error.error.msg}`);

  return throwError(error.error.msg);
}
