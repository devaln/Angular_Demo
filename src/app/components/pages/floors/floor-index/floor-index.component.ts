import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-floor-index',
  standalone: false,
  // imports: [],
  templateUrl: './floor-index.component.html',
  styleUrl: './floor-index.component.css'
})
export class FloorIndexComponent {
  public data: any
  public current: number = 1;
  public perPage = 5
  public itemsToDisplay: any
  public total: any

  constructor(
    private _https: UsersService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getFloors()
  }

  getFloors(){
    this._https.get('floors').subscribe((response) => {
      console.log(response.data)
      this.data = response.data
      this.total = Math.ceil(this.data.length / this.perPage)
      this.itemsToDisplay = this.paginate(this.current, this.perPage)
    }, err => {
      console.error(err.error.message)
    })
  }

  editFloor(floor_id: any){
    this.router.navigateByUrl(`/user-form/${floor_id}`)
  }

  handleClick(floor_id: any){
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFloor(floor_id)
      }
    });
  }

  deleteFloor(floor_id: any){
    this._https.delete(`floors/${floor_id}`).subscribe((response) => {
      this.respnseStatus(response, 'Deleted', 'floors')
      location.reload()
    }, err => {
      console.error(err.error.message)
    })
  }

  respnseStatus(response: any, msg: string, url: string){
    if(response.status == true){
      this.toastr.success(`${msg} successfully`)
      this.router.navigateByUrl(url)
    }else{
      this.toastr.error(response.error.message)
      console.error(response.error)
    }
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
