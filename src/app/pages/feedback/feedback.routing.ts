import { Routes, RouterModule }  from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent
   }  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
