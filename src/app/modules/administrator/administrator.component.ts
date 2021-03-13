import { AdministratorMenu } from './routing/administrator-menu.menu';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/service/sidebar.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.loadNavitems(AdministratorMenu);
    this.sidebarService.setPageTitle("Administrator Module");
  }

}
