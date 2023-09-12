import Modal from 'src/components/ui/Modal';

type ViewMenuModal = {
  title: string;
  label?: string;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  children: any;
};

const ViewMenuModal = ({ title, label, isOpen, closeModal, openModal, children }: ViewMenuModal) => {
  return (
    <>
      <Modal
        title={title}
        label={label}
        labelClass='btn-dark btn-sm'
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      >
        {children}
      </Modal>
    </>
  );
};

export default ViewMenuModal;
