import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { routing } from './feedback.routing';
import { SharedModule } from '../../shared/shared.module';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,routing,SharedModule,FormsModule
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [MatBottomSheet],
})
export class FeedbackModule { }
