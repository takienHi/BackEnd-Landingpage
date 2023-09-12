import Textinput from 'src/components/ui/Textinput';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';

import { MenuSchema, menuSchema } from 'src/schema/MenuSchema';
import { MenuType } from 'src/types/MenuType';
import { useEffect } from 'react';
import Switch from 'src/components/ui/Switch';

type FormData = Omit<MenuSchema, 'id'>;
const addMenuSchema = menuSchema.omit(['id']);

type FormAddMenu = {
  handleOnSubmit: (formValues: any) => boolean;
  currentMenuItem?: MenuType | null;
};
const FormAddMenu = ({ handleOnSubmit, currentMenuItem }: FormAddMenu) => {
  const {
    register: registerAdd,
    control: controlAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
    handleSubmit: handleAddSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(addMenuSchema),
    mode: 'onSubmit',
  });

  const {
    register: registerEdit,
    control: controlEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
    handleSubmit: handleEditSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(addMenuSchema),
    mode: 'onSubmit',
  });

  const onAddSubmit = (formValues: any) => {
    if (handleOnSubmit) {
      if (handleOnSubmit(formValues)) resetAdd();
    }
  };

  const onEditSubmit = (formValues: any) => {
    if (handleOnSubmit) {
      if (handleOnSubmit(formValues)) resetEdit();
    }
  };

  useEffect(() => {
    if (currentMenuItem) {
      let defaultValues: FormData = {
        name: currentMenuItem.name,
        path: currentMenuItem.path,
        status: currentMenuItem.status,
        hasChildren: currentMenuItem.hasChildren,
      };
      console.log(defaultValues);

      resetEdit({ ...defaultValues });
    } else {
      let defaultValues: FormData = { name: '', path: '', status: 'active', hasChildren: true };
      resetAdd({ ...defaultValues });
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {!currentMenuItem && (
        <form onSubmit={handleAddSubmit(onAddSubmit)} className='space-y-4 '>
          <Textinput
            name='name'
            label='Path Name'
            placeholder='Path Name'
            register={registerAdd}
            error={errorsAdd.name}
          />
          <Textinput
            name='path'
            label='Path link'
            placeholder='Path link'
            register={registerAdd}
            error={errorsAdd.path}
          />
          <div className={errorsAdd.status ? 'has-error' : ''}>
            <label className='form-label' htmlFor='status_s'>
              Status
            </label>
            <Controller
              name='status'
              control={controlAdd}
              render={({ field: { value, onBlur, onChange, ref } }) => (
                <Select
                  onBlur={onBlur}
                  value={menuOptions.filter((item: any) => {
                    console.log(value);

                    return item.value === value;
                  })}
                  onChange={(opt: any) => {
                    onChange(opt.value);
                  }}
                  ref={ref}
                  options={menuOptions}
                  styles={styles}
                  className='react-select'
                  classNamePrefix='select'
                  id='status_s'
                />
              )}
            />
            {errorsAdd.status && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsAdd.status?.message || ' '}</div>
            )}
          </div>
          <div className={errorsAdd.hasChildren ? 'has-error' : ''}>
            <label className='form-label' htmlFor='hasChildren_s'>
              Has submenu
            </label>
            <Controller
              name='hasChildren'
              control={controlAdd}
              render={({ field: { value, onBlur, onChange, ref } }) => (
                <Switch
                  label='Has submenu'
                  value={value || false}
                  onChange={() => onChange(!value)}
                  register={registerAdd}
                  id='hasChildren_s'
                />
              )}
            />
            {errorsAdd.hasChildren && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsAdd.hasChildren?.message || ' '}</div>
            )}
          </div>

          <div className='ltr:text-right rtl:text-left '>
            <button className='btn btn-dark  text-center'>Add</button>
          </div>
        </form>
      )}
      {currentMenuItem && (
        <form onSubmit={handleEditSubmit(onEditSubmit)} className='space-y-4 '>
          <Textinput
            name='name'
            label='Path Name'
            placeholder='Path Name'
            register={registerEdit}
            error={errorsEdit.name}
          />
          <Textinput
            name='path'
            label='Path link'
            placeholder='Path link'
            register={registerEdit}
            error={errorsEdit.path}
          />
          <div className={errorsEdit.status ? 'has-error' : ''}>
            <label className='form-label' htmlFor='status_s'>
              Status
            </label>
            <Controller
              name='status'
              control={controlEdit}
              render={({ field: { value, onBlur, onChange, ref } }) => (
                <Select
                  onBlur={onBlur}
                  value={menuOptions.filter((item: any) => {
                    console.log(value);

                    return item.value === value;
                  })}
                  onChange={(opt: any) => {
                    onChange(opt.value);
                  }}
                  ref={ref}
                  options={menuOptions}
                  styles={styles}
                  className='react-select'
                  classNamePrefix='select'
                  id='status_s'
                />
              )}
            />
            {errorsEdit.status && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsEdit.status?.message || ' '}</div>
            )}
          </div>
          <div className={errorsEdit.hasChildren ? 'has-error' : ''}>
            <label className='form-label' htmlFor='hasChildren_s'>
              Has submenu
            </label>
            <Controller
              name='hasChildren'
              control={controlEdit}
              render={({ field: { value, onChange } }) => (
                <Switch
                  label='Has submenu'
                  value={value || false}
                  onChange={() => onChange(!value)}
                  register={registerEdit}
                  id='hasChildren_s'
                />
              )}
            />
            {errorsEdit.hasChildren && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsEdit.hasChildren?.message || ' '}</div>
            )}
          </div>

          <div className='ltr:text-right rtl:text-left '>
            <button className='btn btn-dark  text-center'>Save</button>
          </div>
        </form>
      )}
    </>
  );
};

const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, opacity: '0.5' } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, color: '#626262', paddingRight: 6 } : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '14px',
  }),
};

const menuOptions = [
  {
    value: 'active',
    label: 'active',
  },
  {
    value: 'disabled',
    label: 'disabled',
  },
];
const options = [
  {
    value: 'team',
    label: 'team',
  },
  {
    value: 'low',
    label: 'low',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'high',
    label: 'high',
  },
  {
    value: 'update',
    label: 'update',
  },
];
export default FormAddMenu;
