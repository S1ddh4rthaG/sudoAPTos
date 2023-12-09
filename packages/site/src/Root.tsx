import type { FunctionComponent } from 'react';
import { App } from './App';

// Use context
import { MetaMaskProvider } from './hooks';

export const Root: FunctionComponent = () => {
  return (
    <>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </>
  );
};