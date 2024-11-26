import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <ToastContainer />
    </>
  );
}
