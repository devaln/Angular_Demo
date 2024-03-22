import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-flats-index',
    standalone: false,
    templateUrl: './flats-index.component.html',
    styleUrl: './flats-index.component.css',
    // imports: []
})
export class FlatsIndexComponent {
  public data: any
  public current: number = 1;
  public perPage = 5
  public itemsToDisplay: any
  public total: any

  constructor(
    private https: UsersService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getFlats()
  }

  getFlats(){
    this.https.get('flats').subscribe((response: any) => {
      this.data = response.data
      this.total = Math.ceil(this.data.length / this.perPage)
      this.itemsToDisplay = this.paginate(this.current, this.perPage)
    }, err => {
      console.error(err.error.message)
    })
  }

  editFlats(flat_id: any){ this.router.navigateByUrl(`flats-form/${flat_id}`) }

  handleClick(flat_id: any){
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFlats(flat_id)
      }
    });
  }

  deleteFlats(flat_id: any){
    this.https.delete(`flats/${flat_id}`).subscribe((response: any) => {
      this.respnseStatus(response, 'Deleted', 'flats')
      location.reload()
    }, err => {
      console.error(err.error)
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
    return [...this.data.slice((current - 1) * perPage).slice(0, perPage)]
  }
}
