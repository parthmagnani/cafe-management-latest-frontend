import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {

  addProductForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaultData: any,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    private fb: FormBuilder
  ){
    console.log("THis is default data", this.defaultData)
    if(this.defaultData.productDetails){
      this.createAddProduct(this.defaultData.productDetails)
    }else{
      this.createAddProduct()
    }
  } 

  createAddProduct(data?: any){
    this.addProductForm = this.fb.group({
      name: [data ? data.name : ''],
      categoryId: [data ? data.categoryId : ''],
      description: [data ? data.description : ''],
      price: [data ? data.price: '']
    })
  }

  close(){
    this.dialogRef.close()
  }

  addProduct(){
    console.log("form value", this.addProductForm.value)
    this.dialogRef.close(this.addProductForm.value)
  }
}
