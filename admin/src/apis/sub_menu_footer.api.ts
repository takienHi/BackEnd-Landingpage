import http from '../utils/http-common';
import {
  FooterSubMenuType as IFooterSubMenuData,
  FooterSubMenuWithParentType as IDataWithParent,
} from '../types/FooterSubMenuType';

const _path = '/sub_menu_footer/';

const getAll = async (filterString: string) => {
  if (filterString) {
    return await http.get<Array<IFooterSubMenuData>>(_path + '?' + filterString + '_sort=status,id&_order=desc,desc');
  }
  return await http.get<Array<IFooterSubMenuData>>(_path + '?_sort=status,id&_order=desc,desc');
};

const getById = (id: string) => {
  return http.get<IFooterSubMenuData>(_path + `${id}`);
};

const getAllWithParent = async (filterString?: string) => {
  if (filterString) {
    return await http.get<Array<IDataWithParent>>(_path + '?' + filterString + '_sort=id&_order=asc');
  }
  return await http.get<Array<IDataWithParent>>(_path + '?_expand=menu_footer&_sort=id&_order=asc');
};

const getByUserId = (id: any, filterString: string) => {
  if (filterString) {
    return http.get<Array<IFooterSubMenuData>>(_path + `?${filterString}userId=${id}&_sort=status,id&_order=desc,desc`);
  }
  return http.get<IFooterSubMenuData>(_path + `?userId=${id}&_sort=status,id&_order=desc,desc`);
};

const create = (data: IFooterSubMenuData) => {
  return http.post<IFooterSubMenuData>(_path, data);
};

const update = (id: any, data: IFooterSubMenuData) => {
  return http.put<any>(_path + `${id}`, data);
};

const update2 = (id: any, data: object) => {
  return http.patch<any>(_path + `${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(_path + `${id}`);
};

const FooterSubMenuFooterApi = {
  getAll,
  getAllWithParent,
  getByUserId,
  getById,
  create,
  update,
  update2,
  remove,
};

export default FooterSubMenuFooterApi;
