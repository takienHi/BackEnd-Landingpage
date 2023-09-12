export type MenuFooterType = {
  id?: string | number;
  name: string;
  path: string;
  status: statusType;
  hasChildren: boolean;
};

export type statusType = 'active' | 'disabled';
