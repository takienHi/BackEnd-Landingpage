import http from '../utils/http-common';
import { SubMenuType as IData, SubMenuWithParentType as IDataWithParent } from '../types/SubMenuType';

const _path = '/sub_menu/';

const getAll = async (filterString: string) => {
  if (filterString) {
    return await http.get<Array<IData>>(_path + '?' + filterString + '_sort=status,id&_order=desc,desc');
  }
  return await http.get<Array<IData>>(_path + '?_sort=status,id&_order=desc,desc');
};

const getAllWithParent = async (filterString?: string) => {
  if (filterString) {
    return await http.get<Array<IData>>(_path + '?' + filterString + '_sort=id&_order=asc');
  }
  return await http.get<Array<IDataWithParent>>(_path + '?_expand=menu&_sort=id&_order=asc');
};

const getById = (id: string) => {
  return http.get<IData>(_path + `${id}`);
};

const getByUserId = (id: any, filterString: string) => {
  if (filterString) {
    return http.get<Array<IData>>(_path + `?${filterString}userId=${id}&_sort=status,id&_order=desc,desc`);
  }
  return http.get<IData>(_path + `?userId=${id}&_sort=status,id&_order=desc,desc`);
};

const create = (data: IData) => {
  return http.post<IData>(_path, data);
};

const update = (id: any, data: IData) => {
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
  getAllWithParent,
  getByUserId,
  getById,
  create,
  update,
  update2,
  remove,
};

export default SubMenuApi;
