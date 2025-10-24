import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Surface, 
  Title, 
  Button, 
  Chip,
  TextInput,
  Text,
  Divider,
  IconButton
} from 'react-native-paper';

const FiltroJogos = ({ 
  onFiltroChange, 
  filtroAtual = { categorias: [], precoMin: '', precoMax: '', ordenacao: 'nome' } 
}) => {
  const [filtroLocal, setFiltroLocal] = useState(filtroAtual);
  const [expandido, setExpandido] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(filtroAtual);

  const categorias = [
    'Ação', 'Aventura', 'RPG', 'Estratégia', 'Esportes', 
    'Corrida', 'Simulação', 'Puzzle', 'Terror', 'Indie'
  ];

  const opcoesOrdenacao = [
    { valor: 'nome', label: 'Nome A-Z' },
    { valor: 'nome-desc', label: 'Nome Z-A' },
    { valor: 'preco', label: 'Menor Preço' },
    { valor: 'preco-desc', label: 'Maior Preço' }
  ];

  const toggleCategoria = (categoria) => {
    setFiltroLocal(prev => {
      const categorias = prev.categorias.includes(categoria)
        ? prev.categorias.filter(c => c !== categoria)
        : [...prev.categorias, categoria];
      return { ...prev, categorias };
    });
  };

  const aplicarFiltros = () => {
    onFiltroChange(filtroLocal);
    setFiltroAplicado(filtroLocal);
    setExpandido(false);
  };

  const limparFiltros = () => {
    const filtroVazio = { categorias: [], precoMin: '', precoMax: '', ordenacao: 'nome' };
    setFiltroLocal(filtroVazio);
    setFiltroAplicado(filtroVazio);
    onFiltroChange(filtroVazio);
  };

  const contarFiltrosAtivos = () => {
    let count = 0;
    if (filtroAplicado.categorias.length > 0) count++;
    if (filtroAplicado.precoMin || filtroAplicado.precoMax) count++;
    if (filtroAplicado.ordenacao !== 'nome') count++;
    return count;
  };

  const temAlteracoesPendentes = () => {
    return JSON.stringify(filtroLocal) !== JSON.stringify(filtroAplicado);
  };

  if (!expandido) {
    return (
      <Surface style={estilos.containerRecolhido}>
        <View style={estilos.cabecalhoRecolhido}>
          <Button 
            mode="outlined" 
            icon="filter-variant"
            onPress={() => setExpandido(true)}
            style={estilos.botaoFiltro}
            compact
          >
            Filtros {contarFiltrosAtivos() > 0 && `(${contarFiltrosAtivos()})`}
          </Button>
          
          {contarFiltrosAtivos() > 0 && (
            <Button 
              mode="text" 
              onPress={limparFiltros}
              compact
              textColor="#666"
            >
              Limpar
            </Button>
          )}
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Title style={estilos.titulo}>Filtros</Title>
        <IconButton 
          icon="close" 
          size={20}
          onPress={() => setExpandido(false)}
        />
      </View>

      <View style={estilos.secao}>
        <Text style={estilos.tituloSecao}>Categorias</Text>
        <View style={estilos.containerChips}>
          {categorias.map(categoria => (
            <Chip
              key={categoria}
              selected={filtroLocal.categorias.includes(categoria)}
              onPress={() => toggleCategoria(categoria)}
              style={[
                estilos.chip,
                filtroLocal.categorias.includes(categoria) && estilos.chipSelecionado
              ]}
              textStyle={filtroLocal.categorias.includes(categoria) ? estilos.textoChipSelecionado : estilos.textoChip}
              mode={filtroLocal.categorias.includes(categoria) ? 'flat' : 'outlined'}
            >
              {categoria}
            </Chip>
          ))}
        </View>
      </View>

      <Divider style={estilos.divisor} />

      <View style={estilos.secao}>
        <Text style={estilos.tituloSecao}>Faixa de Preço</Text>
        <View style={estilos.containerPreco}>
          <TextInput
            label="Preço Min"
            value={filtroLocal.precoMin}
            onChangeText={(valor) => setFiltroLocal(prev => ({ ...prev, precoMin: valor }))}
            keyboardType="decimal-pad"
            mode="outlined"
            style={estilos.inputPreco}
            dense
            placeholder="0,00"
          />
          <Text style={estilos.textoAte}>até</Text>
          <TextInput
            label="Preço Max"
            value={filtroLocal.precoMax}
            onChangeText={(valor) => setFiltroLocal(prev => ({ ...prev, precoMax: valor }))}
            keyboardType="decimal-pad"
            mode="outlined"
            style={estilos.inputPreco}
            dense
            placeholder="999,99"
          />
        </View>
      </View>

      <Divider style={estilos.divisor} />

      <View style={estilos.secao}>
        <Text style={estilos.tituloSecao}>Ordenar por</Text>
        <View style={estilos.containerOrdenacao}>
          {opcoesOrdenacao.map(opcao => (
            <Chip
              key={opcao.valor}
              selected={filtroLocal.ordenacao === opcao.valor}
              onPress={() => setFiltroLocal(prev => ({ ...prev, ordenacao: opcao.valor }))}
              style={[
                estilos.chip,
                filtroLocal.ordenacao === opcao.valor && estilos.chipSelecionado
              ]}
              textStyle={filtroLocal.ordenacao === opcao.valor ? estilos.textoChipSelecionado : estilos.textoChip}
              mode={filtroLocal.ordenacao === opcao.valor ? 'flat' : 'outlined'}
            >
              {opcao.label}
            </Chip>
          ))}
        </View>
      </View>

      <View style={estilos.containerBotoes}>
        <Button 
          mode="outlined" 
          onPress={limparFiltros}
          style={estilos.botaoLimpar}
        >
          Limpar
        </Button>
        <Button 
          mode="contained" 
          onPress={aplicarFiltros}
          style={[
            estilos.botaoAplicar,
            temAlteracoesPendentes() && estilos.botaoAplicarDestaque
          ]}
          icon={temAlteracoesPendentes() ? "check" : "filter-check"}
        >
          {temAlteracoesPendentes() ? 'Aplicar Filtros' : 'Filtros Aplicados'}
        </Button>
      </View>
    </Surface>
  );
};

const estilos = StyleSheet.create({
  containerRecolhido: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    elevation: 2,
    borderRadius: 8,
  },
  cabecalhoRecolhido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    color: '#2E7D32',
    fontSize: 18,
  },
  secao: {
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  containerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 4,
  },
  chipSelecionado: {
    backgroundColor: '#4CAF50',
  },
  textoChip: {
    color: '#666',
  },
  textoChipSelecionado: {
    color: 'white',
  },
  containerPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputPreco: {
    flex: 1,
    backgroundColor: 'white',
  },
  textoAte: {
    color: '#666',
    fontSize: 14,
  },
  containerOrdenacao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  divisor: {
    marginVertical: 12,
    backgroundColor: '#E0E0E0',
  },
  containerBotoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  botaoLimpar: {
    flex: 1,
    borderColor: '#666',
  },
  botaoAplicar: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  botaoAplicarDestaque: {
    backgroundColor: '#2E7D32',
    elevation: 4,
  },
  botaoFiltro: {
    borderColor: '#4CAF50',
  },
});

export default FiltroJogos;