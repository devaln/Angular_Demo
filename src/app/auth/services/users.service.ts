import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { of} from 'rxjs';
// import { ToastrService } from 'ngx-toastr';


const API_URL = "http://localhost:8000/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private https:HttpClient,
    // private toastr: ToastrService
  ) { }

  userData(){
    return this.https.get(API_URL);
  }

  login(data:any) {
    return this.https.post(API_URL + 'login', data)
    .pipe(
      catchError((err, caught) => {
        // if(err.status != 409){
         // this._toastr.error(err.message)
          // console.log('box-upload-error',err.message)
        // }
        // this.toastr.error(err.message)
        console.error(err)
        return of(err);
      })
    )
  }

  register(data: any){
    return this.https.post(API_URL + 'register', data)
    .pipe(
      catchError((err, caught) => {
        console.error(err)
        return of(err);
      })
    )
  }

  logout(){
    return this.https.get(API_URL + 'logout');
  }
}
