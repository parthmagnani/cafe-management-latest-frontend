import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  category: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaultData: any,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
  ){
    console.log("This is default Data", this.defaultData)
    if(this.defaultData){
      this.category = this.defaultData.name
    }
  }

  

  addCategory(){
    console.log("This is category", this.category)
    this.dialogRef.close(this.category)
  }

  close(){
    console.log("close")
    this.dialogRef.close()
  }
}
