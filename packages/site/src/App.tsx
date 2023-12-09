import type { FunctionComponent } from 'react';
import { Header, Footer, Main } from './components/index';
import './styles.css';

import { WalletContextProvider } from './context/WalletContextProvider';

export const App: FunctionComponent = () => {

  return (
    <>
      <WalletContextProvider>
        <div className='d-flex flex-column min-vh-100'>
          <Header />
          <Main />
          <Footer />
        </div>
      </WalletContextProvider>
    </>
  );
};