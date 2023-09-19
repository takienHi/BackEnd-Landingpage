import { useMemo } from 'react';
import Button from 'src/components/ui/Button';
import Card from 'src/components/ui/Card';
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination, useFilters } from 'react-table';
import Icon from 'src/components/ui/Icon';
import GlobalFilter from './GlobalFilter';
import Select from 'react-select';

type TableType = {
  title?: string;
  dataTable: any[];
  columnsTable: any[];
  isSelection?: boolean;
  handleTableButton?: () => void;
};

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
    ...options.map((option: any) => {
      return { value: option, label: option };
    }),
  ];
  // Render a multi-select box

  const onChange = (opt: any) => {
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

const Table = ({ title, dataTable, columnsTable, handleTableButton }: TableType) => {
  const columns = columnsTable;
  const data = dataTable;

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
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
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            {handleTableButton && (
              <Button
                icon='heroicons-outline:plus-sm'
                text='Add Record'
                className=' btn-dark font-normal btn-sm '
                iconClass='text-lg'
                onClick={handleTableButton}
              />
            )}
          </div>
        </div>
        <div className='overflow-x-auto -mx-6'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden '>
              <table
                className='min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700'
                {...getTableProps}
              >
                <thead className='bg-slate-200 dark:bg-slate-700'>
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
            <select
              className='form-control py-2 w-max'
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
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
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <Icon icon='heroicons:chevron-double-left-solid' />
              </button>
            </li>
            <li className='text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180'>
              <button
                className={` ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
            </li>
            {pageOptions.map((page: any, pageIdx: any) => (
              <li key={pageIdx}>
                <button
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
            <li className='text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180'>
              <button
                className={` ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </li>
            <li className='text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180'>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className={` ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Icon icon='heroicons:chevron-double-right-solid' />
              </button>
            </li>
          </ul>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

export default Table;
