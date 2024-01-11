import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private https:HttpClient) { }
  
  userData(){
    return this.https.get("http://localhost:8000/api/auth");
  }

  login(data:any) {
    return this.https.post('http://localhost:8000/api/auth/login', data);
  }
}
