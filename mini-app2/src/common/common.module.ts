import { NgModule } from '@angular/core';
import { CommonModule as cm } from '@angular/common';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';

@NgModule({
  declarations: [AppSidenavComponent],
  imports: [cm],
  exports: [AppSidenavComponent],
})
export class CommonModule {}
