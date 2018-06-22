import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { PetrolTrackerModule } from './petroltracker/petroltracker.module';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: 'home', loadChildren:()=>HomeModule
      },
      { path: '',  loadChildren: ()=>HomeModule
      },
      { path: 'petroltracker',  loadChildren:()=>PetrolTrackerModule
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
