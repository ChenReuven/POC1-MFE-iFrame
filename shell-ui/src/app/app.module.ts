import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from 'src/common/common.module';
import { ShellService } from './services/shell.service';
import { FakeComponent } from './components/fake/fake.component';

@NgModule({
  declarations: [AppComponent, FakeComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [ShellService],
  bootstrap: [AppComponent],
})
export class AppModule { }
