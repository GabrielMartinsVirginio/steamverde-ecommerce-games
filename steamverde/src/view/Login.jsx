import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Card, Text, HelperText, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './components/authProvider/ProvedorAutenticacao';

const Login = () => {
  const navigation = useNavigation();
  const { login, carregando } = useAuth();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const [autenticando, setAutenticando] = useState(false);

  const handleLogin = async () => {
    setErro('');
    
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos');
      return;
    }

    setAutenticando(true);
    const resultado = await login(email.trim(), senha);
    setAutenticando(false);

    if (resultado.sucesso) {
      navigation.replace('Home');
    } else {
      setErro(resultado.erro || 'Erro ao fazer login');
    }
  };

  const navegarParaCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView 
        contentContainerStyle={estilos.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.conteudo}>
          <Card style={estilos.cartao}>
            <Card.Content>
              <Title style={estilos.titulo}>SteamVerde Login</Title>
              
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(texto) => {
                  setEmail(texto);
                  setErro('');
                }}
                style={estilos.input}
                keyboardType="email-address"
                autoCapitalize="none"
                disabled={autenticando}
                error={!!erro}
              />
              
              <TextInput
                label="Senha"
                mode="outlined"
                value={senha}
                onChangeText={(texto) => {
                  setSenha(texto);
                  setErro('');
                }}
                secureTextEntry={!senhaVisivel}
                style={estilos.input}
                disabled={autenticando}
                error={!!erro}
                right={
                  <TextInput.Icon
                    icon={senhaVisivel ? "eye-off" : "eye"}
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                  />
                }
              />

              {erro ? (
                <HelperText type="error" visible={!!erro} style={estilos.erro}>
                  {erro}
                </HelperText>
              ) : null}
              
              <Button 
                mode="contained" 
                onPress={handleLogin}
                style={estilos.botao}
                disabled={autenticando}
                icon={autenticando ? undefined : "login"}
              >
                {autenticando ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  'Entrar'
                )}
              </Button>

              <View style={estilos.divisor}>
                <View style={estilos.linhaDivisor} />
                <Text style={estilos.textoDivisor}>ou</Text>
                <View style={estilos.linhaDivisor} />
              </View>

              <Button 
                mode="outlined" 
                onPress={navegarParaCadastro}
                style={estilos.botaoCadastro}
                disabled={autenticando}
                icon="account-plus"
              >
                Criar Conta
              </Button>

              <View style={estilos.containerDica}>
                <Text style={estilos.textoDica}>💡 Contas de teste:</Text>
                <Text style={estilos.textoDicaInfo}>Admin: admin@admin.com / admin123</Text>
                <Text style={estilos.textoDicaInfo}>Usuário: gabriel@vianna.com / 123456</Text>
              </View>
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
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cartao: {
    padding: 20,
    elevation: 4,
    borderRadius: 12,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#2E7D32',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  erro: {
    marginBottom: 8,
  },
  botao: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  linhaDivisor: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  textoDivisor: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  botaoCadastro: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    paddingVertical: 6,
  },
  containerDica: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  textoDica: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  textoDicaInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});

export default Login;