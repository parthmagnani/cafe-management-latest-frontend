import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  searchUser: any

  displayedColumns: string[] = ['Sr.no', 'User Name','Email', 'Contact', 'Action'];
  dataSource = [];

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar
    ){
    this.getUsers()
  }

  getUsers(){
    this.auth.getusers().subscribe((response: any) => {
      console.log("resposne in get user", response)
      if(response.status == 200){
        this.dataSource = response.data
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  onSlideToggleChange(event: any, element: any){

    const payload  = {
      "status": event.checked,
      "id": element.id
    }

    console.log("THis is payload -", payload)
    this.auth.changeUserStatus(payload).subscribe((response: any) => {
      console.log("This is resposne", response)
      if(response.status == 200){
        // this.getUsers()
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }
}
