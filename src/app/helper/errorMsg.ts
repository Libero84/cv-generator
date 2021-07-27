import { HttpErrorResponse } from '@angular/common/http';

export function errorMsg(error: HttpErrorResponse): void {
  console.info('error response: ' + error.status + ' - ' + error.message);
}
