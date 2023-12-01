import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ]
})
export class SharedModule { }
