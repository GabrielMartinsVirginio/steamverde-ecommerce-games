import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Appbar, 
  Title, 
  Paragraph, 
  Button, 
  Card, 
  Chip, 
  Text,
  Divider,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCarrinhoContext } from '../components/authProvider/ProvedorCarrinho';
import { useAuth } from '../components/authProvider/ProvedorAutenticacao';

const TelaDetalheJogo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const jogo = route.params?.jogo;
  const { adicionarAoCarrinho, verificarSeEstaNoCarrinho } = useCarrinhoContext();
  const { ehAdmin } = useAuth();

  // Jogo padrão caso não seja passado parâmetro
  const jogoDefault = {
    id: '1',
    nome: 'Cyberpunk 2077',
    preco: 199.90,
    categoria: 'RPG',
    descricao: 'Um RPG de ação em mundo aberto que se passa em Night City, uma megalópole obcecada por poder, glamour e modificações corporais. Você joga como V, um mercenário marginal atrás de um implante único que é a chave para a imortalidade.',
    desenvolvedor: 'CD Projekt RED',
    dataLancamento: '2020-12-10'
  };

  const jogoAtual = jogo || jogoDefault;

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleAdicionarCarrinho = () => {
    adicionarAoCarrinho(jogoAtual);
    navigation.navigate('Carrinho');
  };

  const handleEditar = () => {
    navigation.navigate('CadastroJogo', { jogo: jogoAtual });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhe do Jogo" />
        {ehAdmin() && (
          <Appbar.Action icon="pencil" onPress={handleEditar} />
        )}
      </Appbar.Header>

      <ScrollView style={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <Card style={estilos.cartaoPrincipal}>
          <Card.Content>
            <View style={estilos.cabecalho}>
              <Title style={estilos.nomeJogo}>{jogoAtual.nome}</Title>
              <Chip 
                style={estilos.chipCategoria}
                textStyle={estilos.textoChip}
              >
                {jogoAtual.categoria}
              </Chip>
            </View>

            <Text style={estilos.desenvolvedor}>
              por {jogoAtual.desenvolvedor}
            </Text>

            <Text style={estilos.preco}>
              {formatarPreco(jogoAtual.preco)}
            </Text>

            <Divider style={estilos.divisor} />

            <Title style={estilos.secaoTitulo}>Descrição</Title>
            <Paragraph style={estilos.descricao}>
              {jogoAtual.descricao}
            </Paragraph>

            <Divider style={estilos.divisor} />

            <Title style={estilos.secaoTitulo}>Informações</Title>
            <View style={estilos.infoContainer}>
              <View style={estilos.infoItem}>
                <Text style={estilos.infoLabel}>Desenvolvedor:</Text>
                <Text style={estilos.infoValor}>{jogoAtual.desenvolvedor}</Text>
              </View>
              
              <View style={estilos.infoItem}>
                <Text style={estilos.infoLabel}>Categoria:</Text>
                <Text style={estilos.infoValor}>{jogoAtual.categoria}</Text>
              </View>
              
              <View style={estilos.infoItem}>
                <Text style={estilos.infoLabel}>Lançamento:</Text>
                <Text style={estilos.infoValor}>
                  {formatarData(jogoAtual.dataLancamento)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <Surface style={estilos.rodape}>
        <View style={estilos.containerBotoes}>
          <Button 
            mode={verificarSeEstaNoCarrinho(jogoAtual.id) ? "contained" : "contained"}
            style={[
              estilos.botaoComprar,
              verificarSeEstaNoCarrinho(jogoAtual.id) && estilos.botaoNoCarrinho
            ]}
            onPress={handleAdicionarCarrinho}
            icon={verificarSeEstaNoCarrinho(jogoAtual.id) ? "check" : "cart-plus"}
          >
            {verificarSeEstaNoCarrinho(jogoAtual.id) ? "No Carrinho" : "Adicionar ao Carrinho"}
          </Button>
        </View>
      </Surface>
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
  },
  cartaoPrincipal: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nomeJogo: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 12,
  },
  chipCategoria: {
    backgroundColor: '#E8F5E8',
  },
  textoChip: {
    color: '#2E7D32',
    fontSize: 12,
  },
  desenvolvedor: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  preco: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  divisor: {
    marginVertical: 16,
    backgroundColor: '#E0E0E0',
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 8,
  },
  infoContainer: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoValor: {
    fontSize: 14,
    color: '#333',
  },
  rodape: {
    padding: 16,
    elevation: 8,
  },
  containerBotoes: {
    gap: 12,
  },
  botaoComprar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
  },
  botaoNoCarrinho: {
    backgroundColor: '#2E7D32',
  },
});

export default TelaDetalheJogo;