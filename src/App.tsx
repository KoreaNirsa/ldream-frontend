
import AppRouter from '@/router';
import { useTokenRestore } from '@/hooks/useTokenRestore';
import { Toaster } from '@/components/ui/toaster';

function App() {
  useTokenRestore();
  
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App; 