import FooterSubMenuManager from './components/FooterSubMenuManager/FooterSubMenuManager';
import MenuFooterManager from './components/MenuFooterManager/MenuFooterManager';

const FooterManager = () => {
  return (
    <>
      <div className='grid grid-cols-12 gap-5'>
        <MenuFooterManager />

        <FooterSubMenuManager />
      </div>
    </>
  );
};

export default FooterManager;
