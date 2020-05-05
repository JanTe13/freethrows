import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LlistatComponent } from '../../llistat/llistat.component';
import { ConfigurationComponent } from 'app/configuration/configuration.component';
import { ActaComponent } from 'app/acta/acta.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'acta',           component: ActaComponent },
    { path: 'llistats',       component: LlistatComponent },
    { path: 'configuration',  component: ConfigurationComponent}
];
