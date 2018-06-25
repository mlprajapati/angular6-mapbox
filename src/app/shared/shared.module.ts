import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { UserService } from '../pages/user-management/user.service';


@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UserService
      ]
    };
  }
}