// Windows Alerts into on screen error warnings or quietly failing?
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('error intercepting');
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    console.log(error.status);
                    if (error.error instanceof ErrorEvent) {
                        console.log('client');
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        console.log('server');
                        switch (error.status) {
                            case 401:
                                errorMessage = `Error Code: ${error.status} You must Register or Signin before loading recipes.`
                                break;
                            case 0:
                                errorMessage = `Error Code: ${error.status} The Recipes you requested do not exist.`
                                break;
                            default:
                                errorMessage = `Error Code: ${error.status} An error has Occurred. `

                        }
                    }
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}