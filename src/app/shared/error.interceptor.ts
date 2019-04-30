// Windows Alerts into on screen error warnings or quietly failing?
import { Injectable } from '@angular/core';
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
import { Store } from '@ngrx/store';

import { AuthService } from '../core/auth-modal/auth.service';
import * as AuthActions from '../core/auth-modal/store/auth.actions';
import * as fromAuth from '../core/auth-modal/store/auth.reducers';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromAuth.FeatureState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('error intercepting');
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
                                this.store.dispatch(new AuthActions.Logout());
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