import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Button, 
  Surface
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.Content title="SteamVerde" titleStyle={estilos.titulo} />
      </Appbar.Header>

      <View style={estilos.conteudo}>
        <Surface style={estilos.cartaoBoasVindas}>
          <Title style={estilos.tituloBoasVindas}>SteamVerde</Title>
          <Title style={estilos.subtituloBoasVindas}>Loja de Games</Title>
        </Surface>

        <View style={estilos.containerAtalhos}>
          <Card style={estilos.cartaoAtalho} onPress={() => navigation.navigate('ListaJogos')}>
            <Card.Content style={estilos.conteudoAtalho}>
              <Title style={estilos.tituloAtalho}>Produtos</Title>
            </Card.Content>
          </Card>

          <Card style={estilos.cartaoAtalho} onPress={() => navigation.navigate('Carrinho')}>
            <Card.Content style={estilos.conteudoAtalho}>
              <Title style={estilos.tituloAtalho}>Carrinho</Title>
            </Card.Content>
          </Card>

          <Card style={estilos.cartaoAtalho} onPress={() => navigation.navigate('Perfil')}>
            <Card.Content style={estilos.conteudoAtalho}>
              <Title style={estilos.tituloAtalho}>Perfil</Title>
            </Card.Content>
          </Card>
        </View>
        
        <View style={estilos.containerBotoes}>
          <Button 
            mode="contained" 
            style={estilos.botaoAcao}
            onPress={() => navigation.navigate('CadastroJogo')}
          >
            Cadastrar Produto
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  cartaoBoasVindas: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  tituloBoasVindas: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtituloBoasVindas: {
    color: 'white',
    fontSize: 16,
  },
  containerAtalhos: {
    marginBottom: 20,
  },
  cartaoAtalho: {
    marginBottom: 12,
  },
  conteudoAtalho: {
    alignItems: 'center',
    padding: 20,
  },
  tituloAtalho: {
    color: '#2E7D32',
  },
  containerBotoes: {
    marginTop: 20,
  },
  botaoAcao: {
    marginVertical: 8,
  },
});

export default Home;