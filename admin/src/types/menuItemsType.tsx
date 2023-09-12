type menuItemsType1 = {
  title: string;
  isHeadr: boolean;
};

type menuItemsType2 = {
  title: string;
  icon?: string;
  link?: string;
  isHide?: boolean;
};

type menuItemsType3 = {
  title: string;
  isHide?: boolean;
  icon: string;
  child?: menuItemChildType[];
};

export type menuItemsType = (menuItemsType1 | menuItemsType2 | menuItemsType3)[];

type menuItemChildType = {
  childtitle: string;
  childlink: string;
};
