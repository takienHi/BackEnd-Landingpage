import http from '../utils/http-common';
import { SectionComponentType as IData } from '../types/SectionComponentType';

const _path = '/section_components/';

const getAllSectionComponents = async () => {
  return await http.get<Array<IData>>(_path + '?_sort=id&_order=asc');
};

const SectionComponentsApi = {
  getAllSectionComponents,
};

export default SectionComponentsApi;
