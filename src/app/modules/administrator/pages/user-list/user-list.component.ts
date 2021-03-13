import { NewUserComponent } from './../../components/new-user/new-user.component';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CrudModeEnum } from 'src/app/shared/models/crud-mode.enum';
import { Pagination } from 'src/app/shared/models/paginated-response.model';
import { CustomUtilityService } from 'src/app/shared/service/custom-utility.service';
import { UserResponse } from '../../models/user.model';
import { UserResponseEntityService } from '../../services/user/user-entity.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionButton } from 'src/app/shared/components/main-data-table/action-button.model';
import { MyUtils } from '../../../../utilities/maafa.utils';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges{

  tableColumns;
  tableData$: Observable<UserResponse[]>;
  loading$: Observable<boolean>;
  page$: Observable<Pagination>;
  page: Pagination;
  length: number;
  size: number;

  formData: {
    crudMode: CrudModeEnum;
    title: string;
    currentUser?: UserResponse;
  };

  user$: Observable<UserResponse[]>;
  users$: Observable<UserResponse>;
  user: Observable<UserResponse[]>;

  userpath: string = 'administrator';

  dataList: any[] = [];


  configureTable() {
    this.tableColumns = {
      sn: '#',
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      email: 'Email',
      userTypeName: 'UserType',
      userStatusName: 'UserStatus',
      action: 'Action'
    };
  }


  constructor(
    private matDialog: MatDialog,
    private router: Router,
    public customUtilityService: CustomUtilityService,
    public userService: UserResponseEntityService
  ) {}

  ngOnInit(): void {

    this.configureTable();
    this.loading$ = this.userService.loading$;
    this.tableData$ = this.userService.entities$;
    this.page$ = this.userService.page$;
    this.userService.getAll();
    
    // this.page$.subscribe((res) => {
    //   if (!this.customUtilityService.isEmpty(res)) {
    //     this.page = res;
    //     this.size = res.size;
    //     this.length = res.totalElements;
    //   }
    // });
    
  }

  ngOnChanges() {
    if (this.userService.page$) {
    }
  }

  onCreateUser() {
    const options = {
      data: {
        crudMode: CrudModeEnum.CREATE,
        title: 'Create New User',
        currentUser: null,
        user: this.tableData$
      },
      width: '60%',
      disableClose: true
    };

    this.matDialog.open(NewUserComponent, options);
  }

  

}
