import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { IconTypeEnum, NavItem } from '../../models/nav-item.model';
import { ApplicationState } from 'src/app/store';
import { selectRouterState } from 'src/app/core/router/router.selectors';
import { SidebarService } from '../../service/sidebar.service';
@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class SidebarNavComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  selectRouterDetails: Observable<any>;

  IconTypeEnum = IconTypeEnum;
  constructor(
    public sidebarService: SidebarService,
    public router: Router,
    public store: Store<ApplicationState>
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.selectRouterDetails = this.store.pipe(select(selectRouterState));
    /*      this.sidebarService.currentUrl.subscribe((url: string) => {
         if (this.item.route && url) {
            console.log(`Checking '/${this.item.route}' against '${url}'`);
            this.expanded = url.indexOf(`/${this.item.route}`) === 0;
            this.ariaExpanded = this.expanded;
            // console.log(`${this.item.route} is expanded: ${this.expanded}`);
          }
        }); */
    this.selectRouterDetails.subscribe((routerState: any) => {
      const url: any = routerState.state.url;
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      // this.sidebarService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
