import http from 'src/utils/http-common';
import { MenuFooterType as IData } from '../types/MenuFooterType';

const _path = '/menu_footers/';

const getAll = async () => {
  return await http.get<Array<IData>>(_path + '?_sort=status,id&_order=asc,asc');
};

const getById = (id: string) => {
  return http.get<IData>(_path + `${id}`);
};

const create = (data: IData) => {
  return http.post<IData>(_path + '', data);
};

const update = (id: any, data: object) => {
  return http.patch<any>(_path + `${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(_path + `${id}`);
};

const MenuFooterApi = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default MenuFooterApi;
