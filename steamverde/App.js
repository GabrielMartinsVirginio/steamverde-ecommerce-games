import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NavegacaoPrincipal from './src/view/components/navigator/NavegacaoPrincipal';
import ProvedorAutenticacao from './src/view/components/authProvider/ProvedorAutenticacao';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ProvedorAutenticacao>
          <NavegacaoPrincipal />
          <StatusBar style="auto" />
        </ProvedorAutenticacao>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
