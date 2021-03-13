import { District } from './../../shared/models/district.model';
import { DistrictEntityService } from './../../shared/service/district-entity.service';
import { DistrictDataService } from './../../shared/service/district-data.service';
import { WorkingAreaEntityService } from './../../shared/service/working-area-entity.service';
import { WorkingAreaDataService } from './../../shared/service/working-area-data.service';
import { UserType } from './../../shared/models/user-type.model';
import { UserTypeEntityService } from './../../shared/service/user-type-entity.service';
import { UserTypeDataService } from './../../shared/service/user-type-data.service';
import { RouterModule } from '@angular/router';
import { AdministratorRoutingModule } from './routing/administrator-routing.module';
import { UserRequest, UserResponse } from './models/user.model';
import { UserRequestEntityService,UserResponseEntityService } from './services/user/user-entity.service';
import { UserRequestDataService,UserResponseDataService } from './services/user/user-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { AdministratorEntityMetadata } from './store/administrator-entity-metadata';
import { UserListComponent } from './pages/user-list/user-list.component';
import {SharedModule} from '../../shared/shared.module'
import { NgxPermissionsModule } from 'ngx-permissions';
import { NewUserComponent } from './components/new-user/new-user.component';

//const entityMetadata = AdministratorEntityMetadata;

@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdministratorRoutingModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    })

  ],
  providers:[
    UserRequestDataService,
    UserResponseDataService,
    UserRequestEntityService,
    UserResponseEntityService,
    UserTypeDataService,
    UserTypeEntityService,
    WorkingAreaDataService,
    WorkingAreaEntityService,
    DistrictDataService,
    DistrictEntityService,
  ],
  entryComponents: [
    NewUserComponent
  ]
})
export class AdministratorModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    userRequestDataService: UserRequestDataService,
    userResponseDataService: UserResponseDataService,
    userTypeDataService:UserTypeDataService,
    workingAreaDataService:WorkingAreaDataService,
    districtDataService:DistrictDataService
  ){
    eds.registerMetadataMap(AdministratorEntityMetadata);
    entityDataService.registerServices({
      UserRequest: userRequestDataService,
      UserResponse: userResponseDataService,
      UserType:userTypeDataService,
      WorkingArea:workingAreaDataService,
      District:districtDataService
    });
  }
 }
