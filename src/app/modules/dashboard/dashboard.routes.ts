import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const Routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
]
