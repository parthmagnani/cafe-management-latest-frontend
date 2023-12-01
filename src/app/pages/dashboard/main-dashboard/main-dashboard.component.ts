import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {

  dashboardDetails: any

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar){
    this.getDashboaedDetails()
  }

  ngOnInit(){

  }

  getDashboaedDetails(){
    this.auth.dashboardDetails().subscribe((response: any) => {
      console.log("This is reposne from dashboard details", response)
      if(response.status == 200){
        this.dashboardDetails = response.data
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

}
