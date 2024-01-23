import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';


const API_URL = "http://localhost:8000/api/";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private https:HttpClient,
    // private toastr: ToastrService
  ) { }

  httpHeaderWithToken = new HttpHeaders({
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': `${sessionStorage.getItem('token')}`,
  })

  get(url: any, obj: any = null){
    return this.https.get(`${API_URL}${url}`, {headers: this.httpHeaderWithToken})
  }

  post(url: any, obj: any){
    return this.https.post(`${API_URL}${url}`, obj, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        console.error(err)
        return of(err);
      })
    )
  }

  put(url: any, obj: any){
    return this.https.put(`${API_URL}${url}`, obj, {headers: this.httpHeaderWithToken})
    .pipe(
      catchError((err, caught) => {
        console.error(err)
        return of(err);
      })
    )
  }

  // userData(){
  //   return this.https.get(API_URL);
  // }

  // login(data:any) {
  //   return this.https.post(API_URL + 'login', data)
  //   .pipe(
  //     catchError((err, caught) => {
  //       // if(err.status != 409){
  //        // this._toastr.error(err.message)
  //         // console.log('box-upload-error',err.message)
  //       // }
  //       // this.toastr.error(err.message)
  //       console.error(err)
  //       return of(err);
  //     })
  //   )
  // }

  // register(data: any){
  //   return this.https.post(API_URL + 'register', data)
  //   .pipe(
  //     catchError((err, caught) => {
  //       console.error(err)
  //       return of(err);
  //     })
  //   )
  // }

  logout(){
    return this.https.get(API_URL + 'auth/logout');
  }
}
