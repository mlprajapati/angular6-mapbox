import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { PatrolTrackerComponent } from './patroltracker.component';
import { routing } from './patroltracker.routing';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { SharedModule } from '../../shared/shared.module';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material';
import { environment } from '../../../environments/environment';
import { PatrolTrackerService } from './patroltracker.service';



@NgModule({
  imports: [
    routing,CommonModule,MatBottomSheetModule,
    NgxMapboxGLModule.forRoot({
      accessToken: environment.accessTokenMapbox
    }),
    SharedModule
  ],
  declarations: [
    PatrolTrackerComponent,
    JobdetailComponent
  ],
  providers: [MatBottomSheet,PatrolTrackerService],
  entryComponents: [PatrolTrackerComponent, JobdetailComponent]
})
export class PatrolTrackerModule { }
