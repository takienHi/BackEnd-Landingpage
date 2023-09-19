import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'src/components/partials/header';
import Sidebar from 'src/components/partials/sidebar';
import Settings from 'src/components/partials/settings';
import useWidth from 'src/hooks/useWidth';
import useSidebar from 'src/hooks/useSidebar';
import useContentWidth from 'src/hooks/useContentWidth';
import useMenuLayout from 'src/hooks/useMenulayout';
import useMenuHidden from 'src/hooks/useMenuHidden';
import Breadcrumbs from 'src/components/ui/Breadcrumbs';
import MobileMenu from '../components/partials/sidebar/MobileMenu';
import useMobileMenu from 'src/hooks/useMobileMenu';
import Loading from 'src/components/Loading';
import { motion } from 'framer-motion';
const Layout = () => {
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();

  const switchHeaderClass = () => {
    if (menuType === 'horizontal' || menuHidden) {
      return 'ltr:ml-0 rtl:mr-0';
    } else if (collapsed) {
      return 'ltr:ml-[72px] rtl:mr-[72px]';
    } else {
      return 'ltr:ml-[248px] rtl:mr-[248px]';
    }
  };
  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenuLayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  return (
    <>
      <Header className={width > breakpoints.xl ? switchHeaderClass() : ''} />
      {menuType === 'vertical' && width > breakpoints.xl && !menuHidden && <Sidebar />}

      <MobileMenu
        className={`${
          width < breakpoints.xl && mobileMenu
            ? 'left-0 visible opacity-100  z-[9999]'
            : 'left-[-300px] invisible opacity-0  z-[-999] '
        }`}
      />
      {/* mobile menu overlay*/}
      {width < breakpoints.xl && mobileMenu && (
        <div
          className='overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]'
          onClick={() => setMobileMenu(false)}
        ></div>
      )}
      <Settings />
      <div className={`content-wrapper transition-all duration-150 ${width > 1280 ? switchHeaderClass() : ''}`}>
        {/* md:min-h-screen will h-full*/}
        <div className='page-content   page-min-height  '>
          <div className={contentWidth === 'boxed' ? 'container mx-auto' : 'container-fluid'}>
            <Suspense fallback={<Loading />}>
              <motion.div
                key={location.pathname}
                initial='pageInitial'
                animate='pageAnimate'
                exit='pageExit'
                variants={{
                  pageInitial: {
                    opacity: 0,
                    y: 50,
                  },
                  pageAnimate: {
                    opacity: 1,
                    y: 0,
                  },
                  pageExit: {
                    opacity: 0,
                    y: -50,
                  },
                }}
                transition={{
                  type: 'tween',
                  ease: 'easeInOut',
                  duration: 0.5,
                }}
              >
                <Breadcrumbs />
                {<Outlet />}
              </motion.div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
