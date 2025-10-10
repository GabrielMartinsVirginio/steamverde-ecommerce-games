import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NavegacaoPrincipal from './src/view/components/navigator/NavegacaoPrincipal';
import ProvedorAutenticacao from './src/view/components/authProvider/ProvedorAutenticacao';
import ProvedorCarrinho from './src/view/components/authProvider/ProvedorCarrinho';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ProvedorAutenticacao>
          <ProvedorCarrinho>
            <NavegacaoPrincipal />
            <StatusBar style="auto" />
          </ProvedorCarrinho>
        </ProvedorAutenticacao>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
