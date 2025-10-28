import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, Alert } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Paragraph, 
  Button,
  Chip,
  ActivityIndicator,
  Text,
  FAB,
  Badge,
  Snackbar,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useJogos } from '../../utils/useJogos';
import { useCarrinhoContext } from '../components/authProvider/ProvedorCarrinho';
import { useAuth } from '../components/authProvider/ProvedorAutenticacao';
import FiltroJogos from '../components/common/FiltroJogos';

const TelaListaJogos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { jogos, carregando, buscarJogos, excluirJogo } = useJogos();
  const { adicionarAoCarrinho, verificarSeEstaNoCarrinho, calcularQuantidadeTotal } = useCarrinhoContext();
  const { ehAdmin } = useAuth();
  const [atualizando, setAtualizando] = useState(false);
  const [snackbar, setSnackbar] = useState({ visivel: false, mensagem: '' });
  
  const termoBuscaRecebido = route.params?.termoBusca;
  const [jogosFiltrados, setJogosFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({ 
    categorias: [], 
    precoMin: '', 
    precoMax: '', 
    ordenacao: 'nome' 
  });
  const [filtrosAplicados, setFiltrosAplicados] = useState({ 
    categorias: [], 
    precoMin: '', 
    precoMax: '', 
    ordenacao: 'nome' 
  });

  const aplicarFiltrosEOrdenacao = (jogosBase, termoBusca, filtrosAtivos) => {
    let jogosProcessados = [...jogosBase];

    if (termoBusca) {
      const termo = termoBusca.toLowerCase().trim();
      jogosProcessados = jogosProcessados.filter(jogo => 
        jogo.nome.toLowerCase().includes(termo) ||
        jogo.categoria.toLowerCase().includes(termo) ||
        jogo.desenvolvedor.toLowerCase().includes(termo) ||
        jogo.descricao.toLowerCase().includes(termo)
      );
    }

    if (filtrosAtivos.categorias.length > 0) {
      jogosProcessados = jogosProcessados.filter(jogo => 
        filtrosAtivos.categorias.includes(jogo.categoria)
      );
    }

    if (filtrosAtivos.precoMin || filtrosAtivos.precoMax) {
      const precoMin = filtrosAtivos.precoMin ? parseFloat(filtrosAtivos.precoMin.replace(',', '.')) : 0;
      const precoMax = filtrosAtivos.precoMax ? parseFloat(filtrosAtivos.precoMax.replace(',', '.')) : Infinity;
      
      jogosProcessados = jogosProcessados.filter(jogo => 
        jogo.preco >= precoMin && jogo.preco <= precoMax
      );
    }

    switch (filtrosAtivos.ordenacao) {
      case 'nome':
        jogosProcessados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'nome-desc':
        jogosProcessados.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case 'preco':
        jogosProcessados.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-desc':
        jogosProcessados.sort((a, b) => b.preco - a.preco);
        break;
      default:
        break;
    }

    return jogosProcessados;
  };

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

  useEffect(() => {
    const jogosProcessados = aplicarFiltrosEOrdenacao(jogos, termoBuscaRecebido, filtrosAplicados);
    setJogosFiltrados(jogosProcessados);
  }, [jogos, termoBuscaRecebido, filtrosAplicados]);

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setFiltrosAplicados(novosFiltros);
  };

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

  const adicionarJogoAoCarrinho = (jogo) => {
    if (verificarSeEstaNoCarrinho(jogo.id)) {
      navegarParaCarrinho();
      return;
    }
    
    adicionarAoCarrinho(jogo);
    setSnackbar({ 
      visivel: true, 
      mensagem: `${jogo.nome} adicionado ao carrinho!` 
    });
  };

  const navegarParaCarrinho = () => {
    navigation.navigate('Carrinho');
  };

  const confirmarExclusao = (jogo) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir "${jogo.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: async () => {
            const resultado = await excluirJogo(jogo.id);
            if (resultado.sucesso) {
              setSnackbar({ 
                visivel: true, 
                mensagem: `${jogo.nome} excluído com sucesso!` 
              });
              carregarJogos();
            } else {
              setSnackbar({ 
                visivel: true, 
                mensagem: `Erro ao excluir: ${resultado.erro}` 
              });
            }
          }
        }
      ]
    );
  };

  const renderizarJogo = ({ item: jogo }) => (
    <Card style={estilos.cartaoJogo} onPress={() => navegarParaDetalhe(jogo)}>
      {jogo.imagem && (
        <Card.Cover 
          source={{ uri: jogo.imagem }} 
          style={estilos.imagemJogo}
          resizeMode="cover"
        />
      )}
      {ehAdmin() && (
        <IconButton
          icon="delete"
          iconColor="#f44336"
          containerColor="rgba(0, 0, 0, 0.6)"
          size={20}
          style={estilos.botaoExcluir}
          onPress={() => confirmarExclusao(jogo)}
        />
      )}
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
              mode="contained"
              compact
              style={[
                estilos.botaoComprar,
                verificarSeEstaNoCarrinho(jogo.id) && estilos.botaoNoCarrinho
              ]}
              onPress={() => adicionarJogoAoCarrinho(jogo)}
              icon={verificarSeEstaNoCarrinho(jogo.id) ? "cart-arrow-right" : "cart-plus"}
            >
              {verificarSeEstaNoCarrinho(jogo.id) ? "Ver Carrinho" : "Comprar"}
            </Button>
            
            {ehAdmin() && (
              <Button 
                mode="outlined" 
                compact
                style={estilos.botaoEditar}
                onPress={() => navegarParaEdicao(jogo)}
              >
                Editar
              </Button>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderizarVazio = () => (
    <View style={estilos.containerVazio}>
      <Title style={estilos.textoVazio}>
        {termoBuscaRecebido ? `Nenhum jogo encontrado para "${termoBuscaRecebido}"` : 'Nenhum jogo encontrado'}
      </Title>
      <Paragraph style={estilos.subtextoVazio}>
        {termoBuscaRecebido ? 'Tente outro termo de busca' : 'Adicione seu primeiro jogo ao catálogo'}
      </Paragraph>
      {!termoBuscaRecebido && ehAdmin() && (
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('CadastroJogo')}
          style={estilos.botaoAdicionar}
        >
          Adicionar Jogo
        </Button>
      )}
    </View>
  );

  const dadosParaExibir = jogosFiltrados;
  const tituloTela = termoBuscaRecebido ? `Busca: ${termoBuscaRecebido}` : `Jogos (${jogos.length})`;

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
        <Appbar.Content title={tituloTela} />
        <View style={estilos.containerCarrinhoHeader}>
          <Appbar.Action 
            icon="cart" 
            onPress={navegarParaCarrinho}
          />
          {calcularQuantidadeTotal() > 0 && (
            <Badge style={estilos.badgeCarrinho}>
              {calcularQuantidadeTotal()}
            </Badge>
          )}
        </View>
      </Appbar.Header>

      <FiltroJogos 
        onFiltroChange={handleFiltroChange}
        filtroAtual={filtros}
      />

      <FlatList
        data={dadosParaExibir}
        renderItem={renderizarJogo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={dadosParaExibir.length === 0 ? estilos.listaVazia : estilos.lista}
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

      {ehAdmin() && (
        <FAB
          icon="plus"
          style={estilos.fab}
          onPress={() => navigation.navigate('CadastroJogo')}
          label="Adicionar"
        />
      )}

      <Snackbar
        visible={snackbar.visivel}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visivel: false }))}
        duration={2000}
        style={estilos.snackbar}
        action={{
          label: 'Ver Carrinho',
          onPress: navegarParaCarrinho,
        }}
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
  listaVazia: {
    flex: 1,
  },
  cartaoJogo: {
    marginBottom: 12,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    position: 'relative',
  },
  botaoExcluir: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    elevation: 5,
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
  containerBotoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoComprar: {
    backgroundColor: '#4CAF50',
    minWidth: 100,
  },
  botaoNoCarrinho: {
    backgroundColor: '#2E7D32',
  },
  botaoEditar: {
    borderColor: '#4CAF50',
  },
  containerCarrinhoHeader: {
    position: 'relative',
  },
  badgeCarrinho: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: 12,
    minWidth: 20,
    height: 20,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
    marginBottom: 16,
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