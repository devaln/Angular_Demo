import { Component } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wing-index',
  standalone: false,
  // imports: [],
  templateUrl: './wing-index.component.html',
  styleUrl: './wing-index.component.css'
})
export class WingIndexComponent {
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
    this.wingList()
  }

  wingList(){
    this.http.get("wings").subscribe((response: any)=> {
      console.log(response)
      this.data = response.data
      this.total = Math.ceil(this.data.length / this.perPage)
      this.itemsToDisplay = this.paginate(this.current, this.perPage)
    })
  }

  editUser(wing_id: any){
    this.router.navigateByUrl(`/wing-form/${wing_id}`)
  }

  deleteUser(wing_id: any){
    this.http.delete(`wings/${wing_id}`).subscribe((response) => {
      (response.status === true)? this.responseTrue('Deleted') : this.responseFalse(response)
      location.reload()
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
    return [...this.data.slice((current - 1) * perPage).slice(0, perPage)]
  }
}
