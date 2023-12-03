import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditProductComponent } from 'src/app/shared/components/add-edit-product/add-edit-product.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  displayedColumns: string[] = ['Sr.no', 'Product','Category', 'Description', 'Price', 'Action'];
  dataSource = [];

  dialogRef!: any
  searchProduct: any
  categoryList: any

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){
    this.getProduct()
    this.getCategory()
  }


  addProduct(){
    this.dialogRef = this.dialog.open(AddEditProductComponent, {
      width:'500px',
      disableClose: true,
      data: {
        categoryList: this.categoryList
      }
    }).afterClosed().subscribe((res: any) => {
      console.log("This is res after adding product", res)
      if(res){
        this.auth.addProduct(res).subscribe((response: any) => {
          if(response.status == 200){
            this.getProduct()
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
      }
    })
  }

  getProduct(){
    this.auth.getProduct().subscribe((response: any) => {
      if(response.status == 200){
        this.dataSource = response.data
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  getCategory(){
    this.auth.getCategory().subscribe((response: any) => {
      if(response.status == 200){
        this.categoryList = response.data
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  editProduct(element: any){
    this.dialogRef = this.dialog.open(AddEditProductComponent, {
      width:'500px',
      disableClose: true,
      data: {
        categoryList: this.categoryList,
        productDetails: element
      }
    }).afterClosed().subscribe((res: any) => {
      // console.log("This is res after editing product", res)
      if(res){
        res.id = element.id
        this.auth.editProduct(res).subscribe((response: any) => {
          console.log("This si resposne after editing product", response)
          if(response.status == 200){
            this.getProduct()
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
      }
    })
  }

  deleteProduct(element: any){
    const payload = {
      id: element.id
    }

    this.auth.deleteProduct(payload).subscribe((response: any) => {
      if(response.status == 200){
        this.getProduct()
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  onChangeProductStatus(event: any, element: any){
    const payload  = {
      "status": event.checked,
      "id": element.id
    }

    this.auth.updateProductStatus(payload).subscribe((response: any) => {
      if(response.status == 200){
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

}
