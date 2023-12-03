import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    AddCategoryComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class SharedModule { }
