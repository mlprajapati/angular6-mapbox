import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { Home } from './home.component';
import { routing } from './home.routing';




@NgModule({
  imports: [
    routing,CommonModule,
  ],
  declarations: [
    Home
  ],
  providers: [],
})
export class HomeModule { }
