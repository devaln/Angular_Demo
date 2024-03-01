import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


const API_URL = "http://localhost:8000/api/";
// const API_URL = "http://10.210.9.61:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private https:HttpClient,
    private toastr: ToastrService
  ) { }

  httpHeaderWithToken = new HttpHeaders({
    'Accept': 'application/json',
    'content-type': 'application/json',
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
