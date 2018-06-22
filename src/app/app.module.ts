
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalState } from './global.state';
import { FormsModule } from '@angular/forms';

import {SearchComponent} from './components/search/search.component'
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule { }
