
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title, Avatar, Button, Card, Divider, Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const usuarioMock = {
  nome: 'Gabriel Martins Virginio',
  email: 'gabriel@steamverde.com',
  saldo: 120.50,
};

const TelaPerfil = () => {
  const navigation = useNavigation();

  const sair = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Perfil" />
      </Appbar.Header>

      <View style={estilos.conteudo}>
        <Card style={estilos.cardPerfil}>
          <Card.Content style={estilos.cardContent}>
            <Avatar.Icon size={80} icon="account" style={estilos.avatar} />
            <Title style={estilos.nome}>{usuarioMock.nome}</Title>
            <Text style={estilos.email}>{usuarioMock.email}</Text>
            <Text style={estilos.saldo}>Saldo: R$ {usuarioMock.saldo.toFixed(2)}</Text>
          </Card.Content>
        </Card>

        <Divider style={estilos.divisor} />

        <View style={estilos.botoesContainer}>
          <Button mode="outlined" icon="account-edit" style={estilos.botao} onPress={() => {}}>
            Editar Perfil
          </Button>
          <Button mode="outlined" icon="cog" style={estilos.botao} onPress={() => {}}>
            Configurações
          </Button>
          <Button mode="outlined" icon="information-outline" style={estilos.botao} onPress={() => {}}>
            Sobre o app
          </Button>
          <Button mode="contained" icon="logout" style={estilos.botaoSair} onPress={sair}>
            Sair
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  cardPerfil: {
    width: '100%',
    marginBottom: 24,
    elevation: 4,
    borderRadius: 16,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    marginBottom: 12,
    backgroundColor: '#4CAF50',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  saldo: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 8,
  },
  divisor: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#E0E0E0',
    height: 1,
  },
  botoesContainer: {
    width: '100%',
    gap: 12,
  },
  botao: {
    borderRadius: 8,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  botaoSair: {
    borderRadius: 8,
    backgroundColor: '#f44336',
    marginTop: 8,
  },
});

export default TelaPerfil;