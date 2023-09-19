import { useContext, useState } from 'react';
import Textinput from 'src/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'src/components/ui/Checkbox';
import { Link } from 'react-router-dom';
import { LoginSchema, loginSchema } from 'src/schema/AuthSchema';
import AuthApi from 'src/apis/auth.api';
import { setProfileToLS } from 'src/utils/auth';
import paths from 'src/constant/paths';
import { AppContext } from 'src/contexts/app.context';
import Toastify from 'src/components/ui/Toastify';

type FormData = LoginSchema;

const LoginForm = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(loginSchema),
    //
    mode: 'onSubmit',
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await AuthApi.login(data)
      .then((res) => {
        console.log(res);

        if (res) {
          setIsAuthenticated(true);
          setProfile(res);
          setProfileToLS(res);
          Toastify.toastSuccess('Login Successfully');

          navigate('../' + paths.dashboard.link, { replace: true });
        } else {
          Toastify.toastError('Your email or password is incorrect');
        }
        return res;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
      <Textinput
        name='email'
        label='email'
        type='email'
        register={register}
        error={errors.email}
        className='h-[48px]'
      />
      <Textinput
        name='password'
        label='passwrod'
        type='password'
        register={register}
        error={errors.password}
        className='h-[48px]'
      />
      <div className='flex justify-between'>
        <Checkbox value={checked} onChange={() => setChecked(!checked)} label='Keep me signed in' />
        <Link to='/forgot-password' className='text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium'>
          Forgot Password?
        </Link>
      </div>

      <button className='btn btn-dark block w-full text-center'>Sign in</button>
    </form>
  );
};

export default LoginForm;
