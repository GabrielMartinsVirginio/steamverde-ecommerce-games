import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Paragraph, 
  Button,
  Chip,
  ActivityIndicator,
  Text,
  FAB
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useJogos } from '../../utils/useJogos';

const TelaListaJogos = () => {
  const navigation = useNavigation();
  const { jogos, carregando, buscarJogos } = useJogos();
  const [atualizando, setAtualizando] = useState(false);

  const carregarJogos = async () => {
    setAtualizando(true);
    await buscarJogos();
    setAtualizando(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarJogos();
    }, [])
  );

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const navegarParaDetalhe = (jogo) => {
    navigation.navigate('DetalheJogo', { jogo });
  };

  const navegarParaEdicao = (jogo) => {
    navigation.navigate('CadastroJogo', { jogo });
  };

  const renderizarJogo = ({ item: jogo }) => (
    <Card style={estilos.cartaoJogo} onPress={() => navegarParaDetalhe(jogo)}>
      <Card.Content>
        <View style={estilos.cabecalhoJogo}>
          <Title style={estilos.nomeJogo} numberOfLines={1}>{jogo.nome}</Title>
          <Chip 
            style={estilos.chipCategoria}
            textStyle={estilos.textoChip}
            compact
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
          
          <View style={estilos.containerBotoes}>
            <Button 
              mode="outlined" 
              compact
              style={estilos.botaoEditar}
              onPress={() => navegarParaEdicao(jogo)}
            >
              Editar
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderizarVazio = () => (
    <View style={estilos.containerVazio}>
      <Title style={estilos.textoVazio}>Nenhum jogo encontrado</Title>
      <Paragraph style={estilos.subtextoVazio}>
        Adicione seu primeiro jogo ao catálogo
      </Paragraph>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('CadastroJogo')}
        style={estilos.botaoAdicionar}
      >
        Adicionar Jogo
      </Button>
    </View>
  );

  if (carregando && jogos.length === 0) {
    return (
      <SafeAreaView style={estilos.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Lista de Jogos" />
        </Appbar.Header>
        
        <View style={estilos.containerCarregando}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={estilos.textoCarregando}>Carregando jogos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Jogos (${jogos.length})`} />
      </Appbar.Header>

      <FlatList
        data={jogos}
        renderItem={renderizarJogo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={jogos.length === 0 ? estilos.listaVazia : estilos.lista}
        ListEmptyComponent={renderizarVazio}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={carregarJogos}
            colors={['#4CAF50']}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={estilos.fab}
        onPress={() => navigation.navigate('CadastroJogo')}
        label="Adicionar"
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  lista: {
    padding: 16,
    paddingBottom: 80,
  },
  listaVazia: {
    flex: 1,
  },
  cartaoJogo: {
    marginBottom: 12,
    elevation: 3,
    borderRadius: 12,
  },
  cabecalhoJogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nomeJogo: {
    flex: 1,
    marginRight: 12,
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chipCategoria: {
    backgroundColor: '#E8F5E8',
  },
  textoChip: {
    color: '#2E7D32',
    fontSize: 12,
  },
  desenvolvedor: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  descricao: {
    marginBottom: 16,
    lineHeight: 20,
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
  containerBotoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    borderColor: '#4CAF50',
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  subtextoVazio: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 24,
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
  },
  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
});

export default TelaListaJogos;