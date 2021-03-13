import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from '../shared/service/sidebar.service';
import { NavItem } from '../shared/models/nav-item.model';
import { MatSidenav } from '@angular/material/sidenav';
// import { Store, select } from '@ngrx/store';
// import { ApplicationState } from '../store';
// import { selectAppLoadingState } from '../store/app-loading/app-loading.selectors';
import { LoadingService } from '../shared/components/loading/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LoadingService]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  navItem$: Observable<NavItem[]>;
  appLoading$: Observable<boolean>;
  pageTitle$:Observable<string>;
  // username = 'Emilius Patrin Mfuruki';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public sidebarService: SidebarService,
// private store: Store<ApplicationState>
    private crd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    
    
  }

  

  ngAfterViewInit() {
    this.navItem$ = this.sidebarService.NavItems$;
    this.pageTitle$ = this.sidebarService.CurrentPageTitle$;
    this.crd.detectChanges();
  }

 
}
