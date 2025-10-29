import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button,
  Chip,
  Text,
  IconButton,
  Snackbar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useFavoritosContext } from '../components/authProvider/ProvedorFavoritos';
import { useCarrinhoContext } from '../components/authProvider/ProvedorCarrinho';

const TelaFavoritos = () => {
  const navigation = useNavigation();
  const { favoritos, removerFavorito, recarregar } = useFavoritosContext();
  const { adicionarAoCarrinho, verificarSeEstaNoCarrinho } = useCarrinhoContext();
  const [snackbar, setSnackbar] = useState({ visivel: false, mensagem: '' });

  useFocusEffect(
    React.useCallback(() => {
      recarregar();
    }, [])
  );

  const handleRemoverFavorito = async (jogoId) => {
    const resultado = await removerFavorito(jogoId);
    setSnackbar({ visivel: true, mensagem: resultado.mensagem });
  };

  const handleAdicionarCarrinho = async (jogo) => {
    const resultado = await adicionarAoCarrinho(jogo);
    setSnackbar({ visivel: true, mensagem: resultado.mensagem });
  };

  const navegarParaDetalhes = (jogo) => {
    navigation.navigate('DetalheJogo', { jogo });
  };

  const formatarPreco = (preco) => {
    return `R$ ${preco.toFixed(2)}`;
  };

  const renderJogo = ({ item: jogo }) => (
    <Card style={estilos.cartaoJogo} onPress={() => navegarParaDetalhes(jogo)}>
      <IconButton
        icon="heart"
        iconColor="#f44336"
        size={24}
        style={estilos.botaoFavorito}
        onPress={() => handleRemoverFavorito(jogo.id)}
      />
      
      {jogo.imagem && (
        <Card.Cover 
          source={{ uri: jogo.imagem }} 
          style={estilos.imagemJogo}
        />
      )}
      
      <Card.Content>
        <View style={estilos.cabecalhoJogo}>
          <Title style={estilos.nomeJogo} numberOfLines={1}>
            {jogo.nome}
          </Title>
          <Chip 
            style={estilos.chipCategoria}
            textStyle={estilos.textoChip}
          >
            {jogo.categoria}
          </Chip>
        </View>
        
        <Paragraph style={estilos.desenvolvedor} numberOfLines={1}>
          {jogo.desenvolvedor}
        </Paragraph>
        
        <Paragraph style={estilos.descricao} numberOfLines={2}>
          {jogo.descricao}
        </Paragraph>
        
        <View style={estilos.rodapeJogo}>
          <Text style={estilos.preco}>{formatarPreco(jogo.preco)}</Text>
          <Button 
            mode="contained"
            icon={verificarSeEstaNoCarrinho(jogo.id) ? "cart-check" : "cart-plus"}
            style={[
              estilos.botaoComprar,
              verificarSeEstaNoCarrinho(jogo.id) && estilos.botaoNoCarrinho
            ]}
            onPress={() => handleAdicionarCarrinho(jogo)}
            disabled={verificarSeEstaNoCarrinho(jogo.id)}
          >
            {verificarSeEstaNoCarrinho(jogo.id) ? 'No Carrinho' : 'Comprar'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderVazio = () => (
    <View style={estilos.containerVazio}>
      <IconButton 
        icon="heart-outline" 
        size={80} 
        iconColor="#666"
      />
      <Title style={estilos.tituloVazio}>Nenhum favorito ainda</Title>
      <Paragraph style={estilos.textoVazio}>
        Adicione jogos aos favoritos para vê-los aqui!
      </Paragraph>
      <Button 
        mode="contained" 
        icon="gamepad-variant"
        style={estilos.botaoExplorar}
        onPress={() => navigation.navigate('Categorias')}
      >
        Explorar Jogos
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={estilos.container}>
      {favoritos.length === 0 ? (
        renderVazio()
      ) : (
        <FlatList
          data={favoritos}
          renderItem={renderJogo}
          keyExtractor={(item) => item.id}
          contentContainerStyle={estilos.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Snackbar
        visible={snackbar.visivel}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visivel: false }))}
        duration={2000}
        style={estilos.snackbar}
      >
        {snackbar.mensagem}
      </Snackbar>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lista: {
    padding: 16,
    paddingBottom: 80,
  },
  cartaoJogo: {
    marginBottom: 12,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    position: 'relative',
  },
  botaoFavorito: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imagemJogo: {
    height: 180,
    backgroundColor: '#2A2A2A',
  },
  cabecalhoJogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginTop: 8,
  },
  nomeJogo: {
    flex: 1,
    marginRight: 12,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chipCategoria: {
    backgroundColor: '#2E7D32',
  },
  textoChip: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  desenvolvedor: {
    color: '#B0B0B0',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  descricao: {
    marginBottom: 16,
    lineHeight: 20,
    color: '#E0E0E0',
  },
  rodapeJogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  botaoComprar: {
    backgroundColor: '#4CAF50',
    minWidth: 100,
  },
  botaoNoCarrinho: {
    backgroundColor: '#2E7D32',
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  tituloVazio: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#B0B0B0',
    marginBottom: 24,
  },
  botaoExplorar: {
    backgroundColor: '#4CAF50',
  },
  snackbar: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default TelaFavoritos;
