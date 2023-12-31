import { useState, useMemo, useEffect } from 'react';
import SubMenuApi from 'src/apis/sub_menu.api';
import Modal from 'src/components/ui/Modal';
import { SubMenuType, SubMenuWithParentType } from 'src/types/SubMenuType';
import TableAction from 'src/components/partials/Table/TableAction';
import svgRabit from 'src/assets/images/svg/rabit.svg';
import FormSubMenu from './FormSubMenu';
import Toastify from 'src/components/ui/Toastify';
import { SubMenuSchema } from 'src/schema/SubMenuSchema';
import Table, { SelectColumnFilter } from 'src/components/partials/Table/Table';
const SubMenuManager = () => {
  const [subMenu, setSubMenu] = useState<SubMenuWithParentType[]>([]);

  const [currentSubMenuItem, setCurrentSubMenuItem] = useState<SubMenuWithParentType | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns: any[] = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'row',
        filterable: false,
        Cell: (row: any) => {
          return <span>{row.row.index + 1}</span>;
        },
        disableGlobalFilter: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (row: any) => {
          return <span>{row?.cell?.value}</span>;
        },
      },
      {
        Header: 'Path',
        accessor: 'path',
        Cell: (row: any) => {
          return <span>{row?.cell?.value}</span>;
        },
      },
      {
        Header: 'menu parent',
        accessor: 'menu.name',
        Cell: (row: any) => {
          return <span>{row?.cell?.value}</span>;
        },
        className: 'right',
        Filter: SelectColumnFilter, // new
        filter: 'includes',
        disableGlobalFilter: true,
      },
      {
        Header: 'status',
        accessor: 'status',
        disableGlobalFilter: true,

        Cell: (row: any) => {
          return (
            <span className='block w-full'>
              <span
                className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === 'active' ? 'text-success-500 bg-success-500' : ''
                } 
              ${row?.cell?.value === 'disabled' ? 'text-danger-500 bg-danger-500' : ''}
              `}
              >
                {row?.cell?.value}
              </span>
            </span>
          );
        },
      },
      {
        Header: 'action',
        accessor: 'action',
        disableGlobalFilter: true,
        disableSortBy: true,

        Cell: (row: any) => {
          return (
            <TableAction
              handleMenuViewOpen={() => handleSubMenuViewOpen(row.row?.original)}
              handleMenuEditOpen={() => handleSubMenuEditOpen(row.row?.original)}
              handleMenuDeleteOpen={() => handleSubMenuDeleteOpen(row.row?.original)}
            />
          );
        },
      },
    ],
    []
  );

  const getSubMenuWithMenu = () => {
    SubMenuApi.getAllWithParent()
      .then((response: any) => {
        setSubMenu([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSubMenuWithMenu();
  }, []);

  const handleAddSubmit = (formValues: any) => {
    const data: Omit<SubMenuSchema, 'id'> = {
      name: formValues.name,
      path: formValues.path,
      status: formValues.status,
      menuId: formValues.menuId,
    };
    SubMenuApi.create(data)
      .then((_response: any) => {
        closeAddModal();
        Toastify.toastSuccess('The new menu item has been add');

        getSubMenuWithMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleEditSubmit = (formValues: any) => {
    const id = currentSubMenuItem ? currentSubMenuItem.id : null;
    const data: Omit<SubMenuSchema, 'id'> = {
      name: formValues.name,
      path: formValues.path,
      status: formValues.status,
      menuId: formValues.menuId,
    };
    SubMenuApi.update(id, data)
      .then((_response: any) => {
        console.log(_response);
        closeEditModal();
        Toastify.toastSuccess('Edit submenu item successfully');
        setCurrentSubMenuItem(null);
        getSubMenuWithMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleDeleteSubmit = () => {
    const id = currentSubMenuItem ? currentSubMenuItem.id : null;
    SubMenuApi.remove(id)
      .then((_response: any) => {
        console.log(_response);
        closeDeleteModal();
        Toastify.toastWarning('Warning menu item successfully');
        setCurrentSubMenuItem(null);
        getSubMenuWithMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const ModalCrud = () => {
    return (
      <div>
        <Modal
          title={`Add new sub menu`}
          label='menu item'
          labelClass='btn-dark btn-sm'
          isOpen={addModal}
          closeModal={closeAddModal}
          openModal={openAddModal}
        >
          <FormSubMenu handleOnSubmit={(formValues) => handleAddSubmit(formValues)} />
        </Modal>
        <Modal
          title='View sub menu item'
          labelClass='btn-dark btn-sm'
          isOpen={viewModal}
          openModal={openViewModal}
          closeModal={closeViewModal}
        >
          {currentSubMenuItem && (
            <>
              <main className={'card-body mt-5'}>
                <div className='text-sm'>
                  <ul className='list space-y-8'>
                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          Display Name
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentSubMenuItem.name}</div>
                      </div>
                    </li>

                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          PATH
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentSubMenuItem.path}</div>
                      </div>
                    </li>

                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          Status
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentSubMenuItem.status}</div>
                      </div>
                    </li>
                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          Menu Parent
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>
                          {currentSubMenuItem.menu?.name}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='mt-4 space-x-4 rtl:space-x-reverse'></div>
              </main>
            </>
          )}
        </Modal>
        <Modal
          title={`Edit `}
          label='Edit sub menu item'
          labelClass='btn-dark btn-sm'
          isOpen={editModal}
          closeModal={closeEditModal}
          openModal={openEditModal}
        >
          <FormSubMenu
            handleOnSubmit={(formValues) => handleEditSubmit(formValues)}
            currentMenuItem={currentSubMenuItem}
          />
        </Modal>
        <Modal
          title={`Delete `}
          label='Delete item'
          labelClass='btn-dark btn-sm'
          isOpen={deleteModal}
          closeModal={closeDeleteModal}
          openModal={openDeleteModal}
        >
          <div className='grid pt-2'>
            <div className={` bg-warning-500 mb-10 mt-7 p-4 relative text-center rounded-2xl text-white`}>
              <img src={svgRabit} alt='' className='mx-auto relative -mt-[73px]' />
              <div className='max-w-[160px] mx-auto mt-6'>
                <div className='widget-title'>Delete Menu Item</div>
                <div className='text-xs font-normal'>You definitely want to delete the menu item</div>
              </div>
              <div className='mt-6'>
                <button
                  onClick={handleDeleteSubmit}
                  className='btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  /* #region Modal Function */
  const handleSubMenuViewOpen = (item: SubMenuType) => {
    setCurrentSubMenuItem(item);
    openViewModal();
  };

  const handleSubMenuEditOpen = (item: SubMenuType) => {
    setCurrentSubMenuItem(item);
    openEditModal();
  };

  const handleSubMenuDeleteOpen = (item: SubMenuType) => {
    setCurrentSubMenuItem(item);
    openDeleteModal();
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const openViewModal = () => {
    setViewModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  /* #endregion */

  return (
    <>
      <div className='lg:col-span-12 col-span-12'>
        <Table title='Sub Menu' dataTable={subMenu} columnsTable={columns} handleTableButton={openAddModal} />
      </div>
      <ModalCrud />
    </>
  );
};

export default SubMenuManager;
