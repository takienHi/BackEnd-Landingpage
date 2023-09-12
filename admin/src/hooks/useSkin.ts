import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSkin } from 'src/store/layout';

const useSkin = () => {
  const dispatch = useDispatch();
  const skin = useSelector((state: any) => state.layout.skin);

  const setSkin = (mod: any) => dispatch(handleSkin(mod));

  useEffect(() => {
    const body = window.document.body;
    const classNames = {
      default: 'skin--default',
      bordered: 'skin--bordered',
    };

    if (skin === 'default') {
      body.classList.add(classNames.default);
      body.classList.remove(classNames.bordered);
    } else if (skin === 'bordered') {
      body.classList.add(classNames.bordered);
      body.classList.remove(classNames.default);
    }
  }, [skin]);

  return [skin, setSkin];
};

export default useSkin;
