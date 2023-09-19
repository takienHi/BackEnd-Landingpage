import MenuManager2 from './components/MenuManager/MenuManager2';

import SubMenuManager from './components/SubMenuManager/SubMenuManager';

const HeaderManager = () => {
  return (
    <>
      <div className='grid grid-cols-12 gap-5'>
        <MenuManager2 />

        <SubMenuManager />
      </div>
    </>
  );
};

export default HeaderManager;
