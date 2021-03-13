import {
  Component,
  OnInit,
  Input,
  ContentChild,
  EventEmitter,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  ContentChildren
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { isObservable, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnDestroy {
  @Input() tableData: Observable<any[]> | any[] | null;
  @Input() columnHeader;
  @Input() hasActionsColumn = true;
  @Input() hasSearch = true;
  @Input() showFirstLastButtons = true;
  @Input() serverPagination = false;
  @Input() totalElements: number = 0;
  @Input() actionPosition = 1;
  @Input() actionPosition2 = 3;
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

  ngAfterViewInit() {
    if (isObservable(this.tableData)) {
      this.subscriptions.add(
        this.tableData.subscribe((data) => {
          this.listData = new MatTableDataSource(data);
          this.listData.sort = this.sort;
          if (!this.serverPagination) {
            this.listData.paginator = this.paginator;
          }
        })
      );
    } else {
      this.listData = new MatTableDataSource(this.tableData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
    // this.changeDetectorRef.detectChanges();
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
