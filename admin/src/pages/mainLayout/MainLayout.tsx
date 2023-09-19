import { useState, useMemo, useEffect } from 'react';
import MainLayoutSectionComponentsApi from 'src/apis/layout_section_components.api';
import Table, { SelectColumnFilter } from 'src/components/partials/Table/Table';
import TableAction from 'src/components/partials/Table/TableAction';
import Modal from 'src/components/ui/Modal';
import { LayoutSectionComponentExpandType } from 'src/types/LayoutSectionComponentType';
import { SubMenuType, SubMenuWithParentType } from 'src/types/SubMenuType';
import svgRabit from 'src/assets/images/svg/rabit.svg';
import Toastify from 'src/components/ui/Toastify';
import { SectionComponentType } from 'src/types/SectionComponentType';
import SectionComponentsApi from 'src/apis/section_components.api';
import OptionsSelect from 'src/components/ui/Options';

const MainLayout = () => {
  const [layoutSectionComponent, setLayoutSectionComponent] = useState<LayoutSectionComponentExpandType[]>([]);
  const [sectionComponents, setSectionComponents] = useState<SectionComponentType[]>([]);
  const [currentSubMenuItem, setCurrentSubMenuItem] = useState<SubMenuWithParentType | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns: any[] = useMemo(
    () => [
      {
        Header: 'Ordinal Number',
        accessor: 'ordinal_number',
        Cell: (row: any) => {
          return <span>{row?.cell?.value}</span>;
        },
      },
      {
        Header: 'component',
        accessor: 'section_component.name',
        Cell: (row: any) => {
          return <span>{row?.cell?.value}</span>;
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
              // handleMenuEditOpen={() => handleSubMenuEditOpen(row.row?.original)}
              // handleMenuDeleteOpen={() => handleSubMenuDeleteOpen(row.row?.original)}
            />
          );
        },
      },
    ],
    []
  );

  // let sectionComponentOptions = layoutSectionComponent.filter(
  //   (item: LayoutSectionComponentExpandType) => item.section_componentId
  // );

  const sectionComponentOptions = [
    ...sectionComponents
      .filter(({ id: id1 }) => !layoutSectionComponent.some(({ section_componentId: id2 }) => id2 === id1))
      .map(({ id, name }) => {
        return { value: id, label: name };
      }),
  ];

  const getSubMenuWithMenu = () => {
    MainLayoutSectionComponentsApi.getMainLayoutSectionComponents()
      .then((response: any) => {
        setLayoutSectionComponent([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    SectionComponentsApi.getAllSectionComponents()
      .then((response2: any) => {
        setSectionComponents([...response2.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSubMenuWithMenu();
  }, []);

  useEffect(() => {
    console.log(sectionComponentOptions);
  }, [sectionComponents]);

  const handleAddSubmit = (formValues: any) => {
    return false;
  };

  const handleEditSubmit = (formValues: any) => {
    return false;
  };

  const handleDeleteSubmit = () => {
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
          <form className='space-y-4 min-h-[200px]'>
            <OptionsSelect options={sectionComponentOptions} name='section_componentId' />
            <div className='ltr:text-right rtl:text-left mt-5'>
              <button className='btn btn-dark  text-center' type='submit' value='Submit'>
                Add
              </button>
            </div>
          </form>
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
          {/* <FormSubMenu
            handleOnSubmit={(formValues) => handleEditSubmit(formValues)}
            currentMenuItem={currentSubMenuItem}
          /> */}
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
        <Table
          title='Main layout component'
          dataTable={layoutSectionComponent}
          columnsTable={columns}
          handleTableButton={openAddModal}
        />
      </div>
      <ModalCrud />
    </>
  );
};

export default MainLayout;
