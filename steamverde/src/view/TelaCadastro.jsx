import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Card, Text, HelperText, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './components/authProvider/ProvedorAutenticacao';
import Usuario from '../model/Usuario';

const TelaCadastro = () => {
  const navigation = useNavigation();
  const { cadastrar } = useAuth();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [cadastrando, setCadastrando] = useState(false);

  const validarCampo = (campo, valor) => {
    const novosErros = { ...erros };

    switch (campo) {
      case 'nome':
        if (!Usuario.validarNome(valor)) {
          novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
        } else {
          delete novosErros.nome;
        }
        break;
      case 'email':
        if (!Usuario.validarEmail(valor)) {
          novosErros.email = 'Email inválido';
        } else {
          delete novosErros.email;
        }
        break;
      case 'senha':
        if (!Usuario.validarSenha(valor)) {
          novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
        } else {
          delete novosErros.senha;
        }
        if (confirmarSenha && valor !== confirmarSenha) {
          novosErros.confirmarSenha = 'As senhas não coincidem';
        } else if (confirmarSenha) {
          delete novosErros.confirmarSenha;
        }
        break;
      case 'confirmarSenha':
        if (valor !== senha) {
          novosErros.confirmarSenha = 'As senhas não coincidem';
        } else {
          delete novosErros.confirmarSenha;
        }
        break;
      default:
        break;
    }

    setErros(novosErros);
  };

  const handleCadastro = async () => {
    validarCampo('nome', nome);
    validarCampo('email', email);
    validarCampo('senha', senha);
    validarCampo('confirmarSenha', confirmarSenha);

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      setErros(prev => ({ ...prev, geral: 'Preencha todos os campos' }));
      return;
    }

    if (senha !== confirmarSenha) {
      setErros(prev => ({ ...prev, confirmarSenha: 'As senhas não coincidem' }));
      return;
    }

    if (Object.keys(erros).length > 0) {
      return;
    }

    setCadastrando(true);
    const resultado = await cadastrar(nome, email, senha);
    setCadastrando(false);

    if (resultado.sucesso) {
      navigation.replace('Login');
    } else {
      setErros({ geral: resultado.erro || 'Erro ao cadastrar' });
    }
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
              <Title style={estilos.titulo}>Criar Conta</Title>
              <Text style={estilos.subtitulo}>Cadastre-se como usuário comum</Text>
              
              <TextInput
                label="Nome Completo"
                mode="outlined"
                value={nome}
                onChangeText={(texto) => {
                  setNome(texto);
                  validarCampo('nome', texto);
                }}
                style={estilos.input}
                disabled={cadastrando}
                error={!!erros.nome}
              />
              {erros.nome && (
                <HelperText type="error" visible={!!erros.nome}>
                  {erros.nome}
                </HelperText>
              )}
              
              <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={(texto) => {
                  setEmail(texto);
                  validarCampo('email', texto);
                }}
                style={estilos.input}
                keyboardType="email-address"
                autoCapitalize="none"
                disabled={cadastrando}
                error={!!erros.email}
              />
              {erros.email && (
                <HelperText type="error" visible={!!erros.email}>
                  {erros.email}
                </HelperText>
              )}
              
              <TextInput
                label="Senha"
                mode="outlined"
                value={senha}
                onChangeText={(texto) => {
                  setSenha(texto);
                  validarCampo('senha', texto);
                }}
                secureTextEntry={!senhaVisivel}
                style={estilos.input}
                disabled={cadastrando}
                error={!!erros.senha}
                right={
                  <TextInput.Icon
                    icon={senhaVisivel ? "eye-off" : "eye"}
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                  />
                }
              />
              {erros.senha && (
                <HelperText type="error" visible={!!erros.senha}>
                  {erros.senha}
                </HelperText>
              )}

              <TextInput
                label="Confirmar Senha"
                mode="outlined"
                value={confirmarSenha}
                onChangeText={(texto) => {
                  setConfirmarSenha(texto);
                  validarCampo('confirmarSenha', texto);
                }}
                secureTextEntry={!confirmarSenhaVisivel}
                style={estilos.input}
                disabled={cadastrando}
                error={!!erros.confirmarSenha}
                right={
                  <TextInput.Icon
                    icon={confirmarSenhaVisivel ? "eye-off" : "eye"}
                    onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
                  />
                }
              />
              {erros.confirmarSenha && (
                <HelperText type="error" visible={!!erros.confirmarSenha}>
                  {erros.confirmarSenha}
                </HelperText>
              )}

              {erros.geral && (
                <HelperText type="error" visible={!!erros.geral} style={estilos.erroGeral}>
                  {erros.geral}
                </HelperText>
              )}
              
              <Button 
                mode="contained" 
                onPress={handleCadastro}
                style={estilos.botao}
                disabled={cadastrando}
                icon={cadastrando ? undefined : "account-plus"}
              >
                {cadastrando ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  'Cadastrar'
                )}
              </Button>

              <Button 
                mode="text" 
                onPress={() => navigation.goBack()}
                style={estilos.botaoVoltar}
                disabled={cadastrando}
              >
                Já tenho conta
              </Button>
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
    marginBottom: 8,
    color: '#2E7D32',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitulo: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    fontSize: 14,
  },
  input: {
    marginBottom: 4,
    backgroundColor: 'white',
  },
  erroGeral: {
    marginTop: 8,
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
  },
  botaoVoltar: {
    marginTop: 12,
  },
});

export default TelaCadastro;
