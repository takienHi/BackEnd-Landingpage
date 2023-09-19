import { LayoutType } from './LayoutType';
import { SectionComponentType } from './SectionComponentType';

export type LayoutSectionComponentType = {
  id?: string | number;
  ordinal_number: string | number;
  layoutId: string | number;
  section_componentId: string | number;
};

export type LayoutSectionComponentExpandType = {
  id?: string | number;
  ordinal_number: string | number;
  layoutId: string | number;
  section_componentId: string | number;

  layout?: LayoutType;
  section_component?: SectionComponentType;
};
