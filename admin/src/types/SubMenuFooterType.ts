export type SubMenuFooterType = {
  id?: string | number;
  name: string;
  path: string;
  status: SubMenuStatusType;
  menuHeader: string | number;
};

export type SubMenuStatusType = 'active' | 'disabled';
