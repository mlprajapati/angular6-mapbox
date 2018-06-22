
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './pages.routing';
import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [Pages]
})
export class PagesModule {
}
