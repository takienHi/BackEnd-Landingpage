import { statusMenuOptions, statusMenuType } from 'src/types/MenuType';
import * as yup from 'yup';

export const menuSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required().min(6).max(200),
  path: yup.string().required().min(6).max(200),
  status: yup.mixed<statusMenuType>().oneOf(['active', 'disabled']).required(),
  hasChildren: yup.boolean().required(),
});

export type MenuSchema = yup.InferType<typeof menuSchema>;
