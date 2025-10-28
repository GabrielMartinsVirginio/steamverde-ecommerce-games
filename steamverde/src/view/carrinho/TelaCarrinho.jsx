import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Paragraph, 
  Button,
  Text,
  IconButton,
  Divider,
  Surface,
  ActivityIndicator,
  Snackbar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCarrinhoContext } from '../components/authProvider/ProvedorCarrinho';

const TelaCarrinho = () => {
  const navigation = useNavigation();
  const { 
    itensCarrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    limparCarrinho, 
    calcularTotal,
    calcularQuantidadeTotal
  } = useCarrinhoContext();
  
  const [processandoCompra, setProcessandoCompra] = useState(false);
  const [snackbar, setSnackbar] = useState({ visivel: false, mensagem: '', tipo: 'success' });

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const aumentarQuantidade = (item) => {
    atualizarQuantidade(item.id, item.quantidade + 1);
  };

  const diminuirQuantidade = (item) => {
    if (item.quantidade > 1) {
      atualizarQuantidade(item.id, item.quantidade - 1);
    } else {
      confirmarRemocao(item);
    }
  };

  const confirmarRemocao = (item) => {
    Alert.alert(
      'Remover Item',
      `Deseja remover "${item.nome}" do carrinho?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => removerDoCarrinho(item.id) }
      ]
    );
  };

  const confirmarLimpeza = () => {
    Alert.alert(
      'Limpar Carrinho',
      'Deseja remover todos os itens do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: limparCarrinho }
      ]
    );
  };

  const finalizarCompra = async () => {
    if (itensCarrinho.length === 0) {
      mostrarSnackbar('Carrinho vazio. Adicione produtos para continuar.', 'error');
      return;
    }

    setProcessandoCompra(true);

    try {
      // Simular processamento da compra
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pedido = {
        id: Date.now().toString(),
        itens: itensCarrinho,
        total: calcularTotal(),
        data: new Date().toISOString(),
        status: 'confirmado'
      };

      console.log('Pedido criado:', pedido);
      
      limparCarrinho();
      mostrarSnackbar('Compra realizada com sucesso!', 'success');

      setTimeout(() => {
        navigation.navigate('Home');
      }, 2500);

    } catch (error) {
      console.error('Erro ao processar compra:', error);
      mostrarSnackbar('Erro ao processar compra. Tente novamente.', 'error');
    } finally {
      setProcessandoCompra(false);
    }
  };

  const mostrarSnackbar = (mensagem, tipo = 'success') => {
    setSnackbar({ visivel: true, mensagem, tipo });
  };

  const continuarComprando = () => {
    navigation.navigate('ListaJogos');
  };

  const renderizarItemCarrinho = ({ item }) => (
    <Card style={estilos.cartaoItem}>
      <Card.Content>
        <View style={estilos.cabecalhoItem}>
          <View style={estilos.infoItem}>
            <Title style={estilos.nomeItem} numberOfLines={1}>{item.nome}</Title>
            <Paragraph style={estilos.desenvolvedor}>{item.desenvolvedor}</Paragraph>
            <Text style={estilos.precoUnitario}>
              {formatarPreco(item.preco)} cada
            </Text>
          </View>
          
          <IconButton 
            icon="delete"
            iconColor="#f44336"
            size={20}
            onPress={() => confirmarRemocao(item)}
          />
        </View>

        <View style={estilos.rodapeItem}>
          <View style={estilos.controladorQuantidade}>
            <IconButton
              icon="minus"
              size={20}
              iconColor="#FFFFFF"
              containerColor="#f44336"
              style={estilos.botaoQuantidade}
              onPress={() => diminuirQuantidade(item)}
            />
            <Text style={estilos.textoQuantidade}>{item.quantidade}</Text>
            <IconButton
              icon="plus"
              size={20}
              iconColor="#FFFFFF"
              containerColor="#4CAF50"
              style={estilos.botaoQuantidade}
              onPress={() => aumentarQuantidade(item)}
            />
          </View>

          <Text style={estilos.precoTotal}>
            {formatarPreco(item.preco * item.quantidade)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderizarCarrinhoVazio = () => (
    <View style={estilos.containerVazio}>
      <Title style={estilos.textoVazio}>Carrinho Vazio</Title>
      <Paragraph style={estilos.subtextoVazio}>
        Adicione jogos ao seu carrinho para continuar
      </Paragraph>
      <Button 
        mode="contained" 
        onPress={continuarComprando}
        style={estilos.botaoContinuar}
        icon="gamepad-variant"
      >
        Explorar Jogos
      </Button>
    </View>
  );

  const renderizarResumo = () => (
    <Surface style={estilos.resumoCompra}>
      <Title style={estilos.tituloResumo}>Resumo da Compra</Title>
      
      <View style={estilos.linhaResumo}>
        <Text style={estilos.textoResumo}>
          Itens ({calcularQuantidadeTotal()}):
        </Text>
        <Text style={estilos.valorResumo}>
          {formatarPreco(calcularTotal())}
        </Text>
      </View>
      
      <Divider style={estilos.divisorResumo} />
      
      <View style={estilos.linhaTotal}>
        <Text style={estilos.textoTotal}>Total:</Text>
        <Text style={estilos.valorTotal}>
          {formatarPreco(calcularTotal())}
        </Text>
      </View>

      <View style={estilos.containerBotoesCompra}>
        <Button 
          mode="outlined" 
          onPress={confirmarLimpeza}
          style={estilos.botaoLimpar}
          disabled={processandoCompra}
        >
          Limpar Carrinho
        </Button>
        
        <Button 
          mode="contained" 
          onPress={finalizarCompra}
          style={estilos.botaoFinalizar}
          disabled={processandoCompra}
          icon={processandoCompra ? undefined : "credit-card"}
        >
          {processandoCompra ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Finalizar Compra'
          )}
        </Button>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header style={{ backgroundColor: '#1E1E1E' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title={`Carrinho (${calcularQuantidadeTotal()})`} titleStyle={{ color: '#FFFFFF' }} />
        {itensCarrinho.length > 0 && (
          <Appbar.Action 
            icon="cart-plus" 
            onPress={continuarComprando}
            color="#FFFFFF"
          />
        )}
      </Appbar.Header>

      {itensCarrinho.length === 0 ? (
        renderizarCarrinhoVazio()
      ) : (
        <View style={estilos.conteudoCarrinho}>
          <FlatList
            data={itensCarrinho}
            renderItem={renderizarItemCarrinho}
            keyExtractor={(item) => item.id}
            contentContainerStyle={estilos.listaItens}
            showsVerticalScrollIndicator={false}
          />
          
          {renderizarResumo()}
        </View>
      )}

      <Snackbar
        visible={snackbar.visivel}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visivel: false }))}
        duration={3000}
        style={[
          estilos.snackbar,
          { backgroundColor: snackbar.tipo === 'error' ? '#f44336' : '#4CAF50' }
        ]}
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
  conteudoCarrinho: {
    flex: 1,
  },
  listaItens: {
    padding: 16,
    paddingBottom: 0,
  },
  cartaoItem: {
    marginBottom: 12,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },
  cabecalhoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
    marginRight: 8,
  },
  nomeItem: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desenvolvedor: {
    color: '#B0B0B0',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  precoUnitario: {
    color: '#888',
    fontSize: 12,
  },
  rodapeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controladorQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 4,
    gap: 8,
  },
  botaoQuantidade: {
    margin: 0,
  },
  textoQuantidade: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  precoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  resumoCompra: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#1E1E1E',
  },
  tituloResumo: {
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textoResumo: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  valorResumo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divisorResumo: {
    marginVertical: 12,
    backgroundColor: '#333333',
  },
  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textoTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  containerBotoesCompra: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoLimpar: {
    flex: 1,
    borderColor: '#f44336',
    borderWidth: 2,
  },
  botaoFinalizar: {
    flex: 2,
    backgroundColor: '#4CAF50',
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#B0B0B0',
    marginBottom: 8,
  },
  subtextoVazio: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 24,
  },
  botaoContinuar: {
    backgroundColor: '#4CAF50',
  },
  snackbar: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default TelaCarrinho;