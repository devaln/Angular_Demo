import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.showLoader();
    return next.handle(request).pipe(finalize(() => this.loader.hideLoader()));
  }
}