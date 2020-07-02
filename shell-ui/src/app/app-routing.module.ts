import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mini-app1', pathMatch: 'full' },
  { path: 'mini-app1', loadChildren: () => import('./components/fake/fake.module').then(m => m.FakeModule) },
  { path: 'mini-app2', loadChildren: () => import('./components/fake/fake.module').then(m => m.FakeModule) },
  { path: 'mini-app3', loadChildren: () => import('./components/fake/fake.module').then(m => m.FakeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
