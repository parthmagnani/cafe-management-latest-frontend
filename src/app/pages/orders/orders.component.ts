import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  customerForm!: FormGroup
  categoryList: any
  categoryId: any
  productListByCategory: any

  disableDeleteButton: Boolean = false

  paymentOptions:any = ["Cash", "Online"]

  totalSum: number = 0
  pdfContent: any

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ){
    this.createCustomerForm()
    this.getCategory()
    
  }

  ngOnInit(){
    this.customerForm?.get('productDetails')?.valueChanges.subscribe((items) => {
      this.updateSum();
    });
  }

  createCustomerForm(){
    this.customerForm = this.fb.group({
      name: [''],
      email: [''],
      contactNumber: [''],
      paymentMethod: [''],
      productDetails: this.fb.array([]),
      total: ['']
    })

    this.addNewProduct();
  }

  get addProduct(){
    return this.customerForm.get('productDetails') as FormArray;
  }

  addNewProduct(){

    const product = this.fb.group({
      name: [''],
      category: [''],
      quantity: [''],
      price: [''],
      amount: ['']
    })

    this.addProduct.push(product);

    if(this.addProduct.length == 1){
      this.disableDeleteButton = true
    }else{
      this.disableDeleteButton = false
    }

    this.addProduct.controls[this.addProduct.controls.length -1].get('quantity')?.valueChanges.subscribe((quantity: any) => {
      const temAmount = quantity * this.addProduct.controls[this.addProduct.controls.length -1].get('price')?.value
      console.log("temAmount", temAmount)
      this.addProduct.controls[this.addProduct.controls.length -1].get('amount')?.setValue(temAmount)
    })


  }

  removeProduct(val : any){

    this.addProduct.removeAt(val)

    if(this.addProduct.length == 1){
      this.disableDeleteButton = true
    }else{
      this.disableDeleteButton = false
    }

  }

  updateSum(){
    this.totalSum = 0;
    console.log("called")
    for (const item of this.customerForm?.get('productDetails')?.value) {
      this.totalSum += item.amount;
    }

    this.customerForm.get('total')?.setValue(this.totalSum)
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

  onCategorySelection(event: any){
    this.categoryList.map((res: any) => {
      if(res.name == event.value){
        this.categoryId = res.id
        this.getProductByCategory() 
      }
    })
    
  }

  getProductByCategory(){
    const payload = {
      "categoryId": this.categoryId 
    }

    this.auth.getproductByCategoryId(payload).subscribe((response: any) => {
      console.log("Resposne from particular categoruy id", response)
      if(response.status == 200){
        this.productListByCategory = response.data
        console.log("this.productListByCategory -->>", this.productListByCategory)
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  onProductSelection(event: any){
    this.productListByCategory.map((res: any) => {
      if(res.name == event.value){
        this.addProduct.controls[this.addProduct.controls.length -1].get('name')?.setValue(res.name)
        this.addProduct.controls[this.addProduct.controls.length -1].get('price')?.setValue(res.price)
      }
    })
    console.log(this.addProduct.controls[this.addProduct.controls.length -1].get(''))
  }

  

  saveSubmit(){
    // console.log("", this.customerForm.value)
    const payload = this.customerForm.value
    // payload.productDetails.pop();

    console.log(payload)

    this.auth.generatePdf(payload).subscribe((response: any) => {
      console.log("tHIS IS RESPOSNE from generate pdf", response)
      if(response.status == 200){
        payload.uuid = response.data[0].uuid
        
        console.log("This is new payload == >", payload)
        
        this.auth.getPdf(payload).subscribe((response: any) => {
          console.log("response -->>", response)
          if(response.status == 200){
            const blob = new Blob([response.body], { type: 'application/pdf' });
            this.pdfContent = URL.createObjectURL(blob);
            const uuid = this.extractUuidFromUrl(this.pdfContent);

            console.log("this.pdfContent -->>", this.pdfContent)
            const link = document.createElement('a');
            link.href = this.pdfContent;
            link.download = `${uuid}.pdf`

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

          }else{
            this.snackbar.open(response.message, 'Okay', {duration: 2000})
          }
        })
            
          this.snackbar.open(response.message, 'Okay', {duration: 2000})
          this.customerForm.reset()
      }else{
        this.snackbar.open(response.message, 'Okay', {duration: 2000})
      }
    })
  }

  private extractUuidFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
}
