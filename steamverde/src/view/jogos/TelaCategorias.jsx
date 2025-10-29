import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { 
  Card,
  Title,
  Text,
  Avatar,
  Chip,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useJogos } from '../../utils/useJogos';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const TelaCategorias = () => {
  const navigation = useNavigation();
  const { jogos, buscarJogos } = useJogos();
  const [categorias, setCategorias] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarCategorias();
    }, [jogos])
  );

  const carregarCategorias = () => {
    const categoriasUnicas = [...new Set(jogos.map(jogo => jogo.categoria))];
    const categoriasComContagem = categoriasUnicas.map(categoria => {
      const jogosCategoria = jogos.filter(jogo => jogo.categoria === categoria);
      return {
        nome: categoria,
        quantidade: jogosCategoria.length,
        jogos: jogosCategoria,
      };
    });
    setCategorias(categoriasComContagem);
  };

  const navegarParaListaComFiltro = (categoria) => {
    navigation.navigate('ListaJogos', { categoriaSelecionada: categoria });
  };

  const getIconeCategoria = (categoria) => {
    const icones = {
      'Ação': 'sword-cross',
      'Aventura': 'map-marker-path',
      'RPG': 'shield-sword',
      'Estratégia': 'chess-rook',
      'Corrida': 'car-sports',
      'Esportes': 'soccer',
      'Simulação': 'airplane',
      'Terror': 'ghost',
      'Luta': 'boxing-glove',
      'Puzzle': 'puzzle',
      'Música': 'music-note',
      'Plataforma': 'gamepad-variant',
    };
    return icones[categoria] || 'gamepad';
  };

  const getCorCategoria = (categoria) => {
    const cores = {
      'Ação': ['#FF5722', '#E64A19'],
      'Aventura': ['#2196F3', '#1976D2'],
      'RPG': ['#9C27B0', '#7B1FA2'],
      'Estratégia': ['#FF9800', '#F57C00'],
      'Corrida': ['#F44336', '#D32F2F'],
      'Esportes': ['#4CAF50', '#388E3C'],
      'Simulação': ['#00BCD4', '#0097A7'],
      'Terror': ['#795548', '#5D4037'],
      'Luta': ['#FF5722', '#E64A19'],
      'Puzzle': ['#673AB7', '#512DA8'],
      'Música': ['#E91E63', '#C2185B'],
      'Plataforma': ['#3F51B5', '#303F9F'],
    };
    return cores[categoria] || ['#4CAF50', '#2E7D32'];
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Title style={estilos.tituloPrincipal}>Categorias</Title>
        <Text style={estilos.subtitulo}>Explore jogos por categoria</Text>
      </View>

      <ScrollView 
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.grid}>
          {categorias.map((categoria, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navegarParaListaComFiltro(categoria.nome)}
              style={estilos.cardWrapper}
            >
              <LinearGradient
                colors={getCorCategoria(categoria.nome)}
                style={estilos.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Surface style={estilos.cardConteudo}>
                  <Avatar.Icon
                    size={50}
                    icon={getIconeCategoria(categoria.nome)}
                    style={estilos.iconeCategoria}
                    color="#FFFFFF"
                  />
                  <Title style={estilos.nomeCategoria} numberOfLines={1}>
                    {categoria.nome}
                  </Title>
                  <Chip 
                    style={estilos.chipQuantidade}
                    textStyle={estilos.textoChip}
                  >
                    {categoria.quantidade} {categoria.quantidade === 1 ? 'jogo' : 'jogos'}
                  </Chip>
                </Surface>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {categorias.length === 0 && (
          <View style={estilos.containerVazio}>
            <Avatar.Icon 
              size={80} 
              icon="package-variant" 
              style={estilos.iconeVazio}
            />
            <Title style={estilos.tituloVazio}>Nenhuma categoria encontrada</Title>
            <Text style={estilos.textoVazio}>
              Aguarde enquanto carregamos o catálogo de jogos.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  cabecalho: {
    padding: 20,
    paddingBottom: 12,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  conteudo: {
    padding: 16,
    paddingBottom: 80,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  cardGradient: {
    padding: 2,
    borderRadius: 16,
  },
  cardConteudo: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    alignItems: 'center',
    borderRadius: 14,
    minHeight: 180,
    justifyContent: 'center',
  },
  iconeCategoria: {
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  nomeCategoria: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  chipQuantidade: {
    backgroundColor: '#2A2A2A',
  },
  textoChip: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  iconeVazio: {
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  tituloVazio: {
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  textoVazio: {
    textAlign: 'center',
    color: '#B0B0B0',
    paddingHorizontal: 32,
  },
});

export default TelaCategorias;
