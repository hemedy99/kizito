import { UserListComponent } from './../pages/user-list/user-list.component';
import { Routes } from "@angular/router";
import { AdministratorComponent } from "../administrator.component";

export const AdministratorRoutes: Routes = [
    {
      path: '',
      component: AdministratorComponent,
      children: [
        {
          path: 'user-list',
          component: UserListComponent
        }
     
      ]
    }
  ];