import http from 'src/utils/http-common';
import { MenuType as IData } from '../types/MenuType';

const _path = '/menus/';
type IDataNoId = Omit<IData, 'id'>;

const getAll = async () => {
  return await http.get<Array<IData>>(_path + '?_sort=id&_order=asc');
};

const getById = (id: string) => {
  return http.get<IData>(_path + `${id}`);
};

const create = (data: IDataNoId) => {
  return http.post<IDataNoId>(_path, data);
};

const update = (id: any, data: IDataNoId) => {
  return http.patch<any>(_path + `${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(_path + `${id}`);
};

const MenuApi = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default MenuApi;
