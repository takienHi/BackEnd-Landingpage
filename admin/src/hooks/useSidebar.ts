import { useSelector, useDispatch } from 'react-redux';
import { handleSidebarCollapsed } from 'src/store/layout';

const useSidebar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: any) => state.layout.isCollapsed);

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val: any) => dispatch(handleSidebarCollapsed(val));

  return [collapsed, setMenuCollapsed];
};

export default useSidebar;
