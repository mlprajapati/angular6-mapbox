import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
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
      MatMenuModule,
      MatIconModule,
      MatSliderModule,
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
      MatMenuModule,
      MatIconModule,
      MatSliderModule,
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