import { useState, useMemo, useEffect } from 'react';
import Modal from 'src/components/ui/Modal';
import { MenuType } from 'src/types/MenuType';
import TableAction from 'src/components/partials/Table/TableAction';
import svgRabit from 'src/assets/images/svg/rabit.svg';
import Toastify from 'src/components/ui/Toastify';
import { MenuSchema } from 'src/schema/MenuSchema';
import Table from 'src/components/partials/Table/Table';
import FormAddMenu from 'src/pages/mainLayout/header-manager/components/MenuManager/FormAddMenu';
import MenuFooterApi from 'src/apis/menu_footer.api';

const MenuFooterManager = () => {
  const [menuFooter, setMenu] = useState<MenuType[]>([]);

  const [currentMenuItem, setCurrentMenuItem] = useState<MenuType | null>(null);
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
              handleMenuViewOpen={() => handleMenuViewOpen(row.row?.original)}
              handleMenuEditOpen={() => handleMenuEditOpen(row.row?.original)}
              handleMenuDeleteOpen={() => handleMenuDeleteOpen(row.row?.original)}
            />
          );
        },
      },
    ],
    []
  );

  const getMenuWithMenu = () => {
    MenuFooterApi.getAll()
      .then((response: any) => {
        setMenu([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMenuWithMenu();
  }, []);

  const handleAddSubmit = (formValues: any) => {
    const data: Omit<MenuSchema, 'id'> = {
      name: formValues.name,
      path: formValues.path,
      status: formValues.status,
      hasChildren: formValues.hasChildren,
    };
    MenuFooterApi.create(data)
      .then((_response: any) => {
        closeAddModal();
        Toastify.toastSuccess('The new menu item has been add');

        getMenuWithMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleEditSubmit = (formValues: any) => {
    const id = currentMenuItem ? currentMenuItem.id : null;
    const data: Omit<MenuSchema, 'id'> = {
      name: formValues.name,
      path: formValues.path,
      status: formValues.status,
      hasChildren: formValues.hasChildren,
    };
    MenuFooterApi.update(id, data)
      .then((_response: any) => {
        console.log(_response);
        closeEditModal();
        Toastify.toastSuccess('Edit submenu item successfully');
        setCurrentMenuItem(null);
        getMenuWithMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleDeleteSubmit = () => {
    const id = currentMenuItem ? currentMenuItem.id : null;
    MenuFooterApi.remove(id)
      .then((_response: any) => {
        console.log(_response);
        closeDeleteModal();
        Toastify.toastWarning('Warning menu item successfully');
        setCurrentMenuItem(null);
        getMenuWithMenu();
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
          title={`Add new footer menu`}
          label='menu item'
          labelClass='btn-dark btn-sm'
          isOpen={addModal}
          closeModal={closeAddModal}
          openModal={openAddModal}
        >
          <FormAddMenu handleOnSubmit={(formValues) => handleAddSubmit(formValues)} />
        </Modal>
        <Modal
          title='View footer menu item'
          labelClass='btn-dark btn-sm'
          isOpen={viewModal}
          openModal={openViewModal}
          closeModal={closeViewModal}
        >
          {currentMenuItem && (
            <>
              <main className={'card-body mt-5'}>
                <div className='text-sm'>
                  <ul className='list space-y-8'>
                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          Display Name
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentMenuItem.name}</div>
                      </div>
                    </li>

                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          PATH
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentMenuItem.path}</div>
                      </div>
                    </li>

                    <li className='flex space-x-3 rtl:space-x-reverse'>
                      <div className='flex-1'>
                        <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                          Status
                        </div>
                        <div className='text-base text-slate-600 dark:text-slate-50'>{currentMenuItem.status}</div>
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
          label='Edit footer menu item'
          labelClass='btn-dark btn-sm'
          isOpen={editModal}
          closeModal={closeEditModal}
          openModal={openEditModal}
        >
          <FormAddMenu
            handleOnSubmit={(formValues) => handleEditSubmit(formValues)}
            currentMenuItem={currentMenuItem}
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
  const handleMenuViewOpen = (item: MenuType) => {
    setCurrentMenuItem(item);
    openViewModal();
  };

  const handleMenuEditOpen = (item: MenuType) => {
    setCurrentMenuItem(item);
    openEditModal();
  };

  const handleMenuDeleteOpen = (item: MenuType) => {
    setCurrentMenuItem(item);
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
        <Table title='Footer Menu' dataTable={menuFooter} columnsTable={columns} handleTableButton={openAddModal} />
      </div>
      <ModalCrud />
    </>
  );
};

export default MenuFooterManager;
