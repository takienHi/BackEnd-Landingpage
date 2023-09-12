import { useEffect, useState } from 'react';
import Button from 'src/components/ui/Button';
import Card from 'src/components/ui/Card';
import CardLogo from 'src/components/partials/CardLogo';

import FilePondInput from 'src/components/ui/FilePondInput';
import Image from 'src/components/ui/Image';
import Modal from 'src/components/ui/Modal';
import Icon from 'src/components/ui/Icon';
import Dropdown from 'src/components/ui/Dropdown';
import LogoApi from 'src/apis/logo.api';
import { LogoDefault, LogoType } from 'src/types/LogoType';

const LogoWebsite = () => {
  const [allLogo, setAllLogo] = useState<LogoType>(LogoDefault);

  const [logoDesktopWhite, setLogoDesktopWhite] = useState('');
  const [logoDesktopDark, setLogoDesktopDark] = useState('');
  const [logoMobileWhite, setLogoMobileWhite] = useState('');
  const [logoMobileDark, setLogoMobileDark] = useState('');

  const getLogoList = () => {
    LogoApi.getAll()
      .then((response: any) => {
        setAllLogo(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getLogoList();
  });

  useEffect(() => {
    setLogoDesktopWhite(allLogo.desktop.while);
    setLogoDesktopDark(allLogo.mobile.dark);
    setLogoMobileWhite(allLogo.mobile.while);
    setLogoMobileDark(allLogo.mobile.dark);
  }, [allLogo]);

  const handleEditSubmit = () => {
    // LogoApi.update(allLogo)
    //   .then((_response: any) => {
    //     editLogoComplete();
    //     return true;
    //   })
    //   .catch((e: Error) => {
    //     console.log(e);
    //     return false;
    //   });
    console.log(true);

    return true;
  };

  const editLogoComplete = () => {
    getLogoList();
  };
  return (
    <>
      <div className='lg:grid-cols-2 grid gap-5 grid-cols-1 '>
        <CardLogo logoName={'Logo Desktop While'} logoImage={logoDesktopWhite} handleEditSubmit={handleEditSubmit} />
        <CardLogo logoName={'Logo Desktop Dark'} logoImage={logoDesktopDark} handleEditSubmit={handleEditSubmit} />
        <CardLogo logoName={'Logo Mobile White'} logoImage={logoMobileWhite} handleEditSubmit={handleEditSubmit} />
        <CardLogo logoName={'Logo Mobile Dark'} logoImage={logoMobileDark} handleEditSubmit={handleEditSubmit} />
      </div>
    </>
  );
};

export default LogoWebsite;
