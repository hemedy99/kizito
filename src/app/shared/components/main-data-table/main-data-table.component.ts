import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { fadeIn, fadeSmooth, ROUTE_ANIMATIONS_ELEMENTS } from '../../animations/router-animation';
import { ActionButton } from './action-button.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CustomMatTableDataSource } from './CustomMatTableDataSource';

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.scss'],
  animations: [fadeSmooth, fadeIn]
})
export class MainDataTableComponent implements OnInit, OnChanges {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  /** Table Inputs */
  @Input()
  tableList = [];
  @Input()
  permissions: any = {};
  @Input()
  tableConfigurations: {
    tableColumns: Array<{ name: string; label: string, type: string, onConoditions?: string[], onCondition?: string, btnLabel?: string }>;
    backendPagination: {
      enabled: boolean,
      totalRecords: number
    };
    tableCaption: string;
    allowPagination: boolean;
    tableNotifications: any;
    actionIcons: any;
    actionIconsActiveConditions: {
      edit: { column: string, compareColumn?: string, values: string[] },
      delete: { column: string, compareColumn?: string, values: string[] },
      more: { column: string, compareColumn?: string, values: string[] },
      customPrimary: { column: string, compareColumn?: string, values: string[] },
      approve: { column: string, compareColumn?: string, values: string[] },
      reject: { column: string, compareColumn?: string, values: string[] },
    };
    doneLoading: any;
    deleting: any;
    showSearch: boolean;
    showBorder: boolean;
    showNumbers?: boolean;
    empty_msg: string;
    customPrimaryMessage: string;
    useFullObject: boolean;
    active: any;
    loading?: any;
    hideExport?: any;
  } = {
      tableColumns: [],
      backendPagination: {
        enabled: false,
        totalRecords: 20
      },
      tableCaption: '',
      allowPagination: true,
      tableNotifications: null,
      actionIcons: {
        edit: false,
        delete: false,
        more: false,
        customPrimary: false,
        approve: false,
        reject: false,
      },
      actionIconsActiveConditions: {
        edit: { column: null, compareColumn: null, values: [] },
        delete: { column: null, compareColumn: null, values: [] },
        more: { column: null, compareColumn: null, values: [] },
        customPrimary: { column: null, compareColumn: null, values: [] },
        approve: { column: null, compareColumn: null, values: [] },
        reject: { column: null, compareColumn: null, values: [] },
      },
      doneLoading: false,
      deleting: {},
      active: {},
      loading: {},
      showSearch: true,
      showBorder: true,
      showNumbers: false,
      empty_msg: 'No Data',
      customPrimaryMessage: '',
      useFullObject: false,
    };
  @Input()
  loading: boolean;
  searchFieldControl: FormControl;

  /** Table Events */
  @Output()
  rowCustomPrimary: EventEmitter<any> = new EventEmitter();
  @Output()
  onColumnBtnClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  rowUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  rowDownload: EventEmitter<any> = new EventEmitter();
  @Output()
  rowDelete: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPreview: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPrint: EventEmitter<any> = new EventEmitter();

  @Output()
  customAction: EventEmitter<any> = new EventEmitter();

  @Input()
  loadingMessage: string = null;

  // list of all the added buttons that you want to deal with separately
  @Input() actionButtons: ActionButton[] = [];

  searchKey: string = "";

  /** list of fields that are searchable */
  searchFields: string;
  showDelete: any = {};
  showDownload: any = {};

  dataSource: CustomMatTableDataSource<any>;
  displayedColumns: string[];
  showButtonConfirm: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dummyItems = [];

  @Output()
  rowApprove: EventEmitter<any> = new EventEmitter();

  @Output()
  rowReject: EventEmitter<any> = new EventEmitter();


  @Output()
  pagination: EventEmitter<any> = new EventEmitter();

  /* search form */
  searchForm: FormGroup;
  dataLength: number = 100;

  constructor() {
    this.searchFieldControl = new FormControl('');
    // this.searchFieldControl.valueChanges.subscribe(v => console.log({ v }));
    if (this.tableConfigurations) {
      this.tableConfigurations.showSearch =
        this.tableConfigurations.showSearch !== null
          ? this.tableConfigurations.showSearch
          : true;
      this.tableConfigurations.allowPagination =
        this.tableConfigurations.allowPagination !== null
          ? this.tableConfigurations.allowPagination
          : true;
      this.tableConfigurations.showBorder =
        this.tableConfigurations.showBorder !== null
          ? this.tableConfigurations.showBorder
          : false;
      this.searchFields = this.tableConfigurations.tableColumns
        .map(column => column.name)
        .join(',');
      this.tableConfigurations.actionIcons = this.tableConfigurations
        .actionIcons
        ? this.tableConfigurations.actionIcons
        : {
          edit: false,
          delete: false,
          download: false,
          more: false,
          print: false,
          cancel: false,
          customPrimary: false,
          approve: false,
          reject: false,
        };

      //check if backend pagination enabled
      this.tableConfigurations.backendPagination = this.tableConfigurations.backendPagination ? this.tableConfigurations.backendPagination : { enabled: false, totalRecords: 100 };
      this.tableConfigurations.active = this.tableConfigurations.active
        ? this.tableConfigurations.active
        : {};

      this.tableConfigurations.active = this.tableConfigurations.active
        ? this.tableConfigurations.active
        : {};


      /* this for actionsIconsConditions */
      this.tableConfigurations.actionIconsActiveConditions = this.tableConfigurations
        .actionIconsActiveConditions
        ? this.tableConfigurations.actionIconsActiveConditions
        : {
          edit: { column: null, compareColumn: null, values: [] },
          delete: { column: null, compareColumn: null, values: [] },
          more: { column: null, compareColumn: null, values: [] },
          customPrimary: { column: null, compareColumn: null, values: [] },
          approve: { column: null, compareColumn: null, values: [] },
          reject: { column: null, compareColumn: null, values: [] },
        };
    } else {
      this.tableConfigurations.showSearch = true;
      this.tableConfigurations.allowPagination = true;
      this.tableConfigurations.showBorder = false;
      this.tableConfigurations.actionIcons = {
        edit: false,
        delete: false,
        more: false,
        download: false,
        print: false,
        cancel: false,
        customPrimary: false,
        approve: false,
        reject: false,
      };
    }
  }

  ngOnInit() {

    this.initTableData();

    //this.dataSource.sort = this.sort;
    this.searchForm = new FormGroup({
      searchKey: new FormControl(null, [])
    });

    this.searchForm.get('searchKey').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filterValue => {
      if (this.tableConfigurations.backendPagination && this.tableConfigurations.backendPagination.enabled) {
  
          //this.pagination.emit({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize, search: filterValue });
        
          this.dataSource.filter = filterValue.toLowerCase();
      } else {

        console.log("filtering info =>", filterValue);
        this.dataSource.filter = filterValue.toLowerCase();

      }
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    })
  }

  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.toLowerCase();
    // this.searchKey = filterValue;

  }

  private initTableData() {
    if (this.tableConfigurations.backendPagination && this.tableConfigurations.backendPagination.enabled) {
      /*  if (this.dataSource) {
         this.dataSource.loadData(this.tableList, this.tableConfigurations.backendPagination.totalRecords);
       } else {
       } */
      this.dataSource = new CustomMatTableDataSource(this.tableList, this.tableConfigurations.backendPagination.totalRecords);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      //hapa ndo kimeo
      /* if(this.paginator) {
        this.paginator.length = this.tableConfigurations.backendPagination.totalRecords;
      } */
    } else {

      //this.dataSource = new MatTableDataSource(this.tableList);
      //take only data that are based on page size
      //this.dataSource = new CustomMatTableDataSource(this.tableList, this.tableList.length);
        let pageSize = 10;//default page size
        const allData = this.tableList;
        let displayData = allData.slice(0, pageSize);

      /*  if (this.dataSource) {
         this.dataSource.loadData(this.tableList, this.tableList.length);
       } else {
         console.log("table list", this.tableList);
       } */
      this.dataSource = new CustomMatTableDataSource(this.tableList, 0);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //this.dataSource = new MatTableDataSource(this.tableList);
      
      /* this.dataSource.pageCount$.subscribe(res => {
        console.log("table lenght => ", res);
      }); */

    }
    // if (this.dataSource) {
    //   this.dataSource.pageCount$.subscribe(res => {
    //     console.log('man datatable lenght', res);
    //     this.dataLength = res;
    //     if (this.paginator) {
    //       /*  this.paginator.length(res);//setting up lenght to paginator
    //        console.log(this.paginator); */
    //       if (this.dataSource.paginator) {
    //         console.log("hey im called here", res);
    //         this.dataSource.paginator.length = res;
    //         //this.
    //       }
    //     }
    //   });

    // }
  }


  ngOnChanges() {
    /* if (this.tableConfigurations.backendPagination && this.tableConfigurations.backendPagination.enabled) {
      this.dataSource = new CustomMatTableDataSource(this.tableList, this.tableConfigurations.backendPagination.totalRecords);

    } else {

      this.dataSource = new MatTableDataSource(this.tableList);
    } */

    //console.log("somethgin changed");



    //this.dataSource = new MatTableDataSource(this.tableList);
    if (this.dataSource) {

      this.dataSource.pageCount$.subscribe(res => {
        //console.log('man datatable lenght', res);
        this.dataLength = res;

      });



    }

    if (this.tableConfigurations.backendPagination && this.tableConfigurations.backendPagination.enabled) {
      this.dataLength = this.tableConfigurations.backendPagination.totalRecords;
      this.dataSource = new CustomMatTableDataSource(this.tableList, this.tableConfigurations.backendPagination.totalRecords);
      this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.pageCount.next(this.tableConfigurations.backendPagination.totalRecords)
    } else {

      let pageSize = 10;//default page size
      const allData = this.tableList;
      let displayData = allData.slice(0, pageSize);

      this.dataSource = new CustomMatTableDataSource(this.tableList,this.tableList.length);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }



    const { edit, print, more, cancel, download, customPrimary, approve, reject } = this.tableConfigurations.actionIcons;
    let colums = [];
    if (this.tableConfigurations.showNumbers) {
      colums = [
        'position',
        ...this.tableConfigurations.tableColumns.map(column => column.name)
      ];
    } else {
      colums = [
        ...this.tableConfigurations.tableColumns.map(column => column.name)
      ];
    }
    if (
      edit ||
      print ||
      download ||
      more ||
      cancel ||
      customPrimary ||
      approve ||
      reject ||
      this.tableConfigurations.actionIcons.delete ||
      this.actionButtons.length > 0
    ) {
      this.displayedColumns = [...colums, 'action'];
    } else {
      this.displayedColumns = colums;
    }
    if (this.tableConfigurations.allowPagination) {
      //this.dataSource.paginator = this.paginator;
    }
    //this.dataSource.sort = this.sort;



  

  }

  viewItemDetails(item) {
    if (this.tableConfigurations.useFullObject) {
      this.rowPreview.emit(item);
    } else {
      this.rowPreview.emit(item.id);
    }
  }

  editItem(item) {
    if (this.tableConfigurations.useFullObject) {
      this.rowUpdate.emit(item);
    } else {
      this.rowUpdate.emit(item.id);
    }
  }

  approveItem(item) {
    if (!confirm("Are you sure you want to approve this request?")) {
      return;
    }
    this.rowApprove.emit(item);
  }

  rejectItem(item) {
    if (!confirm("Are you sure you want to reject this request?")) {
      return;
    }
    this.rowReject.emit(item);
  }

  printItem(itemId) {
    this.rowPrint.emit(itemId);
  }

  deleteItem(item) {
    if (this.tableConfigurations.useFullObject) {
      this.rowDelete.emit(item);
    } else {
      this.rowDelete.emit(item.id);
    }
  }

  customPrimaryItem(item) {
    if (this.tableConfigurations.useFullObject) {
      this.rowCustomPrimary.emit(item);
    } else {
      this.rowCustomPrimary.emit(item.id);
    }
  }

  downloadItem(item) {
    this.rowDownload.emit(item);
  }

  trackByFn(index, item) {
    return item ? item.id : undefined;
  }


  submitCustomButtom(button: ActionButton, item, step) {
    const action = button.action;
    this.showButtonConfirm = {};
    if (step === 'first' && button.confirm_first) {
      this.showButtonConfirm[button.id + item.id] = true;
    } else {
      if (this.tableConfigurations.useFullObject) {
        this.customAction.emit({ action, value: item });
      } else {
        this.customAction.emit({ action, value: item.id });
      }
    }
  }


  downloadToCsv() {
    const data = this.tableList.map(item => {
      const object = {};
      for (const col of this.tableConfigurations.tableColumns) {
        object[col.name] = item[col.name] ? item[col.name] : '';
      }
      return object;
    });

    // const csvFile = new ngxCsv(data, 'My Report', {
    //   headers: this.tableConfigurations.tableColumns.map(col => col.label)
    // });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter(this.searchKey);
  }

  onColumnBtnCliced($event: any) {
    this.onColumnBtnClicked.emit($event);
  }


  activeButton(btnKey, tableListItem) {
    /* the logics behind this code is very confusing, 
    please be carefull when trying to modify this,
    if you can't understand this please contact 
    ## name: Nassor Kh. Nassor
    ## email : nassor.nassor@tra.go.tz or alanzauann@gmail.com
     */
    let active = true;
    if (this.tableConfigurations.actionIconsActiveConditions) {
      // console.log('condition => ', this.tableConfigurations.actionIconsActiveConditions)
      let condition = this.tableConfigurations.actionIconsActiveConditions;
      if (condition.hasOwnProperty(btnKey)) {
        if (condition[btnKey].column && condition[btnKey].values.length > 0) {
          //check if the column specified exist in the table row properties
          //and condition values properties is not null
          if (tableListItem[condition[btnKey].column] && condition[btnKey].values) {
            //now check if the condition meets
            if (condition[btnKey].values.map(value => value.toString().toUpperCase()).includes(tableListItem[condition[btnKey].column].toString().toUpperCase())) {
              active = true;
            } else {
              active = false;
            }
          } else {
            active = false;
          }
        } else if (condition[btnKey].column && condition[btnKey].compareColumn) {
          //if column and compare column are set, check if the values exist in table row properties
          //if true then compare the two values if are equal set active true
          //console.log('vaues column => compareColumn',tableListItem[condition[btnKey].column], tableListItem[condition[btnKey].compareColumn])
          if (tableListItem[condition[btnKey].column] && tableListItem[condition[btnKey].compareColumn]) {
            if (tableListItem[condition[btnKey].column].toString().toUpperCase() === tableListItem[condition[btnKey].compareColumn].toString().toUpperCase()) {
              active = true;
            } else {
              active = false;
            }
          } else {
            active = false;
          }
        }

      }
    }

    return active;
  }


  /* changes for paginations */
  ngAfterViewInit() {

    this.dataSource.sort = this.sort;

    if (this.tableConfigurations.allowPagination) {

      //this.dataSource.paginator = this.paginator;

     // console.log(this.dataSource.paginator);

      this.paginator.page
        .pipe(
          tap(() => {

            // this.pagination.emit({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize, search: this.searchKey });

            if (this.tableConfigurations.backendPagination && this.tableConfigurations.backendPagination.enabled) {
              this.pagination.emit({ pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize, search: this.searchKey });

            } else {
              //apply pagination manually, this was unnecessary but the datatable stopped working I dont why
             /*  let pageSize = this.paginator.pageSize;
              const allData = this.tableList;
              let displayData = allData.slice((this.paginator.pageIndex) * pageSize, (this.paginator.pageIndex) * pageSize + pageSize);

              this.dataSource = new CustomMatTableDataSource(displayData, this.tableList.length); */

              /* console.log("table list => ", this.tableList);
              console.log("displayed table list => ", displayData);
              console.log("pageIndex, pageSize => ", this.paginator.pageIndex, pageSize); */
            }
          })
        )
        .subscribe();
    }
  }
}
