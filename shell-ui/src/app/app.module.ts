import { SafePipe } from './safe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from 'src/common/common.module';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ShellService } from './services/shell.service';

@NgModule({
  declarations: [AppComponent, SafePipe],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  providers: [ShellService],
  bootstrap: [AppComponent], // Need To Be Comment When Use Shell For Dev In Dynamic Way
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const myElement = createCustomElement(AppComponent, { injector });
    customElements.define('shell-ui', myElement);
  }
  ngDoBootstrap() {}
}
