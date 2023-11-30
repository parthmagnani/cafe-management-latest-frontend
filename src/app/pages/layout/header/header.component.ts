import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { SigninComponent } from 'src/app/shared/components/signin/signin.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  dialogRef!: any

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
    ){

  }

  login(){
    this.dialogRef = this.dialog.open(LoginComponent, {
      width:'500px'
    }).afterClosed().subscribe((res: any) => {
      if(res){
        console.log("This are credentials for login", res)
        this.auth.login(res).subscribe((response: any) => {
          if(response.status == 200){
            console.log("response", response)
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
            localStorage.setItem('userToken', response.data);
            this.router.navigate(['/'])
          }
        })
      }
    })
  }

  signin(){
    this.dialogRef = this.dialog.open(SigninComponent, {
      width:'500px'
    }).afterClosed().subscribe((res: any) => {
      if(res){
        console.log("This are credentials", res)
        
      }
    })
  }
}
