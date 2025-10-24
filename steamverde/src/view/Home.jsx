import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Button, 
  Surface,
  Text,
  Avatar,
  Divider,
  IconButton,
  Searchbar,
  Portal,
  Modal
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [modalBuscaVisivel, setModalBuscaVisivel] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');

  const abrirBusca = () => {
    setModalBuscaVisivel(true);
  };

  const fecharBusca = () => {
    setModalBuscaVisivel(false);
    setTermoBusca('');
  };

  const executarBusca = () => {
    if (termoBusca.trim()) {
      navigation.navigate('ListaJogos', { termoBusca: termoBusca.trim() });
      fecharBusca();
    }
  };

  const atalhos = [
    {
      titulo: 'Produtos',
      subtitulo: 'Explore nosso catálogo',
      icone: 'gamepad-variant',
      cor: '#1976D2',
      rota: 'ListaJogos'
    },
    {
      titulo: 'Carrinho',
      subtitulo: 'Seus jogos selecionados',
      icone: 'cart',
      cor: '#388E3C',
      rota: 'Carrinho'
    },
    {
      titulo: 'Perfil',
      subtitulo: 'Configurações da conta',
      icone: 'account-circle',
      cor: '#7B1FA2',
      rota: 'Perfil'
    }
  ];

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header style={estilos.header}>
        <View style={estilos.headerConteudo}>
          <Avatar.Icon 
            size={36} 
            icon="gamepad-variant" 
            style={estilos.logoHeader} 
          />
          <Text style={estilos.tituloHeader}>SteamVerde</Text>
        </View>
        <IconButton 
          icon="magnify" 
          iconColor="white" 
          size={24}
          onPress={abrirBusca}
        />
      </Appbar.Header>

      <ScrollView style={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={estilos.cartaoBoasVindas}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Avatar.Icon 
            size={60} 
            icon="gamepad-variant" 
            style={estilos.avatarPrincipal} 
          />
          <Title style={estilos.tituloBoasVindas}>Bem-vindo ao SteamVerde</Title>
          <Text style={estilos.subtituloBoasVindas}>
            Sua loja de games virtuais favorita
          </Text>
        </LinearGradient>

        <View style={estilos.secaoTitulo}>
          <Text style={estilos.textoSecao}>Acesso Rápido</Text>
          <Divider style={estilos.divisor} />
        </View>

        <View style={estilos.containerAtalhos}>
          {atalhos.map((atalho, index) => (
            <Card 
              key={index}
              style={[estilos.cartaoAtalho, { backgroundColor: atalho.cor + '15' }]} 
              onPress={() => navigation.navigate(atalho.rota)}
              mode="elevated"
            >
              <Card.Content style={estilos.conteudoAtalho}>
                <Avatar.Icon 
                  size={50} 
                  icon={atalho.icone} 
                  style={[estilos.iconeAtalho, { backgroundColor: atalho.cor }]} 
                />
                <View style={estilos.textoAtalho}>
                  <Title style={[estilos.tituloAtalho, { color: atalho.cor }]}>
                    {atalho.titulo}
                  </Title>
                  <Text style={estilos.subtituloAtalho}>
                    {atalho.subtitulo}
                  </Text>
                </View>
                <IconButton 
                  icon="chevron-right" 
                  iconColor={atalho.cor}
                  size={20}
                />
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={estilos.secaoTitulo}>
          <Text style={estilos.textoSecao}>Ações Rápidas</Text>
          <Divider style={estilos.divisor} />
        </View>
        
        <View style={estilos.containerBotoes}>
          <Button 
            mode="contained" 
            icon="plus-circle"
            style={estilos.botaoAcaoPrincipal}
            contentStyle={estilos.conteudoBotao}
            labelStyle={estilos.textoBotao}
            onPress={() => navigation.navigate('CadastroJogo')}
          >
            Cadastrar Produto
          </Button>
          
          <Button 
            mode="outlined" 
            style={estilos.botaoAcaoSecundario}
            contentStyle={estilos.conteudoBotao}
            labelStyle={estilos.textoBotaoOutline}
            onPress={() => navigation.navigate('ListaJogos')}
          >
            Explorar Catálogo
          </Button>
        </View>

        <View style={estilos.espacoFinal} />
      </ScrollView>

      <Portal>
        <Modal 
          visible={modalBuscaVisivel} 
          onDismiss={fecharBusca}
          contentContainerStyle={estilos.modalBusca}
        >
          <Surface style={estilos.containerBusca}>
            <Text style={estilos.tituloBusca}>Buscar Jogos</Text>
            <Searchbar
              placeholder="Digite o nome do jogo..."
              onChangeText={setTermoBusca}
              value={termoBusca}
              style={estilos.barraBusca}
              onSubmitEditing={executarBusca}
              autoFocus
            />
            <View style={estilos.botoesBusca}>
              <Button 
                mode="outlined" 
                onPress={fecharBusca}
                style={estilos.botaoCancelar}
              >
                Cancelar
              </Button>
              <Button 
                mode="contained" 
                onPress={executarBusca}
                style={estilos.botaoBuscar}
                disabled={!termoBusca.trim()}
              >
                Buscar
              </Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2E7D32',
    elevation: 4,
  },
  headerConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoHeader: {
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  tituloHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteudo: {
    flex: 1,
  },
  cartaoBoasVindas: {
    margin: 16,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  avatarPrincipal: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  tituloBoasVindas: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtituloBoasVindas: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  secaoTitulo: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  textoSecao: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  divisor: {
    backgroundColor: '#E0E0E0',
    height: 1,
  },
  containerAtalhos: {
    paddingHorizontal: 16,
  },
  cartaoAtalho: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conteudoAtalho: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconeAtalho: {
    marginRight: 16,
  },
  textoAtalho: {
    flex: 1,
  },
  tituloAtalho: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtituloAtalho: {
    fontSize: 14,
    color: '#666',
  },
  containerBotoes: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  botaoAcaoPrincipal: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    elevation: 3,
  },
  botaoAcaoSecundario: {
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  conteudoBotao: {
    paddingVertical: 8,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: '600',
  },
  textoBotaoOutline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  espacoFinal: {
    height: 20,
  },
  modalBusca: {
    padding: 20,
    justifyContent: 'center',
  },
  containerBusca: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    elevation: 8,
  },
  tituloBusca: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  barraBusca: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  botoesBusca: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botaoCancelar: {
    flex: 1,
    borderColor: '#666',
  },
  botaoBuscar: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
});

export default Home;