import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NavItem } from '../models/nav-item.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidenav: any;
  private NavItemsSubject:BehaviorSubject<NavItem[]>  = new BehaviorSubject<NavItem[]>([]);
  public NavItems$:Observable<NavItem[]> = this.NavItemsSubject.asObservable();
  public currentUrl = new BehaviorSubject<string>(undefined);
  private CurrentPageSubject:BehaviorSubject<string> = new BehaviorSubject<string>("Page Title");
  public  CurrentPageTitle$ = this.CurrentPageSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }
  public closeNav() {
    this.sidenav.close();
  }

  public openNav() {
    this.sidenav.open();
  }

  public loadNavitems(items: NavItem[]){
    this.NavItemsSubject.next(items);
  }

  public setPageTitle(title:string) {
    this.CurrentPageSubject.next(title);
  }
}
