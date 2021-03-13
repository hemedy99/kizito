export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  iconType?: IconTypeEnum;
  route?: string;
  permissions?: string[];
  isActions?: boolean;
  children?: NavItem[];
}

export enum IconTypeEnum {
  MaterialIcon,
  FontIcon
}
