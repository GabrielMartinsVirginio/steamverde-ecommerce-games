import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, Surface } from 'react-native-paper';

const LoadingOverlay = ({ visible, mensagem = 'Carregando...', transparente = false }) => {
  if (!visible) return null;

  return (
    <View style={[estilos.overlay, transparente && estilos.transparente]}>
      <Surface style={estilos.container}>
        <ActivityIndicator size="large" color="#4CAF50" style={estilos.indicator} />
        <Text style={estilos.mensagem}>{mensagem}</Text>
      </Surface>
    </View>
  );
};

const estilos = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  transparente: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    elevation: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 16,
  },
  mensagem: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoadingOverlay;