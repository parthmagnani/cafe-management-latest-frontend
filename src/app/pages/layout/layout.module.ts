import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    RouterModule,
    MatSnackBarModule
  ]
})
export class LayoutModule { }
