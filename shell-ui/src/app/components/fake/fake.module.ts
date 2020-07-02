import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShellService } from './../../services/shell.service';
import { FakeComponent } from './fake.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '**', component: FakeComponent }])
  ],
  providers: [ShellService]
})
export class FakeModule {
  constructor(
    private activatedRoute: ActivatedRoute,
    private shellService: ShellService
  ) {
    // this.shellService.dispatch()
    this.activatedRoute.snapshot.url;
  }
}
