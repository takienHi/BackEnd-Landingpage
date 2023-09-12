import http from '../utils/http-common';
import { SubMenuType as ISubMenuData } from '../types/SubMenuType';

const _path = '/sub_menu_footer/';

const getAll = async (filterString: string) => {
  if (filterString) {
    return await http.get<Array<ISubMenuData>>(_path + '?' + filterString + '_sort=status,id&_order=desc,desc');
  }
  return await http.get<Array<ISubMenuData>>(_path + '?_sort=status,id&_order=desc,desc');
};

const getById = (id: string) => {
  return http.get<ISubMenuData>(_path + `${id}`);
};

const getByUserId = (id: any, filterString: string) => {
  if (filterString) {
    return http.get<Array<ISubMenuData>>(_path + `?${filterString}userId=${id}&_sort=status,id&_order=desc,desc`);
  }
  return http.get<ISubMenuData>(_path + `?userId=${id}&_sort=status,id&_order=desc,desc`);
};

const create = (data: ISubMenuData) => {
  return http.post<ISubMenuData>(_path, data);
};

const update = (id: any, data: ISubMenuData) => {
  return http.put<any>(_path + `${id}`, data);
};

const update2 = (id: any, data: object) => {
  return http.patch<any>(_path + `${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(_path + `${id}`);
};

const SubMenuApi = {
  getAll,
  getByUserId,
  getById,
  create,
  update,
  update2,
  remove,
};

export default SubMenuApi;
