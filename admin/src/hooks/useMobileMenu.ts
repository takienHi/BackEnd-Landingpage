import { useSelector, useDispatch } from 'react-redux';
import { handleMobileMenu } from 'src/store/layout';
// import { useLocation } from 'react-router-dom';

const useMobileMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.layout.mobileMenu);
  //   const location = useLocation();

  // ** Toggles Mobile Menu
  const setMobileMenu = (val: any) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
