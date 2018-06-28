import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  } from '@angular/material';
  import {NgModule} from '@angular/core';
  //import {MatCardModule} from '@angular/material/card';
  
  @NgModule({
    imports: [
      MatButtonModule,
      MatButtonToggleModule,
      MatMenuModule,
      MatIconModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatProgressBarModule,
      MatAutocompleteModule,
      MatInputModule,
      MatGridListModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatListModule,
      MatDialogModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule
      
    ],
    exports: [
      MatButtonModule,
      MatButtonToggleModule,
      MatMenuModule,
      MatIconModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatProgressBarModule,
      MatAutocompleteModule,
      MatInputModule,
      MatGridListModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatListModule,
      MatDialogModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule
      
    ],
  })
  
  export class MaterialModule {
  }