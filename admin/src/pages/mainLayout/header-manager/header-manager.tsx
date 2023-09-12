import MenuManager from './components/MenuManager/MenuManager';
import SubMenuManager from './components/SubMenuManager/SubMenuManager';

const HeaderManager = () => {
  return (
    <>
      <div className='grid grid-cols-12 gap-5'>
        <MenuManager />
        <SubMenuManager />
      </div>
    </>
  );
};

export default HeaderManager;
