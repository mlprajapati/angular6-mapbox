import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', redirectTo:'pages', pathMatch:'full'},
  {path: '**',redirectTo:'pages'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
