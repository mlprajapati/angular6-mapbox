import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { PatrolTrackerComponent } from './patroltracker.component';
import { routing } from './patroltracker.routing';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { SharedModule } from '../../shared/shared.module';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material';



@NgModule({
  imports: [
    routing,CommonModule,MatBottomSheetModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    SharedModule
  ],
  declarations: [
    PatrolTrackerComponent,
    JobdetailComponent
  ],
  providers: [MatBottomSheet],
  entryComponents: [PatrolTrackerComponent, JobdetailComponent]
})
export class PetrolTrackerModule { }
