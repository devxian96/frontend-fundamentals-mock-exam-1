import { GlobalPortal, GlobalStyles } from 'tosslib';
import { ReactQueryProvider } from '@/components/Providers/ReactQueryProvider';
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
