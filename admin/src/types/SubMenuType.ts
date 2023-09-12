import { MenuType } from './MenuType';

export type SubMenuType = {
  id?: string | number;
  name: string;
  path: string;
  status: SubMenuStatusType;
  menuId: string | number;
};

export type SubMenuStatusType = 'active' | 'disabled';

export type SubMenuWithParentType = {
  id?: string | number;
  name: string;
  path: string;
  status: SubMenuStatusType;
  menuId: string | number;

  menu?: MenuType;
};
