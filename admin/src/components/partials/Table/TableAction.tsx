import { Icon } from '@iconify/react/dist/iconify.js';
import Tooltip from 'src/components/ui/Tooltip';

type TableActionType = {
  handleMenuViewOpen?: () => void;
  handleMenuEditOpen?: () => void;
  handleMenuDeleteOpen?: () => void;
};
const TableAction = ({ handleMenuViewOpen, handleMenuEditOpen, handleMenuDeleteOpen }: TableActionType) => {
  return (
    <>
      <div className='flex space-x-3 rtl:space-x-reverse'>
        {handleMenuViewOpen && (
          <Tooltip content='View' placement='top' arrow animation='shift-away' theme='info-600'>
            <button className='action-btn' type='button' onClick={handleMenuViewOpen}>
              <Icon icon='heroicons:eye' />
            </button>
          </Tooltip>
        )}
        {handleMenuEditOpen && (
          <Tooltip content='Edit' placement='top' arrow animation='shift-away' theme='warning-600'>
            <button className='action-btn' type='button' onClick={handleMenuEditOpen}>
              <Icon icon='heroicons:pencil-square' />
            </button>
          </Tooltip>
        )}
        {handleMenuDeleteOpen && (
          <Tooltip content='Delete' placement='top' arrow animation='shift-away' theme='danger-600'>
            <button className='action-btn' type='button' onClick={handleMenuDeleteOpen}>
              <Icon icon='heroicons:trash' />
            </button>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default TableAction;
