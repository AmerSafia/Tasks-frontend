import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toaster: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        error.error.message ? this.toaster.error(error?.error.message) : this.toaster.error(error?.message)

        if (error.error.message == 'jwt expierd' || !localStorage.getItem('token')) {
          this.router.navigate(['/login'])
          localStorage.removeItem('token')
        }
        throw error
      })
    );
  }
}
