import { toast } from 'react-toastify';

const toastInfo = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

const toastWarning = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

const toastSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

const toastError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

const Toastify = { toastInfo, toastWarning, toastSuccess, toastError };

export default Toastify;
