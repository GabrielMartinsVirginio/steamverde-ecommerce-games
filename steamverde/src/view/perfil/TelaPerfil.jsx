import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title, Avatar, Button, Card, Divider, Text, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../components/authProvider/ProvedorAutenticacao';

const TelaPerfil = () => {
  const navigation = useNavigation();
  const { usuario, logout, ehAdmin } = useAuth();

  const sair = async () => {
    await logout();
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
            <Avatar.Icon 
              size={80} 
              icon={ehAdmin() ? "shield-account" : "account"} 
              style={estilos.avatar} 
            />
            <Title style={estilos.nome}>{usuario?.nome || 'Usuário'}</Title>
            <Text style={estilos.email}>{usuario?.email || 'email@example.com'}</Text>
            
            <Chip 
              style={[estilos.chipTipo, ehAdmin() ? estilos.chipAdmin : estilos.chipComum]}
              textStyle={estilos.textoChip}
              icon={ehAdmin() ? "crown" : "account"}
            >
              {ehAdmin() ? 'Administrador' : 'Usuário Comum'}
            </Chip>
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
    marginBottom: 12,
  },
  chipTipo: {
    marginTop: 8,
  },
  chipAdmin: {
    backgroundColor: '#FFB74D',
  },
  chipComum: {
    backgroundColor: '#E8F5E9',
  },
  textoChip: {
    color: '#2E7D32',
    fontWeight: 'bold',
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