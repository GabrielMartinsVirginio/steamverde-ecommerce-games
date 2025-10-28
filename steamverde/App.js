import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NavegacaoPrincipal from './src/view/components/navigator/NavegacaoPrincipal';
import ProvedorAutenticacao from './src/view/components/authProvider/ProvedorAutenticacao';
import ProvedorCarrinho from './src/view/components/authProvider/ProvedorCarrinho';

const temaDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4CAF50',
    secondary: '#66BB6A',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={temaDark}>
        <ProvedorAutenticacao>
          <ProvedorCarrinho>
            <NavegacaoPrincipal />
            <StatusBar style="light" />
          </ProvedorCarrinho>
        </ProvedorAutenticacao>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
