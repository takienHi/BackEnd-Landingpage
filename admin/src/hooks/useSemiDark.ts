import { handleSemiDarkMode } from 'src/store/layout';
import { useSelector, useDispatch } from 'react-redux';

const useSemiDark = () => {
  const dispatch = useDispatch();
  const isSemiDark = useSelector((state: any) => state.layout.semiDarkMode);

  const setSemiDark = (val: any) => dispatch(handleSemiDarkMode(val));

  return [isSemiDark, setSemiDark];
};

export default useSemiDark;
