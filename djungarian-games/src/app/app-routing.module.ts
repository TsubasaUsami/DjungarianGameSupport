import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FortniteComponent } from './pages/fortnite/fortnite.component';
import { Splatoon2Component } from './pages/splatoon2/splatoon2.component';
import { Splatoon2ScheduleComponent } from './pages/splatoon2-schedule/splatoon2-schedule.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fortnite', component: FortniteComponent },
  { path: 'splatoon', component: Splatoon2Component },
  { path: 'splatoon/spl-schedule', component: Splatoon2ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
