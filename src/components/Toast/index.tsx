import { ToastContainer } from 'react-toastify';

export const Toast = () => (
  <ToastContainer
    position='top-right'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop
    theme='colored'
    closeOnClick
    rtl={false}
    draggable
  />
);
