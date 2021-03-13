import { _isNumberValue } from '@angular/cdk/coercion';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, of, Observable, Subject, merge, combineLatest, Subscription, of as observableOf } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

export class CustomMatTableDataSource<T> implements DataSource<any> {

  private listSubject = new BehaviorSubject<any[]>([]);
  private readonly _data: BehaviorSubject<T[]>;//this is equal to listSubject
  private readonly _renderData = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public pageCount = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public pageCount$ = this.pageCount.asObservable();

  /* applying filter */
  filteredData: T[];
  private readonly _filter = new BehaviorSubject<string>('');
  private _pageCount: number;

  get data() { return this._data.value; }
  set data(data: T[]) { this._data.next(data); }

  get filter(): string { return this._filter.value; }
  set filter(filter: string) { this._filter.next(filter); }

  get paginator(): MatPaginator | null { return this._paginator; }
  set paginator(paginator: MatPaginator | null) {
    this._paginator = paginator;
    this._updateChangeSubscription();
  }
  private _paginator: MatPaginator | null;

  get sort(): MatSort | null { return this._sort; }
  set sort(sort: MatSort | null) {
    this._sort = sort;
    this._updateChangeSubscription();
  }
  private _sort: MatSort | null;

  _renderChangesSubscription = Subscription.EMPTY;

  _updateChangeSubscription() {
    // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
    // The events should emit whenever the component emits a change or initializes, or if no
    // component is provided, a stream with just a null event should be provided.
    // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
    // pipeline can progress to the next step. Note that the value from these streams are not used,
    // they purely act as a signal to progress in the pipeline.
    const sortChange: Observable<Sort | null> = this._sort ?
      merge<Sort>(this._sort.sortChange, this._sort.initialized) :
      observableOf(null);

      //update page lenght before fire the info

      /* if(this._paginator) {
        this._paginator.length = this._pageCount;
      } */

    const pageChange: Observable<PageEvent | null> = this._paginator ?
      merge<PageEvent>(this._paginator.page, this._paginator.initialized) :
      observableOf(null);

    const dataStream = this._data;
    // Watch for base data or filter changes to provide a filtered set of data.
    const filteredData = combineLatest(dataStream, this._filter)
      .pipe(map(([data]) => this._filterData(data)));
    // Watch for filtered data or sort changes to provide an ordered set of data.
    const orderedData = combineLatest(filteredData, sortChange)
      .pipe(map(([data]) => this._orderData(data)));
    // Watch for ordered data or page changes to provide a paged set of data.

    
    
    const paginatedData = combineLatest(orderedData, pageChange)
      .pipe(map(([data]) => this._pageData(data)));
    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
    this.pageCount.next(this._pageCount);
    
    //console.log("table subscription changed", this._pageCount);
  }

  _pageData(data: T[]): T[] {
    if (!this.paginator) { return data; }



    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice().splice(startIndex, this.paginator.pageSize);
  }

  _orderData(data: T[]): T[] {
    // If there is no active sort or direction, return the data without trying to sort.
    if (!this.sort) { return data; }

    return this.sortData(data.slice(), this.sort);
  }

  sortData: ((data: T[], sort: MatSort) => T[]) = (data: T[], sort: MatSort): T[] => {
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction == '') { return data; }

    return data.sort((a, b) => {
      let valueA = this.sortingDataAccessor(a, active);
      let valueB = this.sortingDataAccessor(b, active);

      // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
      // one value exists while the other doesn't. In this case, existing value should come first.
      // This avoids inconsistent results when comparing values to undefined/null.
      // If neither value exists, return 0 (equal).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (direction == 'asc' ? 1 : -1);
    });
  }

  sortingDataAccessor: ((data: T, sortHeaderId: string) => string | number) =
    (data: T, sortHeaderId: string): string | number => {
      const value: any = data[sortHeaderId];
      return _isNumberValue(value) ? Number(value) : value;
    }

  _filterData(data: T[]) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
      !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));

/* if(this.filteredData.length > 0 ) {
  this.pageCount.next(this.filteredData.length);
} else if(this._pageCount === 0) {
  this.pageCount.next(this._pageCount)
} */

    if (this.paginator) { this._updatePaginator(this.filteredData.length); } else {
      //console.log("filter haha=>", this.filter);
        if(this.filter) {
          //take length of  filtered data
          this.pageCount.next(this.filteredData.length);
        }  else {
          this.pageCount.next(this._pageCount);
        }
    }

    return this.filteredData;
  }

  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      if (!this.paginator) {
        return; 
      }

      //this.paginator.length = filteredDataLength;
      this.pageCount.next(filteredDataLength);

      // If the page index is set beyond the page, reduce it to the last page.
      if (this.paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
        this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
      }
    });
  }

  filterPredicate: ((data: T, filter: string) => boolean) = (data: T, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    const accumulator = (currentTerm, key) => currentTerm + data[key];
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.indexOf(transformedFilter) != -1;
  }

  /* end of applying filters */

  constructor(dataList: any[], pageSize: number = 10) {
    this._data = new BehaviorSubject<T[]>(dataList);
    this._pageCount = pageSize;
    if(pageSize>0) {
      this.pageCount.next(pageSize);
    }
   // console.log("page count =>", pageSize);
    //this._data.next(dataList);
    this._updateChangeSubscription();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    //return this._data.asObservable();
    return this._renderData;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this._data.complete();
    this.loadingSubject.complete();
  }

  loadData(dataList, pageSize) {
    this.pageCount.next(pageSize);
    this._data.next(dataList);
    
    this._updateChangeSubscription();
  }


}
