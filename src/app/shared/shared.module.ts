// import { AccordionModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe
} from '@angular/common';
import { SeparatorPipe } from './pipe/separator.pipe';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
// import { QuicklinkModule } from 'ngx-quicklink';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  EntityDefinitionService,
  EntityDataService,
  PersistenceResultHandler,
  EntityCollectionReducerMethodsFactory
} from '@ngrx/data';


import { LoadingComponent } from './components/loading/loading.component';
import { NumberDirective } from './directives/number.directive';
import { MainDataTableComponent } from './components/main-data-table/main-data-table.component';
import { ShowOtherButtonsPipe } from './components/main-data-table/show-other-buttons.pipe';
import { ShowButtonPipe } from './components/main-data-table/show-button.pipe';
import { TableFormComponent } from './components/table-form/table-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgrxNotificationService } from '../core/notifications/ngrx-notification.service';
import { DynamicTableComponent } from './components/tables/dynamic-table/dynamic-table.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { SplitTextDirective } from './directives/split-text.directive';

import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { PlaceholderLoaderComponent } from './components/placeholder-loader/placeholder-loader.component';

@NgModule({
  declarations: [

    SidebarNavComponent,
    DataTableComponent,
    SeparatorPipe,
    LoadingComponent,
    NumberDirective,
    MainDataTableComponent,
    ShowOtherButtonsPipe,
    ShowButtonPipe,
    TableFormComponent,
    LoaderComponent,
    DynamicTableComponent,
    ConfirmComponent,
    SplitTextDirective,
    TimePickerComponent,
    PlaceholderLoaderComponent,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // QuicklinkModule,
    NgSelectModule
    // AccordionModule.forRoot()
  ],
  exports: [
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarNavComponent,
    // QuicklinkModule,
    NgSelectModule,
    DataTableComponent,
    SeparatorPipe,
    LoadingComponent,
    NumberDirective,
    TableFormComponent,
    MainDataTableComponent,
    LoaderComponent,
    DynamicTableComponent,
    PlaceholderLoaderComponent,


  ],
  providers: [
    DatePipe,
    DecimalPipe,
    SeparatorPipe,
    CurrencyPipe,

    // { provide: MAT_DATE_LOCALE, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
   
  ],
  
})
export class SharedModule {
  constructor(

  ) {
 
  }
}
