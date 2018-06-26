
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './pages.routing';
import { Pages } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AppRoutingModule,SharedModule],
  declarations: [Pages]
})
export class PagesModule {
}
