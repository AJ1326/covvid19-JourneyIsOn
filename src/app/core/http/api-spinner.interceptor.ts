import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpBackend } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { SpinnerService } from '@app/shared/spinner/spinner.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class I1 implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      (err: any) => {
        let data = {};
        data = {
          reason: err && err.error.reason ? err.error.reason : '',
          status: err.status
        };
        this.spinnerService.hide();
        return throwError(err);
      }
    );
  }
}
