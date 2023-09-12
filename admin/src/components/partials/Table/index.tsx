import { forwardRef, useRef, useEffect, useMemo } from 'react';
import Card from 'src/components/ui/Card';
import Icon from 'src/components/ui/Icon';
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UseSortByInstanceProps,
  UsePaginationState,
  useFilters,
} from 'react-table';
import GlobalFilter from './GlobalFilter';
// import Select from 'src/components/ui/Select';
import Select from 'react-select';
import Button from 'src/components/ui/Button';

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }: any, ref) => {
  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} className='table-checkbox' />
    </>
  );
});

type TableType = {
  title?: string;
  dataTable: any[];
  columnsTable: any[];
  isSelection?: boolean;
  handleTableButton?: () => void;
};

// const COLUMNS = [
//   {
//     Header: 'Id',
//     accessor: 'id',
//     Cell: (row: any) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: 'Order',
//     accessor: 'order',
//     Cell: (row: any) => {
//       return <span>#{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: 'customer',
//     accessor: 'customer',
//     Cell: (row: any) => {
//       return (
//         <div>
//           <span className='inline-flex items-center'>
//             <span className='w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600'>
//               <img src={row?.cell?.value.image} alt='' className='object-cover w-full h-full rounded-full' />
//             </span>
//             <span className='text-sm text-slate-600 dark:text-slate-300 capitalize'>{row?.cell?.value.name}</span>
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     Header: 'date',
//     accessor: 'date',
//     Cell: (row: any) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: 'quantity',
//     accessor: 'quantity',
//     Cell: (row: any) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: 'amount',
//     accessor: 'amount',
//     Cell: (row: any) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: 'status',
//     accessor: 'status',
//     Cell: (row: any) => {
//       return (
//         <span className='block w-full'>
//           <span
//             className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
//               row?.cell?.value === 'paid' ? 'text-success-500 bg-success-500' : ''
//             }
//             ${row?.cell?.value === 'due' ? 'text-warning-500 bg-warning-500' : ''}
//             ${row?.cell?.value === 'cancled' ? 'text-danger-500 bg-danger-500' : ''}

//              `}
//           >
//             {row?.cell?.value}
//           </span>
//         </span>
//       );
//     },
//   },
//   {
//     Header: 'action',
//     accessor: 'action',
//     Cell: (row: any) => {
//       return (
//         <div className='flex space-x-3 rtl:space-x-reverse'>
//           <Tooltip content='View' placement='top' arrow animation='shift-away'>
//             <button className='action-btn' type='button'>
//               <Icon icon='heroicons:eye' />
//             </button>
//           </Tooltip>
//           <Tooltip content='Edit' placement='top' arrow animation='shift-away'>
//             <button className='action-btn' type='button'>
//               <Icon icon='heroicons:pencil-square' />
//             </button>
//           </Tooltip>
//           <Tooltip content='Delete' placement='top' arrow animation='shift-away' theme='danger'>
//             <button className='action-btn' type='button'>
//               <Icon icon='heroicons:trash' />
//             </button>
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id, render } }: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const selectOptions = [
    { value: '', label: 'All' },
    ...options.map((option: any, i: any) => {
      return { value: option, label: option };
    }),
  ];
  // Render a multi-select box

  const onChange = (opt: any, ctx: any) => {
    setFilter(opt.value || '');
  };
  return (
    <>
      <Select
        options={selectOptions}
        defaultValue={selectOptions[0]}
        name={id}
        id={id}
        value={selectOptions.filter((option) => {
          return filterValue ? option.value === filterValue : option.value === '';
        })}
        className='react-select w-[220px]'
        classNamePrefix='select'
        isSearchable={false}
        onChange={onChange}
      />
    </>
  );
}

const Table = ({ title, dataTable, columnsTable, isSelection, handleTableButton }: TableType) => {
  const columns: any = useMemo(() => columnsTable, []);
  const data = useMemo(() => dataTable, []);
  // const columns: any = columnsTable;
  // const data = dataTable;

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks: any) => {
      if (isSelection) {
        hooks.visibleColumns.push((columns: any) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  }: any = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Card noborder>
        <div className='md:flex pb-6 items-center'>
          <h6 className='flex-1 md:mb-0 mb-3'>{title}</h6>
          <div className='md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse'>
            {headerGroups.map((headerGroup: any) =>
              headerGroup.headers.map((column: any) =>
                column.Filter ? (
                  <div className='mt-2 sm:mt-0' key={column.id}>
                    {column.render('Filter')}
                  </div>
                ) : null
              )
            )}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <Button
              icon='heroicons-outline:plus-sm'
              text='Add Record'
              className=' btn-dark font-normal btn-sm '
              iconClass='text-lg'
              onClick={() => {
                handleTableButton ? handleTableButton() : null;
              }}
            />
          </div>
        </div>
        <div className='overflow-x-auto -mx-6'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden '>
              <table
                className='min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700'
                {...getTableProps}
              >
                <thead className=' border-t border-slate-100 dark:border-slate-800'>
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          scope='col'
                          className=' table-th '
                        >
                          {column.render('Header')}
                          <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className='bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700'
                  {...getTableBodyProps}
                >
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td {...cell.getCellProps()} className='table-td'>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center'>
          <div className=' flex items-center space-x-3 rtl:space-x-reverse'>
            <span className=' flex space-x-2  rtl:space-x-reverse items-center'>
              <span className=' text-sm font-medium text-slate-600 dark:text-slate-300'>Go</span>
              <span>
                <input
                  type='number'
                  className=' form-control py-2'
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: '50px' }}
                />
              </span>
            </span>
            <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>
              Page
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className='flex items-center  space-x-3  rtl:space-x-reverse'>
            <li className='text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180'>
              <button
                className={` ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon='heroicons-outline:chevron-left' />
              </button>
            </li>
            {pageOptions.map((page: any, pageIdx: any) => (
              <li key={pageIdx}>
                <button
                  // href='#'
                  aria-current='page'
                  className={` ${
                    pageIdx === pageIndex
                      ? 'bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium '
                      : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  '
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className='text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180'>
              <button
                className={` ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon='heroicons-outline:chevron-right' />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default Table;
