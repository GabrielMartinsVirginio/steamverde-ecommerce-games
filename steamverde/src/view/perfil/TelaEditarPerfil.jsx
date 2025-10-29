import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Snackbar, Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../components/authProvider/ProvedorAutenticacao';
import AutenticacaoService from '../../service/autenticacao';

const TelaEditarPerfil = () => {
  const navigation = useNavigation();
  const { usuario } = useAuth();

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [visivel, setVisivel] = useState(false);

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const validarFormulario = () => {
    if (!nome || !email) {
      setMensagemSnackbar('Nome e email são obrigatórios');
      setVisivel(true);
      return false;
    }

    if (novaSenha || confirmarSenha) {
      if (!senhaAtual) {
        setMensagemSnackbar('Digite a senha atual para alterar a senha');
        setVisivel(true);
        return false;
      }

      if (novaSenha !== confirmarSenha) {
        setMensagemSnackbar('As senhas não coincidem');
        setVisivel(true);
        return false;
      }

      if (novaSenha.length < 6) {
        setMensagemSnackbar('A nova senha deve ter no mínimo 6 caracteres');
        setVisivel(true);
        return false;
      }
    }

    return true;
  };

  const salvarAlteracoes = async () => {
    if (!validarFormulario()) return;

    setCarregando(true);
    try {
      const dadosAtualizados = {
        nome,
        email,
      };

      if (novaSenha) {
        const verificacao = await AutenticacaoService.login(usuario.email, senhaAtual);
        if (!verificacao.sucesso) {
          setMensagemSnackbar('Senha atual incorreta');
          setVisivel(true);
          setCarregando(false);
          return;
        }
        dadosAtualizados.senha = novaSenha;
      }

      const resultado = await AutenticacaoService.atualizarUsuario(usuario.id, dadosAtualizados);

      if (resultado.sucesso) {
        setMensagemSnackbar('Perfil atualizado com sucesso!');
        setVisivel(true);
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');

        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        setMensagemSnackbar(resultado.erro || 'Erro ao atualizar perfil');
        setVisivel(true);
      }
    } catch (error) {
      setMensagemSnackbar('Erro ao salvar alterações');
      setVisivel(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header style={estilos.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Perfil" />
      </Appbar.Header>

      <ScrollView style={estilos.scroll}>
        <View style={estilos.conteudo}>
          <Card style={estilos.card}>
            <Card.Content>
              <Text style={estilos.secaoTitulo}>Informações Pessoais</Text>
              
              <TextInput
                label="Nome"
                value={nome}
                onChangeText={setNome}
                mode="outlined"
                style={estilos.input}
                outlineColor="#424242"
                activeOutlineColor="#4CAF50"
                textColor="#FFFFFF"
                left={<TextInput.Icon icon="account" color="#4CAF50" />}
                theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
              />

              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={estilos.input}
                keyboardType="email-address"
                autoCapitalize="none"
                outlineColor="#424242"
                activeOutlineColor="#4CAF50"
                textColor="#FFFFFF"
                left={<TextInput.Icon icon="email" color="#4CAF50" />}
                theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
              />
            </Card.Content>
          </Card>

          <Card style={estilos.card}>
            <Card.Content>
              <Text style={estilos.secaoTitulo}>Alterar Senha</Text>
              <Text style={estilos.secaoSubtitulo}>Deixe em branco para manter a senha atual</Text>

              <TextInput
                label="Senha Atual"
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                mode="outlined"
                style={estilos.input}
                secureTextEntry={!mostrarSenhaAtual}
                outlineColor="#424242"
                activeOutlineColor="#4CAF50"
                textColor="#FFFFFF"
                left={<TextInput.Icon icon="lock" color="#4CAF50" />}
                right={<TextInput.Icon icon={mostrarSenhaAtual ? "eye-off" : "eye"} color="#B0B0B0" onPress={() => setMostrarSenhaAtual(!mostrarSenhaAtual)} />}
                theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
              />

              <TextInput
                label="Nova Senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                mode="outlined"
                style={estilos.input}
                secureTextEntry={!mostrarNovaSenha}
                outlineColor="#424242"
                activeOutlineColor="#4CAF50"
                textColor="#FFFFFF"
                left={<TextInput.Icon icon="lock-outline" color="#4CAF50" />}
                right={<TextInput.Icon icon={mostrarNovaSenha ? "eye-off" : "eye"} color="#B0B0B0" onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)} />}
                theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
              />

              <TextInput
                label="Confirmar Nova Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                mode="outlined"
                style={estilos.input}
                secureTextEntry={!mostrarConfirmarSenha}
                outlineColor="#424242"
                activeOutlineColor="#4CAF50"
                textColor="#FFFFFF"
                left={<TextInput.Icon icon="lock-check" color="#4CAF50" />}
                right={<TextInput.Icon icon={mostrarConfirmarSenha ? "eye-off" : "eye"} color="#B0B0B0" onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} />}
                theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
              />
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={salvarAlteracoes}
            loading={carregando}
            disabled={carregando}
            style={estilos.botaoSalvar}
            icon="content-save"
          >
            Salvar Alterações
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={visivel}
        onDismiss={() => setVisivel(false)}
        duration={3000}
        action={{
          label: 'Fechar',
          onPress: () => setVisivel(false),
        }}
      >
        {mensagemSnackbar}
      </Snackbar>
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
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  secaoSubtitulo: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#2A2A2A',
  },
  botaoSalvar: {
    marginTop: 8,
    marginBottom: 24,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
});

export default TelaEditarPerfil;
