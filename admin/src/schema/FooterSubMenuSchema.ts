import { SubMenuStatusType } from 'src/types/SubMenuType';
import * as yup from 'yup';

export const subMenuFooterSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required().min(6).max(200),
  path: yup.string().required().min(6).max(200),
  status: yup.mixed<SubMenuStatusType>().oneOf(['active', 'disabled']).required(),
  menu_footerId: yup.number().required(),
});

export type SubMenuFooterSchema = yup.InferType<typeof subMenuFooterSchema>;
