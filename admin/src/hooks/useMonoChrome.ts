import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleMonoChrome } from 'src/store/layout';

const useMonoChrome = () => {
  const dispatch = useDispatch();
  const isMonoChrome = useSelector((state: any) => state.layout.isMonochrome);

  const setMonoChrome = (val: any) => dispatch(handleMonoChrome(val));

  useEffect(() => {
    const element = document.getElementsByTagName('html')[0];

    if (isMonoChrome) {
      element.classList.add('grayscale');
    } else {
      element.classList.remove('grayscale');
    }
  }, [isMonoChrome]);

  return [isMonoChrome, setMonoChrome];
};

export default useMonoChrome;
