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

  displayedColumns: string[] = ['Sr.no', 'Category Name', 'Action'];
  dataSource: any = [];

  dialogRef!: any
  searchCategory: any

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ){
    
    this.getCategory()
  }

  addCategory(){
    this.dialogRef = this.dialog.open(AddCategoryComponent, {
      width:'500px',
      disableClose: true
    }).afterClosed().subscribe((res: any) => {
      if(res){
        
        const payload = {
          name: res
        }
        this.auth.addCategory(payload).subscribe((response: any) => {
          
          if(response.status == 200){
            this.getCategory()
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
      }else{

      }
    })
  }

  getCategory(){
    this.auth.getCategory().subscribe((response: any) => {
      console.log("This is reposne from get category", response)
      if(response.status == 200){
        this.dataSource = response.data
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  deleteCategory(value: any, index: any){
    const payload = {
      id: value.id
    }
    this.auth.deleteCategory(payload).subscribe((response: any) => {
      console.log("resposne from delete", response)
      if(response.status == 200){
        this.getCategory()
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  editCategory(value: any){
    console.log("this is value for edit", value)
    this.dialogRef = this.dialog.open(AddCategoryComponent, {
      width:'500px',
      disableClose: true,
      data: value
    }).afterClosed().subscribe((res: any) => {
      console.log("this is res after update", res)
      if(res){
        const payload = {
          "name": res,
          "id": value.id
        }

        this.auth.editCategory(payload).subscribe((response: any) => {
          if(response.status == 200){
            this.getCategory()
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
      }
    })
  }

}
