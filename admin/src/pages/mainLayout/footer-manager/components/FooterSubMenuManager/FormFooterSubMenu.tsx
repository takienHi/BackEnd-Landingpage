import Textinput from 'src/components/ui/Textinput';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';

import { SubMenuFooterSchema, subMenuFooterSchema } from 'src/schema/FooterSubMenuSchema';
import { FooterSubMenuType } from 'src/types/FooterSubMenuType';
import { useEffect, useState } from 'react';
import MenuApi from 'src/apis/menu.api';
import { MenuType } from 'src/types/MenuType';

type FormData = Omit<SubMenuFooterSchema, 'id'>;
const addSubMenuSchema = subMenuFooterSchema.omit(['id']);

type FormFooterSubMenuProps = {
  handleOnSubmit: (formValues: any) => boolean;
  currentMenuItem?: FooterSubMenuType | null;
};

const FormFooterSubMenu = ({ handleOnSubmit, currentMenuItem }: FormFooterSubMenuProps) => {
  const [menuParentOptions, setMenuParentOptions] = useState<MenuType[]>([]);

  const getMenu = () => {
    MenuApi.getAll()
      .then((response: any) => {
        let partialStudentDetails = response.data.map(({ id, name }: any) => ({ value: id, label: name }));
        setMenuParentOptions(partialStudentDetails);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const {
    register: registerAdd,
    control: controlAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
    handleSubmit: handleAddSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(addSubMenuSchema),
    mode: 'onSubmit',
  });

  const {
    register: registerEdit,
    control: controlEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
    handleSubmit: handleEditSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(addSubMenuSchema),
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
        menu_footerId: Number(currentMenuItem.menu_footerId),
      };
      resetEdit({ ...defaultValues });
    } else {
      let defaultValues: FormData = { name: '', path: '', status: 'active', menu_footerId: 1 };
      resetAdd({ ...defaultValues });
    }
  }, []);

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      {!currentMenuItem && (
        <form onSubmit={handleAddSubmit(onAddSubmit)} className='space-y-4 '>
          <div className={errorsAdd.menu_footerId ? 'has-error' : ''}>
            <label className='form-label' htmlFor='menuId_s'>
              Menu Parent
            </label>
            <Controller
              name='menu_footerId'
              control={controlAdd}
              render={({ field: { value, onBlur, onChange, ref } }) => (
                <Select
                  onBlur={onBlur}
                  value={menuParentOptions.filter((item: any) => {
                    return item.value === value;
                  })}
                  onChange={(opt: any) => {
                    onChange(opt.value);
                  }}
                  ref={ref}
                  options={menuParentOptions}
                  styles={styles}
                  className='react-select'
                  classNamePrefix='select'
                  id='menuId_s'
                />
              )}
            />
            {errorsAdd.menu_footerId && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsAdd.menu_footerId?.message || ' '}</div>
            )}
          </div>
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

          <div className='ltr:text-right rtl:text-left mt-5'>
            <button className='btn btn-dark  text-center'>Add</button>
          </div>
        </form>
      )}
      {currentMenuItem && (
        <form onSubmit={handleEditSubmit(onEditSubmit)} className='space-y-4 '>
          <div className={errorsEdit.menu_footerId ? 'has-error' : ''}>
            <label className='form-label' htmlFor='menuId_s'>
              Menu Parent
            </label>
            <Controller
              name='menu_footerId'
              control={controlEdit}
              render={({ field: { value, onBlur, onChange, ref } }) => (
                <Select
                  onBlur={onBlur}
                  value={menuParentOptions.filter((item: any) => {
                    return item.value === value;
                  })}
                  onChange={(opt: any) => {
                    onChange(opt.value);
                  }}
                  ref={ref}
                  options={menuParentOptions}
                  styles={styles}
                  className='react-select'
                  classNamePrefix='select'
                  id='menuId_s'
                />
              )}
            />
            {errorsEdit.menu_footerId && (
              <div className=' mt-2  text-danger-500 block text-sm'>{errorsEdit.menu_footerId?.message || ' '}</div>
            )}
          </div>
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

export default FormFooterSubMenu;
