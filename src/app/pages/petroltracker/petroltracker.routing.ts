import { Routes, RouterModule }  from '@angular/router';
import { PetrolTrackerComponent } from './petroltracker.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PetrolTrackerComponent
   }  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
