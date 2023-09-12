import useDarkMode from 'src/hooks/useDarkMode';
import { Link } from 'react-router-dom';
import useWidth from 'src/hooks/useWidth';

import MainLogo from 'src/assets/images/logo/logo.svg';
import LogoWhite from 'src/assets/images/logo/logo-white.svg';
import MobileLogo from 'src/assets/images/logo/logo-c.svg';
import MobileLogoWhite from 'src/assets/images/logo/logo-c-white.svg';
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to='/dashboard'>
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt='' />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt='' />
        )}
      </Link>
    </div>
  );
};

export default Logo;
