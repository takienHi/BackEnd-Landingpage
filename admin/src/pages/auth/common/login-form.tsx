import { useState } from 'react';
import Textinput from 'src/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'src/components/ui/Checkbox';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    id: uuidv4(),
    name: 'dashcode',
    email: 'dashcode@gmail.com',
    password: 'dashcode',
  },
];

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is Required'),
    password: yup.string().required('Password is Required'),
  })
  .required();
const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all',
  });
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const user = users.find((user: any) => user.email === data.email && user.password === data.password);
    if (user) {
      //   dispatch(handleLogin(true));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      toast.error('Invalid credentials', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
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
          Forgot Password?{' '}
        </Link>
      </div>

      <button className='btn btn-dark block w-full text-center'>Sign in</button>
    </form>
  );
};

export default LoginForm;
