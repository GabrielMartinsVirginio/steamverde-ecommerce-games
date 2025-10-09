import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Card style={estilos.cartao}>
          <Card.Content>
            <Title style={estilos.titulo}>SteamVerde Login</Title>
            
            <TextInput
              label="Email"
              mode="outlined"
              style={estilos.input}
            />
            
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              style={estilos.input}
            />
            
            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={estilos.botao}
            >
              Entrar
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cartao: {
    padding: 20,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#2E7D32',
  },
  input: {
    marginBottom: 15,
  },
  botao: {
    marginTop: 20,
  },
});

export default Login;