import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { PetrolTrackerComponent } from './petroltracker.component';
import { routing } from './petroltracker.routing';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  imports: [
    routing,CommonModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    })
  ],
  declarations: [
    PetrolTrackerComponent
  ],
  providers: [],
})
export class PetrolTrackerModule { }
