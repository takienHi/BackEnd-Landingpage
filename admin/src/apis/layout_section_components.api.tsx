import http from '../utils/http-common';
import { LayoutSectionComponentExpandType as IDataWithParent } from '../types/LayoutSectionComponentType';

const _path = '/layout_section_components/';

const getMainLayoutSectionComponents = async () => {
  return await http.get<Array<IDataWithParent>>(
    _path + '?_expand=layout&_expand=section_component&_sort=ordinal_number&_order=asc&layoutId=1'
  );
};

const MainLayoutSectionComponentsApi = {
  getMainLayoutSectionComponents,
};

export default MainLayoutSectionComponentsApi;
