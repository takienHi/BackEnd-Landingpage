import Icon from 'src/components/ui/Icon';
import { MenuType } from 'src/types/MenuType';

type ViewMenuProps = {
  currentMenuItem: MenuType | null;
};
const ViewMenu = ({ currentMenuItem }: ViewMenuProps) => {
  return (
    <>
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
                    <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>PATH</div>
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
                <li className='flex space-x-3 rtl:space-x-reverse'>
                  <div className='flex-1'>
                    <div className='uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]'>
                      Has submenu
                    </div>
                    <div className='text-base text-slate-600 dark:text-slate-50'>
                      {currentMenuItem.hasChildren ? 'yes' : 'no'}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='mt-4 space-x-4 rtl:space-x-reverse'></div>
          </main>
        </>
      )}
    </>
  );
};

export default ViewMenu;
