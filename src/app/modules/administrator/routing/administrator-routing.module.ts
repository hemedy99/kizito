import { AdministratorRoutes } from './administrator-routes.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(AdministratorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministratorRoutingModule { }
