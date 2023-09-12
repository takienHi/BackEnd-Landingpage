export type MenuType = {
  id: string | number;
  name: string;
  path: string;
  status: statusMenuType;
  hasChildren: boolean;
};

export type statusMenuType = 'active' | 'disabled';

export const statusMenuOptions: statusMenuType[] = ['active', 'disabled'];
