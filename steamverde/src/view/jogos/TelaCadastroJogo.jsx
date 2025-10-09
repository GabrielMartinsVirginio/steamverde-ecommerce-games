import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TelaCadastroJogo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Cadastrar Jogo" />
      </Appbar.Header>
      
      <View style={estilos.conteudo}>
        <Title>Formulário de Cadastro em desenvolvimento...</Title>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default TelaCadastroJogo;