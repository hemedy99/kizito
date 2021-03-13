import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ContentChild,
  TemplateRef,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { Observable, Subscription, isObservable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() tableData: Observable<any[]> | any[] | null;
  @Input() columnHeader;
  @Input() hasActionsColumn = true;
  @Input() hasSearch = true;
  @Input() showFirstLastButtons = true;
  @Input() serverPagination = false;
  @Input() totalElements: number = 0;
  @Input() actionPosition = 1;
  @Input() actionPosition2 = 0;
  @Input() actionPosition3 = 0;
  @Input() pageSizeStart = 10;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Input() hasSN = 0;
  objectKeys = Object.keys;
  listData: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild('actions') actions: TemplateRef<any>;
  @ContentChild('actions2') actions2: TemplateRef<any>;
  @ContentChild('actions3') actions3: TemplateRef<any>;
  subscriptions: Subscription = new Subscription();
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnChanges() {
    if (!isObservable(this.tableData)) {
      this.listData = new MatTableDataSource(this.tableData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  }
  ngAfterViewInit() {
    if (isObservable(this.tableData)) {
      this.subscriptions.add(
        this.tableData.pipe(distinctUntilChanged()).subscribe((data) => {
          this.listData = new MatTableDataSource(data);
          this.listData.sort = this.sort;
          if (!this.serverPagination) {
            this.listData.paginator = this.paginator;
          }
          this.changeDetectorRef.detectChanges();
        })
      );
    } else {
      this.listData = new MatTableDataSource(this.tableData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  }

  filterTable() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.filterTable();
  }
  paginationEvent(data) {
    this.pageEvent.emit(data);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
