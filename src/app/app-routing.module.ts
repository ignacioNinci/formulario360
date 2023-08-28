import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboards', component: DashboardsComponent,  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

