import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signinForm!: FormGroup

  constructor(
    private dailog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public defaultData: any,
    private dialogRef: MatDialogRef<SigninComponent>,
    private fb: FormBuilder
  ){
    this.createSigninForm()
  }

  createSigninForm(){
    this.signinForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  signin(){
    this.dialogRef.close(this.signinForm.value)
  }
}
