import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Text, IconButton } from 'react-native-paper';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_MARGIN = 10;

const CarrosselJogos = ({ jogos, onJogoPress }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const scrollViewRef = React.useRef(null);

  const navegarAnterior = () => {
    if (indiceAtual > 0) {
      const novoIndice = indiceAtual - 1;
      setIndiceAtual(novoIndice);
      scrollViewRef.current?.scrollTo({
        x: novoIndice * (CARD_WIDTH + CARD_MARGIN * 2),
        animated: true
      });
    }
  };

  const navegarProximo = () => {
    if (indiceAtual < jogos.length - 1) {
      const novoIndice = indiceAtual + 1;
      setIndiceAtual(novoIndice);
      scrollViewRef.current?.scrollTo({
        x: novoIndice * (CARD_WIDTH + CARD_MARGIN * 2),
        animated: true
      });
    }
  };

  const formatarPreco = (preco) => {
    if (preco === 0) return 'GRÁTIS';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN * 2));
    setIndiceAtual(index);
  };

  if (!jogos || jogos.length === 0) return null;

  return (
    <View style={estilos.container}>
      <View style={estilos.controles}>
        <IconButton
          icon="chevron-left"
          size={32}
          iconColor="#4CAF50"
          style={[estilos.botaoNavegacao, indiceAtual === 0 && estilos.botaoDesabilitado]}
          onPress={navegarAnterior}
          disabled={indiceAtual === 0}
        />
        
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={estilos.scrollContent}
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          decelerationRate="fast"
        >
          {jogos.map((jogo) => (
            <TouchableOpacity
              key={jogo.id}
              activeOpacity={0.9}
              onPress={() => onJogoPress(jogo)}
            >
              <Card style={estilos.card}>
                {jogo.imagem ? (
                  <Image
                    source={{ uri: jogo.imagem }}
                    style={estilos.imagem}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={estilos.imagemPlaceholder}>
                    <Text style={estilos.placeholderTexto}>Sem imagem</Text>
                  </View>
                )}
                <Card.Content style={estilos.conteudo}>
                  <Title style={estilos.titulo} numberOfLines={1}>
                    {jogo.nome}
                  </Title>
                  <Text style={estilos.desenvolvedor} numberOfLines={1}>
                    {jogo.desenvolvedor}
                  </Text>
                  <View style={estilos.rodape}>
                    <Text style={estilos.categoria}>{jogo.categoria}</Text>
                    <Text style={estilos.preco}>{formatarPreco(jogo.preco)}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <IconButton
          icon="chevron-right"
          size={32}
          iconColor="#4CAF50"
          style={[estilos.botaoNavegacao, indiceAtual === jogos.length - 1 && estilos.botaoDesabilitado]}
          onPress={navegarProximo}
          disabled={indiceAtual === jogos.length - 1}
        />
      </View>

      <View style={estilos.indicadores}>
        {jogos.map((_, index) => (
          <View
            key={index}
            style={[
              estilos.indicador,
              index === indiceAtual && estilos.indicadorAtivo
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  botaoNavegacao: {
    backgroundColor: '#1E1E1E',
    elevation: 4,
  },
  botaoDesabilitado: {
    opacity: 0.3,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    elevation: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  imagem: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  imagemPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTexto: {
    color: '#666',
    fontSize: 16,
  },
  conteudo: {
    padding: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  desenvolvedor: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoria: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: '600',
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
  },
  indicadorAtivo: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
});

export default CarrosselJogos;
