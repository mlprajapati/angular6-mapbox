import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { routing } from './feedback.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,routing,SharedModule
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [],
})
export class FeedbackModule { }
