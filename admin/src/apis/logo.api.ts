import http from '../utils/http-common';
import { LogoType as DataType } from '../types/LogoType';

const getAll = async () => {
  return await http.get<DataType>('/logo');
};

const getById = (id: string) => {
  return http.get<DataType>(`/logo/${id}`);
};

const update = (data: object) => {
  return http.patch<any>(`/logo/1`, data);
};

const LogoApi = {
  getAll,
  getById,
  update,
};

export default LogoApi;
