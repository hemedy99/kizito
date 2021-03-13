import { District } from './../../../shared/models/district.model';
import { WorkingArea } from './../../../shared/models/working-area.model';
import { UserType } from './../../../shared/models/user-type.model';
import { EntityMetadataMap } from '@ngrx/data';
import { UserResponse,UserRequest } from '../models/user.model';

export const AdministratorEntityMetadata: EntityMetadataMap = {
   UserRequest: {
    additionalCollectionState: { page: {} }
  },
  UserResponse :{
     selectId: (data: UserResponse) => data.id,
  },
  UserType :{
   selectId: (data: UserType) => data.id,
},

WorkingArea :{
   selectId: (data: WorkingArea) => data.id,
},
District :{
   selectId: (data: District) => data.id,
}



};
