import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: 'home', loadChildren:'./home/home.module#HomeModule'
      },
      { path: '',  loadChildren: './home/home.module#HomeModule'
      },
      { path: 'patroltracker/:jobid',  loadChildren:'./patroltracker/patroltracker.module#PatrolTrackerModule'
      },
      { path: 'feedback',  loadChildren:'./feedback/feedback.module#FeedbackModule',canActivate:[AuthGuard]
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
