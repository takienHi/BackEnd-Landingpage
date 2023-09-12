import { useSelector, useDispatch } from 'react-redux';
import { handleContentWidth } from 'src/store/layout';

const useContentWidth = () => {
  const dispatch = useDispatch();
  const contentWidth = useSelector((state: any) => state.layout.contentWidth);

  // ** Toggles Content Width
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val));

  return [contentWidth, setContentWidth];
};

export default useContentWidth;
