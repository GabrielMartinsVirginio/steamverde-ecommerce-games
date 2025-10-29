import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaSplash from '../../TelaSplash';
import Login from '../../Login';
import TelaCadastro from '../../TelaCadastro';
import NavegacaoBottomTabs from './NavegacaoBottomTabs';
import TelaListaJogos from '../../jogos/TelaListaJogos';
import TelaCadastroJogo from '../../jogos/TelaCadastroJogo';
import TelaDetalheJogo from '../../jogos/TelaDetalheJogo';

const Stack = createNativeStackNavigator();

const NavegacaoPrincipal = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={TelaSplash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Home" component={NavegacaoBottomTabs} />
        <Stack.Screen name="ListaJogos" component={TelaListaJogos} />
        <Stack.Screen name="CadastroJogo" component={TelaCadastroJogo} />
        <Stack.Screen name="DetalheJogo" component={TelaDetalheJogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegacaoPrincipal;