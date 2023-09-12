import { useSelector, useDispatch } from 'react-redux';
import { handleMenuHidden } from 'src/store/layout';

const useMenuHidden = () => {
  const dispatch = useDispatch();
  const menuHidden = useSelector((state: any) => state.layout.menuHidden);

  const setMenuHidden = (value: any) => {
    dispatch(handleMenuHidden(value));
  };

  return [menuHidden, setMenuHidden];
};

export default useMenuHidden;
