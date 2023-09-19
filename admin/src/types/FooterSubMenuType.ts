import { MenuType } from './MenuType';

export type FooterSubMenuType = {
  id?: string | number;
  name: string;
  path: string;
  status: FooterSubMenuStatusType;
  menu_footerId: string | number;
};

export type FooterSubMenuStatusType = 'active' | 'disabled';

export type FooterSubMenuWithParentType = {
  id?: string | number;
  name: string;
  path: string;
  status: FooterSubMenuStatusType;
  menu_footerId: string | number;

  menu_footer?: MenuType;
};
