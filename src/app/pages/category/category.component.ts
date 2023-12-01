import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  dialogRef!: any
  searchCategory: any

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ){
    console.log("welcome to category")
  }

  addCategory(){
    this.dialogRef = this.dialog.open(AddCategoryComponent, {
      width:'500px',
      disableClose: true
    }).afterClosed().subscribe((res: any) => {
      if(res){
        console.log("res api", res)
        const payload = {
          name: res
        }
        this.auth.addCategory(payload).subscribe((response: any) => {
          console.log("This is reposne from addding category", response)
          if(response.status == 200){
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
      }else{

      }
    })
  }

}
