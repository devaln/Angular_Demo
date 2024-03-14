import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { API_URL, AUTH_TOKEN } from 'src/app/config-app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private https:HttpClient,
    private toastr: ToastrService
  ) { }

  httpHeaderWithToken = new HttpHeaders({
    // 'Accept': 'application/json',
    // 'Content-Type': 'multipart/form-data; boundary {}',
    // 'enctype': 'multipart/form-data',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  })

  get(url: any, obj: any = null){
    return this.https.get(`${API_URL}${url}`, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        this.toastr.error(err.error.message)
        console.error(err.error.message)
        return of(err);
      })
    )
  }

  post(url: any, obj: any){
    return this.https.post(`${API_URL}${url}`, obj, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        this.toastr.error(err.error.message)
        console.error(err)
        return of(err);
      })
    )
  }

  put(url: any, obj: any){
    return this.https.put(`${API_URL}${url}`, obj, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        this.toastr.error(err.error.message)
        console.error(err)
        return of(err);
      })
    )
  }

  patch(url: any, obj: any){
    return this.https.patch(`${API_URL}${url}`, obj, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        this.toastr.error(err.error.message)
        console.error(err)
        return of(err);
      })
    )
  }

  delete(url: any){
    return this.https.delete(`${API_URL}${url}`, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        this.toastr.error(err.error.message)
        console.error(err)
        return of(err);
      })
    )
  }
}
