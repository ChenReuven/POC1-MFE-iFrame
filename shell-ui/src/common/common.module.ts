import { NgModule } from '@angular/core';
import { CommonModule as cm } from '@angular/common';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppSidenavComponent],
  imports: [cm, RouterModule],
  exports: [AppSidenavComponent],
})
export class CommonModule { }
