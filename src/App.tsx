import React from 'react';
import AppRouter from '@/router';
import { useTokenRestore } from '@/hooks/useTokenRestore';

function App() {
  useTokenRestore();
  
  return <AppRouter />;
}

export default App; 