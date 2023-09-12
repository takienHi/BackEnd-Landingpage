import { useEffect, useMemo, useState } from 'react';
import MenuApi from 'src/apis/menu.api';
import Table, { SelectColumnFilter } from 'src/components/partials/Table';
import TableAction from 'src/components/partials/Table/TableAction';
import Modal from 'src/components/ui/Modal';
import { MenuType } from 'src/types/MenuType';
import FormAddMenu from './FormAddMenu';
import { MenuSchema } from 'src/schema/MenuSchema';
import Toastify from 'src/components/ui/Toastify';
import ViewMenuModal from './ViewMenuModal';
import Card from 'src/components/ui/Card';
import svgRabit from 'src/assets/images/svg/rabit.svg';
import Icon from 'src/components/ui/Icon';
import ViewMenu from './ViewMenu';

const MenuManager = () => {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuType | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const getMenu = () => {
    MenuApi.getAll()
      .then((response: any) => {
        setMenu([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleAddSubmit = (formValues: any) => {
    const data: Omit<MenuSchema, 'id'> = {
      name: formValues.name,
      path: formValues.path,
      status: formValues.status,
      hasChildren: formValues.hasChildren,
    };
    MenuApi.create(data)
      .then((_response: any) => {
        closeAddModal();
        Toastify.toastSuccess('The new menu item has been add');

        getMenu();
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
    MenuApi.update(id, data)
      .then((_response: any) => {
        console.log(_response);
        closeEditModal();
        Toastify.toastSuccess('Edit menu item successfully');
        setCurrentMenuItem(null);
        getMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleDeleteSubmit = () => {
    const id = currentMenuItem ? currentMenuItem.id : null;
    MenuApi.remove(id)
      .then((_response: any) => {
        console.log(_response);
        closeDeleteModal();
        Toastify.toastWarning('Warning menu item successfully');
        setCurrentMenuItem(null);
        getMenu();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    return false;
  };

  const handleMenuViewOpen = (menuItem: MenuType) => {
    setCurrentMenuItem(menuItem);
    openViewModal();
  };

  const handleMenuEditOpen = (menuItem: MenuType) => {
    setCurrentMenuItem(menuItem);
    openEditModal();
  };

  const handleMenuDeleteOpen = (menuItem: MenuType) => {
    setCurrentMenuItem(menuItem);
    openDeleteModal();
  };
  const columns_menu_header = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'row',
        disableGlobalFilter: true,
        Cell: (row: any) => {
          return <span>{row.row.index + 1}</span>;
        },
      },
      // {
      //   Header: 'Id',
      //   accessor: 'id',
      //   disableGlobalFilter: true,
      //   Cell: (row: any) => {
      //     return <span>{row?.cell?.value}</span>;
      //   },
      // },
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
              handleMenuViewOpen={() => handleMenuViewOpen(row.row.original)}
              handleMenuEditOpen={() => handleMenuEditOpen(row.row.original)}
              handleMenuDeleteOpen={() => handleMenuDeleteOpen(row.row.original)}
            />
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    getMenu();
  }, []);

  const Index = () => {
    return (
      <>
        <div className='lg:col-span-12 col-span-12'>
          <Table
            title='Menu header'
            dataTable={menu}
            columnsTable={columns_menu_header}
            isSelection={false}
            handleTableButton={openAddModal}
          />
        </div>
        <Modal
          title={`Add new menu`}
          label='menu item'
          labelClass='btn-dark btn-sm'
          isOpen={addModal}
          closeModal={closeAddModal}
          openModal={openAddModal}
        >
          <FormAddMenu handleOnSubmit={(formValues) => handleAddSubmit(formValues)} />
        </Modal>
        <Modal
          title={`Edit `}
          label='Edit item'
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
        <ViewMenuModal
          title='View menu item'
          isOpen={viewModal}
          openModal={openViewModal}
          closeModal={closeViewModal}
          children={
            <>
              <ViewMenu currentMenuItem={currentMenuItem} />
            </>
          }
        />
      </>
    );
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
  };

  const openViewModal = () => {
    setViewModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  return <Index />;
};

export default MenuManager;
