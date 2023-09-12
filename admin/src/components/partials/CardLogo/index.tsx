import { useState } from 'react';
import Card from 'src/components/ui/Card';
import FilePondInput from 'src/components/ui/FilePondInput';
import Image from 'src/components/ui/Image';
import Modal from 'src/components/ui/Modal';

type CardLogoType = {
  logoName: string;
  logoImage: string;
  handleEditSubmit: () => boolean;
};

const index = ({ logoName, logoImage, handleEditSubmit }: CardLogoType) => {
  const [files, setFiles] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  return (
    <>
      <Card>
        <header className='flex justify-between items-center mb-2'>
          <div className='flex space-x-4 items-center rtl:space-x-reverse'>
            <div className='font-medium text-base leading-6'>
              <div className='dark:text-slate-200 text-slate-900 font-bold truncate'>{logoName}</div>
            </div>
          </div>
          <div>
            <Modal
              title={`Change ${logoName}`}
              label='Change image'
              labelClass='btn-dark btn-sm'
              unControl
              handleSubmit={handleSubmit}
              isOpen={showModal}
              closeModal={closeModal}
              openModal={openModal}
            >
              <h4 className='font-medium text-lg mb-3 text-slate-900'>Choses file.</h4>
              <div className='text-base text-slate-600 dark:text-slate-300'>
                <FilePondInput files={files} setFiles={setFiles} />
              </div>
            </Modal>
          </div>
        </header>
        <Image src={logoImage} alt='Small image with fluid:' className='rounded-md mb-6' />
      </Card>
    </>
  );
};

export default index;
