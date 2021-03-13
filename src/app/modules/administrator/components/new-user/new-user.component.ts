import { DistrictEntityService } from './../../../../shared/service/district-entity.service';
import { District } from './../../../../shared/models/district.model';
import { WorkingAreaEntityService } from './../../../../shared/service/working-area-entity.service';
import { WorkingArea } from './../../../../shared/models/working-area.model';
import { UserTypeEntityService } from './../../../../shared/service/user-type-entity.service';
import { UserRequest, UserResponse } from './../../models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudModeEnum } from 'src/app/shared/models/crud-mode.enum';
import { UserRequestEntityService } from '../../services/user/user-entity.service';
import { CustomUtilityService } from 'src/app/shared/service/custom-utility.service';
import { UserType } from 'src/app/shared/models/user-type.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  submitForm: FormGroup;
  userTypes: Observable<UserType[]>;
  workingAreas: Observable<WorkingArea[]>;
  districts: Observable<District[]>;
  genders: Observable<any[]> = of([
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' }
  ]);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      crudMode: CrudModeEnum;
      currentUser: UserResponse;
      user: UserRequest;
    },
    public dialogRef: MatDialogRef<NewUserComponent>,
    private fb: FormBuilder,
    private userService: UserRequestEntityService,
    public userTypeService: UserTypeEntityService,
    public workingAreaService: WorkingAreaEntityService,
    public districtService: DistrictEntityService,
    private customUtilityService: CustomUtilityService 
  ) { }

  ngOnInit(): void {
    this.userTypes = this.userTypeService.getAll();
    this.workingAreas = this.workingAreaService.getAll();
    this.districts = this.districtService.getAll();
    this.configureSubmitForm();
  }

  configureSubmitForm() {
    this.submitForm = this.fb.group({
      userTypeId: Number(new FormControl(null, [Validators.required])),
      workingAreaId: new FormControl(null, [Validators.required]),
      reporterArea: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: "Zanzibar2021*",
      userStatusId: "1",

    });
    if (this.data.crudMode === CrudModeEnum.UPDATE) {
      if (this.data.currentUser) {
        Object.keys(this.data.currentUser).forEach((key) => {
          if (this.submitForm.value.hasOwnProperty(key)) {
            this.submitForm
              .get(key)
              .setValue(this.data.currentUser[key]);
          }
        });
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.submitForm.valid) {
      let body = this.submitForm.value;
      if (this.data.crudMode == CrudModeEnum.CREATE) {
        this.userService.add(body).subscribe((res) => {
          this.dialogRef.close(true);
        });
      } 
    } else {
      this.customUtilityService.validateAllFormFields(this.submitForm);
    }
  }

}
