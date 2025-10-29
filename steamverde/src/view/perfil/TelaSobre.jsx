import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Title, Paragraph, Divider, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TelaSobre = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header style={estilos.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Sobre o App" />
      </Appbar.Header>

      <ScrollView style={estilos.scroll}>
        <View style={estilos.conteudo}>
          <Card style={estilos.card}>
            <Card.Content>
              <Title style={estilos.titulo}>Steam Verde</Title>
              <Chip icon="gamepad-variant" style={estilos.chip} textStyle={estilos.chipTexto}>
                Loja de Games
              </Chip>
              
              <Divider style={estilos.divisor} />

              <Paragraph style={estilos.paragrafo}>
                Bem-vindo à Steam Verde, sua loja virtual de games preferida! Aqui você encontra os melhores jogos 
                para todas as plataformas com preços incríveis e promoções imperdíveis.
              </Paragraph>

              <Paragraph style={estilos.paragrafo}>
                Nossa missão é democratizar o acesso aos jogos digitais, oferecendo uma experiência de compra 
                simples, segura e rápida. Com um catálogo diversificado que inclui desde os grandes lançamentos 
                AAA até indies aclamados pela crítica, temos opções para todos os gostos e estilos de jogadores.
              </Paragraph>

              <Paragraph style={estilos.paragrafo}>
                Na Steam Verde, você pode navegar por diversas categorias, adicionar jogos aos favoritos, 
                gerenciar seu carrinho de compras e muito mais. Tudo isso em uma interface moderna e intuitiva, 
                pensada para proporcionar a melhor experiência possível.
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={estilos.card}>
            <Card.Content>
              <Title style={estilos.subtitulo}>Recursos</Title>
              <View style={estilos.recursosContainer}>
                <Text style={estilos.recurso}>• Catálogo completo de jogos</Text>
                <Text style={estilos.recurso}>• Sistema de favoritos</Text>
                <Text style={estilos.recurso}>• Carrinho de compras integrado</Text>
                <Text style={estilos.recurso}>• Navegação por categorias</Text>
                <Text style={estilos.recurso}>• Detalhes completos de cada jogo</Text>
                <Text style={estilos.recurso}>• Interface responsiva e moderna</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={estilos.card}>
            <Card.Content>
              <Title style={estilos.subtitulo}>Desenvolvimento</Title>
              <Divider style={estilos.divisor} />
              
              <View style={estilos.infoRow}>
                <Text style={estilos.label}>Desenvolvedor:</Text>
                <Text style={estilos.valor}>Gabriel Martins Virginio</Text>
              </View>

              <View style={estilos.infoRow}>
                <Text style={estilos.label}>Versão:</Text>
                <Text style={estilos.valor}>1.0.0</Text>
              </View>

              <View style={estilos.infoRow}>
                <Text style={estilos.label}>Tecnologias:</Text>
                <Text style={estilos.valor}>React Native + Expo</Text>
              </View>

              <View style={estilos.infoRow}>
                <Text style={estilos.label}>Ano:</Text>
                <Text style={estilos.valor}>2025</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={estilos.cardFooter}>
            <Card.Content>
              <Paragraph style={estilos.footerTexto}>
                © 2025 Steam Verde. Todos os direitos reservados.
              </Paragraph>
              <Paragraph style={estilos.footerTexto}>
                Desenvolvido com ❤️ para gamers.
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#1E1E1E',
    elevation: 2,
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    elevation: 2,
  },
  cardFooter: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    elevation: 2,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  chip: {
    alignSelf: 'center',
    backgroundColor: '#2E7D32',
    marginBottom: 16,
  },
  chipTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  divisor: {
    marginVertical: 12,
    backgroundColor: '#2A2A2A',
  },
  paragrafo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E0E0E0',
    textAlign: 'justify',
    marginBottom: 12,
  },
  recursosContainer: {
    marginTop: 8,
  },
  recurso: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 8,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  valor: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  footerTexto: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default TelaSobre;
