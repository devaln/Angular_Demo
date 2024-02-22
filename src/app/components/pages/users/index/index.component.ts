import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  // public data2 = [...Array(180).keys()].map(x => `item ${++x}`)
  public data: any
  public current: number = 1;
  public perPage = 5
  public itemsToDisplay: any
  public total: any


  constructor(
    private http: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.userList()
  }

  userList(){
    this.http.get("users").subscribe((response: any)=> {
      console.log(response)
      this.data = response.data
      this.total = Math.ceil(this.data.length / this.perPage)
      this.itemsToDisplay = this.paginate(this.current, this.perPage)
    })
  }

  editUser(user_id: any){
    // user_id? sessionStorage.setItem('UserFormId', user_id) : sessionStorage.removeItem('UserFormId')
    this.router.navigateByUrl(`/user-form/${user_id}`)
  }

  deleteUser(user_id: any){
    this.http.delete(`users/${user_id}`).subscribe((response) => {
      (response.status === true)? this.responseTrue('Deleted') : this.responseFalse(response)
    }, err => {
      console.error(err.error)
    })
  }

  responseTrue(msg: string){
    this.toastr.success(`${msg} successfully`)
    this.router.navigateByUrl('users')
  }

  responseFalse(response: any){
    this.toastr.error('something went wrong')
    console.error(response)
  }

  public onGoTo(page: number): void {
    this.current = page
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onNext(page: number): void {
    this.current = page + 1
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onPrevious(page: number): void {
    this.current = page - 1
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public paginate(current: number, perPage: number): string[] {
    // debugger
    return [...this.data.slice((current - 1) * perPage).slice(0, perPage)]
  }
}
