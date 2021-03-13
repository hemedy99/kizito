import { IconTypeEnum, NavItem } from 'src/app/shared/models/nav-item.model';

export const AdministratorMenu: NavItem[] = [
  {
    displayName: 'Menu',
    iconName: 'menu',
    route: 'home',
    permissions: ['all']
  },
  {
    displayName: 'Dashboard',
    iconName: 'arrow_right',
    iconType: IconTypeEnum.FontIcon,
    route: 'administrator/dashboard',
    permissions: ['all']
  },
  {
    displayName: 'Users',
    iconName: 'arrow_right',
    iconType: IconTypeEnum.FontIcon,
    route: 'administrator/user-list',
    permissions: ['all']
  },

  

];
