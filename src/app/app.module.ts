
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalState } from './global.state';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ProgressInterceptor } from './shared/progress.interceptor';
import { ProgressBarService } from './shared/services/progress-bar.service';
import { TimingInterceptor } from './shared/timing.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { PetrolTrackerService } from './pages/petroltracker/petroltracker.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [AuthGuard,GlobalState,
  {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
  {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
  PetrolTrackerService,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
