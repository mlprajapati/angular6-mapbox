
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './pages.routing';
import { Pages } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import {HeaderComponent} from '../shared/components/header/header.component';


@NgModule({
  imports: [CommonModule, AppRoutingModule,SharedModule],
  declarations: [Pages,HeaderComponent]
})
export class PagesModule {
}
