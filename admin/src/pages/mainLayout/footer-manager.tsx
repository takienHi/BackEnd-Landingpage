import { useEffect, useState } from 'react';
import MenuFooterApi from 'src/apis/menu_footer.api';
import SubMenuFooterApi from 'src/apis/sub_menu_footer.api';
import Table from 'src/components/partials/Table';
import Icon from 'src/components/ui/Icon';
import Tooltip from 'src/components/ui/Tooltip';
import { MenuType } from 'src/types/MenuType';
import { SubMenuFooterType } from 'src/types/SubMenuFooterType';

const FooterManager = () => {
  const [menuFooter, setMenuFooter] = useState<MenuType[]>([]);
  const [subMenuFooter, setSubMenuFooter] = useState<SubMenuFooterType[]>([]);
  const [filterString, setFilterString] = useState<string>('');

  const getMenu = () => {
    MenuFooterApi.getAll()
      .then((response: any) => {
        setMenuFooter([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getSubMenuFooter = () => {
    SubMenuFooterApi.getAll(filterString)
      .then((response: any) => {
        setSubMenuFooter([...response.data]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMenu();
    getSubMenuFooter();
  }, []);

  const columns_menu_header = [
    {
      Header: '#',
      accessor: 'row',
      filterable: false,
      Cell: (row: any) => {
        return <span>{row.row.index + 1}</span>;
      },
    },
    // {
    //   Header: 'Id',
    //   accessor: 'id',
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
      Cell: (row: any) => {
        return (
          <div className='flex space-x-3 rtl:space-x-reverse'>
            <Tooltip content='View' placement='top' arrow animation='shift-away'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:eye' />
              </button>
            </Tooltip>
            <Tooltip content='Edit' placement='top' arrow animation='shift-away'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:pencil-square' />
              </button>
            </Tooltip>
            <Tooltip content='Delete' placement='top' arrow animation='shift-away' theme='danger'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:trash' />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const columns_sub_menu_header = [
    {
      Header: '#',
      accessor: 'row',
      filterable: false,
      Cell: (row: any) => {
        return <span>{row.row.index + 1}</span>;
      },
    },
    // {
    //   Header: 'Id',
    //   accessor: 'id',
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
      Header: 'menuFooter parent',
      accessor: 'menuHeader',
      Cell: (row: any) => {
        return <span>{row?.cell?.value}</span>;
      },
      className: 'right',
    },
    {
      Header: 'status',
      accessor: 'status',
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
      Cell: (row: any) => {
        return (
          <div className='flex space-x-3 rtl:space-x-reverse'>
            <Tooltip content='View' placement='top' arrow animation='shift-away'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:eye' />
              </button>
            </Tooltip>
            <Tooltip content='Edit' placement='top' arrow animation='shift-away'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:pencil-square' />
              </button>
            </Tooltip>
            <Tooltip content='Delete' placement='top' arrow animation='shift-away' theme='danger'>
              <button className='action-btn' type='button'>
                <Icon icon='heroicons:trash' />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className='grid grid-cols-12 gap-5'>
        <div className='lg:col-span-12 col-span-12'>
          <Table title='Menu header' dataTable={menuFooter} columnsTable={columns_menu_header} isSelection={false} />
        </div>
        <div className='lg:col-span-12 col-span-12'>
          <Table
            title='Sub header'
            dataTable={subMenuFooter}
            columnsTable={columns_sub_menu_header}
            isSelection={false}
          />
        </div>
      </div>
    </>
  );
};

export default FooterManager;
