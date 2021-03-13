import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './modules/administrator/pages/user-list/user-list.component';
import { AdministratorComponent } from './modules/administrator/administrator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  
  // {
  //   path: '',
  //   redirectTo: 'administrator',
  //   pathMatch: 'full'
  // },
  {
    path: 'administrator',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/administrator/administrator.module').then(
            (m) => m.AdministratorModule
          )
      }
    ]
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
