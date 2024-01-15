import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


const API_URL = "http://localhost:8000/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private https:HttpClient) { }

  userData(){
    return this.https.get(API_URL);
  }

  login(data:any) {
    return this.https.post(API_URL + 'login', data);
  }

  register(data:any){
    return this.https.post(API_URL + 'register', data)
  }

  logout(data:any){
    return this.https.post(API_URL + 'logout', data);
  }
}
