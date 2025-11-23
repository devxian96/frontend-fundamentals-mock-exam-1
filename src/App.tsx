import { GlobalPortal, GlobalStyles } from 'tosslib';
import { ReactQueryProvider } from '@/Providers/ReactQueryProvider';
import { Routes } from '@/pages/Routes';

export function App() {
  return (
    <>
      <GlobalStyles />
      <GlobalPortal.Provider>
        <ReactQueryProvider>
          <Routes />
        </ReactQueryProvider>
      </GlobalPortal.Provider>
    </>
  );
}
