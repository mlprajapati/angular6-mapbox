import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { routing } from './feedback.routing';
import { SharedModule } from '../../shared/shared.module';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GreetingsComponent } from './greetings';

@NgModule({
  imports: [
    CommonModule,routing,SharedModule,FormsModule,MatBottomSheetModule
  ],
  declarations: [
    FeedbackComponent,GreetingsComponent
  ],
  providers: [MatBottomSheet],
  entryComponents: [FeedbackComponent, GreetingsComponent]
})
export class FeedbackModule { }
