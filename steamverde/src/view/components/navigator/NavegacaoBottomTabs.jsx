import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge, Icon } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import Home from '../../Home';
import TelaCategorias from '../../jogos/TelaCategorias';
import TelaCarrinho from '../../carrinho/TelaCarrinho';
import TelaFavoritos from '../../favoritos/TelaFavoritos';
import TelaConfiguracoes from '../../perfil/TelaConfiguracoes';

import { useCarrinhoContext } from '../authProvider/ProvedorCarrinho';
import { useFavoritosContext } from '../authProvider/ProvedorFavoritos';

const Tab = createBottomTabNavigator();

const NavegacaoBottomTabs = () => {
  const { itensCarrinho } = useCarrinhoContext();
  const { favoritos } = useFavoritosContext();

  const quantidadeCarrinho = itensCarrinho ? itensCarrinho.reduce((total, item) => total + item.quantidade, 0) : 0;
  const quantidadeFavoritos = favoritos ? favoritos.length : 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'gamepad';

          switch (route.name) {
            case 'Inicio':
              iconName = 'home';
              break;
            case 'Categorias':
              iconName = 'shape';
              break;
            case 'Carrinho':
              iconName = 'cart';
              break;
            case 'Favoritos':
              iconName = 'heart';
              break;
            case 'Configuracoes':
              iconName = 'cog';
              break;
          }

          return (
            <View>
              <Icon 
                source={iconName} 
                color={color} 
                size={size} 
              />
              {route.name === 'Carrinho' && quantidadeCarrinho > 0 && (
                <Badge style={estilos.badge} size={18}>
                  {quantidadeCarrinho}
                </Badge>
              )}
              {route.name === 'Favoritos' && quantidadeFavoritos > 0 && (
                <Badge style={estilos.badge} size={18}>
                  {quantidadeFavoritos}
                </Badge>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Home}
        options={{
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen 
        name="Categorias" 
        component={TelaCategorias}
        options={{
          tabBarLabel: 'Categorias',
        }}
      />
      <Tab.Screen 
        name="Carrinho" 
        component={TelaCarrinho}
        options={{
          tabBarLabel: 'Carrinho',
        }}
      />
      <Tab.Screen 
        name="Favoritos" 
        component={TelaFavoritos}
        options={{
          tabBarLabel: 'Favoritos',
        }}
      />
      <Tab.Screen 
        name="Configuracoes" 
        component={TelaConfiguracoes}
        options={{
          tabBarLabel: 'Configurações',
        }}
      />
    </Tab.Navigator>
  );
};

const estilos = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#f44336',
  },
});

export default NavegacaoBottomTabs;
