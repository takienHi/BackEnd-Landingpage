import { LoginSchema } from 'src/schema/AuthSchema';
import http from 'src/utils/http-common';

const login = async (formValues: LoginSchema) => {
  let result = null;
  await http
    .get(`/users/?email=${formValues.email}&password=${formValues.password}`)
    .then((response: any) => {
      console.log(response.data[0]);

      if (response.data[0]) {
        result = response.data[0];
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
  return result;
};

const AuthApi = {
  login,
};
export default AuthApi;
