import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup

  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public defaultData: any,
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder
  ){
    this.createLoginForm()
  }


  createLoginForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    this.dialogRef.close(this.loginForm.value)
  }
}
