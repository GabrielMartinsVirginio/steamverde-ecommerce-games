import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  Title, 
  Card,
  Snackbar,
  ActivityIndicator,
  Menu,
  Divider,
  Text,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ValidacaoService from '../../service/ValidacaoService';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { useJogos } from '../../utils/useJogos';

const TelaCadastroJogo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const jogoParaEditar = route.params?.jogo;
  const isEdicao = !!jogoParaEditar;
  const { salvarJogo: salvarJogoHook, excluirJogo: excluirJogoHook, carregando: carregandoHook, operacaoAtual, erro: erroHook, limparErro } = useJogos();

  const [formulario, setFormulario] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    desenvolvedor: '',
    dataLancamento: '',
    imagem: ''
  });

  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [snackbar, setSnackbar] = useState({ visivel: false, mensagem: '', tipo: 'success' });
  const [menuCategoria, setMenuCategoria] = useState(false);

  const categorias = [
    'Ação', 'Aventura', 'RPG', 'Estratégia', 'Esportes', 
    'Corrida', 'Simulação', 'Puzzle', 'Terror', 'Indie'
  ];

  useEffect(() => {
    if (isEdicao && jogoParaEditar) {
      setFormulario({
        nome: jogoParaEditar.nome || '',
        preco: jogoParaEditar.preco?.toString() || '',
        categoria: jogoParaEditar.categoria || '',
        descricao: jogoParaEditar.descricao || '',
        desenvolvedor: jogoParaEditar.desenvolvedor || '',
        dataLancamento: jogoParaEditar.dataLancamento || '',
        imagem: jogoParaEditar.imagem || ''
      });
    }
  }, [isEdicao, jogoParaEditar]);

  const atualizarCampo = (campo, valor) => {
    setFormulario(prev => ({ ...prev, [campo]: valor }));
    
    setTimeout(() => {
      validarCampoIndividual(campo, valor);
    }, 300);
  };

  const validarCampoIndividual = (campo, valor) => {
    let errosCampo = [];
    
    switch (campo) {
      case 'nome':
        errosCampo = ValidacaoService.validarNomeJogo(valor);
        break;
      case 'preco':
        errosCampo = ValidacaoService.validarPreco(valor);
        break;
      case 'categoria':
        errosCampo = ValidacaoService.validarCategoria(valor);
        break;
      case 'descricao':
        errosCampo = ValidacaoService.validarDescricao(valor);
        break;
      case 'desenvolvedor':
        errosCampo = ValidacaoService.validarDesenvolvedor(valor);
        break;
      case 'dataLancamento':
        errosCampo = ValidacaoService.validarDataLancamento(valor);
        break;
      default:
        break;
    }

    if (errosCampo.length > 0) {
      setErros(prev => ({ ...prev, [campo]: errosCampo[0] }));
    } else {
      setErros(prev => ({ ...prev, [campo]: null }));
    }
  };

  const validarFormulario = () => {
    const resultado = ValidacaoService.validarFormularioCompleto(formulario);
    setErros(resultado.erros);
    return resultado.valido;
  };

  const salvarJogo = async () => {
    if (!validarFormulario()) {
      mostrarSnackbar('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    limparErro();

    try {
      const jogoData = {
        id: isEdicao ? jogoParaEditar.id : Date.now().toString(),
        nome: formulario.nome.trim(),
        preco: ValidacaoService.formatarPrecoParaSalvar(formulario.preco),
        categoria: formulario.categoria,
        descricao: formulario.descricao.trim(),
        desenvolvedor: formulario.desenvolvedor.trim(),
        dataLancamento: formulario.dataLancamento || new Date().toISOString().split('T')[0],
        imagem: formulario.imagem.trim(),
        criadoEm: isEdicao ? jogoParaEditar.criadoEm : new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      };

      const resultado = await salvarJogoHook(jogoData);
      
      if (resultado.sucesso) {
        mostrarSnackbar(
          isEdicao ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!', 
          'success'
        );
        
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        mostrarSnackbar(resultado.erro || 'Erro ao salvar jogo', 'error');
      }

    } catch (error) {
      mostrarSnackbar('Erro inesperado ao salvar jogo', 'error');
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este jogo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: excluirJogo }
      ]
    );
  };

  const excluirJogo = async () => {
    limparErro();
    
    try {
      const resultado = await excluirJogoHook(jogoParaEditar.id);
      
      if (resultado.sucesso) {
        mostrarSnackbar('Jogo excluído com sucesso!', 'success');
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        mostrarSnackbar(resultado.erro || 'Erro ao excluir jogo', 'error');
      }
      
    } catch (error) {
      mostrarSnackbar('Erro inesperado ao excluir jogo', 'error');
    }
  };

  const mostrarSnackbar = (mensagem, tipo = 'success') => {
    setSnackbar({ visivel: true, mensagem, tipo });
  };

  const limparFormulario = () => {
    setFormulario({
      nome: '',
      preco: '',
      categoria: '',
      descricao: '',
      desenvolvedor: '',
      dataLancamento: '',
      imagem: ''
    });
    setErros({});
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header style={{ backgroundColor: '#1E1E1E' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title={isEdicao ? 'Editar Jogo' : 'Cadastrar Jogo'} titleStyle={{ color: '#FFFFFF' }} />
        {isEdicao && (
          <Appbar.Action 
            icon="delete" 
            onPress={confirmarExclusao}
            disabled={carregandoHook}
            color="#FFFFFF"
          />
        )}
      </Appbar.Header>

      <ScrollView style={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <Card style={estilos.cartaoFormulario}>
          <Card.Content>
            <Title style={estilos.tituloFormulario}>
              {isEdicao ? 'Editar Produto' : 'Novo Produto'}
            </Title>
            
            <TextInput
              label="Nome do Jogo *"
              value={formulario.nome}
              onChangeText={(valor) => atualizarCampo('nome', valor)}
              mode="outlined"
              style={estilos.input}
              error={!!erros.nome}
              disabled={carregandoHook}
              placeholder="Ex: Cyberpunk 2077"
              maxLength={100}
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />
            <View style={estilos.infoInput}>
              {erros.nome && <Text style={estilos.textoErro}>{erros.nome}</Text>}
              <Text style={estilos.contadorCaracteres}>
                {formulario.nome.length}/100
              </Text>
            </View>

            <TextInput
              label="Preço (R$) *"
              value={formulario.preco}
              onChangeText={(valor) => {
                const valorFormatado = valor.replace(/[^0-9,\.]/g, '');
                atualizarCampo('preco', valorFormatado);
              }}
              mode="outlined"
              keyboardType="decimal-pad"
              style={estilos.input}
              error={!!erros.preco}
              disabled={carregandoHook}
              placeholder="Ex: 99,90"
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />
            {erros.preco && <Text style={estilos.textoErro}>{erros.preco}</Text>}

              <Menu
              visible={menuCategoria}
              onDismiss={() => setMenuCategoria(false)}
              anchor={
                <TextInput
                  label="Categoria *"
                  value={formulario.categoria}
                  mode="outlined"
                  style={estilos.input}
                  error={!!erros.categoria}
                  disabled={carregandoHook}
                  right={<TextInput.Icon icon="chevron-down" onPress={() => setMenuCategoria(true)} />}
                  onFocus={() => setMenuCategoria(true)}
                  showSoftInputOnFocus={false}
                  textColor="#FFFFFF"
                  outlineColor="#4CAF50"
                  activeOutlineColor="#4CAF50"
                  theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
                />
              }
            >
              {categorias.map((categoria) => (
                <Menu.Item
                  key={categoria}
                  onPress={() => {
                    atualizarCampo('categoria', categoria);
                    setMenuCategoria(false);
                  }}
                  title={categoria}
                />
              ))}
            </Menu>
            {erros.categoria && <Text style={estilos.textoErro}>{erros.categoria}</Text>}

            <TextInput
              label="Desenvolvedor *"
              value={formulario.desenvolvedor}
              onChangeText={(valor) => atualizarCampo('desenvolvedor', valor)}
              mode="outlined"
              style={estilos.input}
              error={!!erros.desenvolvedor}
              disabled={carregandoHook}
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />
            {erros.desenvolvedor && <Text style={estilos.textoErro}>{erros.desenvolvedor}</Text>}

            <TextInput
              label="URL da Imagem"
              value={formulario.imagem}
              onChangeText={(valor) => atualizarCampo('imagem', valor)}
              mode="outlined"
              style={estilos.input}
              disabled={carregandoHook}
              placeholder="https://exemplo.com/imagem.jpg"
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />

            <TextInput
              label="Data de Lançamento"
              value={formulario.dataLancamento}
              onChangeText={(valor) => atualizarCampo('dataLancamento', valor)}
              mode="outlined"
              placeholder="AAAA-MM-DD"
              style={estilos.input}
              disabled={carregandoHook}
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />

            <TextInput
              label="Descrição *"
              value={formulario.descricao}
              onChangeText={(valor) => atualizarCampo('descricao', valor)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={estilos.inputDescricao}
              error={!!erros.descricao}
              disabled={carregandoHook}
              placeholder="Descreva o jogo, gameplay, enredo..."
              maxLength={500}
              textColor="#FFFFFF"
              placeholderTextColor="#888"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              theme={{ colors: { onSurfaceVariant: '#B0B0B0' } }}
            />
            <View style={estilos.infoInput}>
              {erros.descricao && <Text style={estilos.textoErro}>{erros.descricao}</Text>}
              <Text style={estilos.contadorCaracteres}>
                {formulario.descricao.length}/500
              </Text>
            </View>

            <Divider style={estilos.divisor} />

            <View style={estilos.containerBotoes}>
              <Button 
                mode="contained" 
                onPress={salvarJogo}
                style={estilos.botaoSalvar}
                disabled={carregandoHook}
                icon={salvando ? undefined : (isEdicao ? "content-save" : "plus")}
              >
                {salvando ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  isEdicao ? 'Atualizar' : 'Cadastrar'
                )}
              </Button>

              {!isEdicao && (
                <Button 
                  mode="outlined" 
                  onPress={limparFormulario}
                  style={estilos.botaoLimpar}
                  disabled={carregandoHook}
                >
                  Limpar
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

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

      <LoadingOverlay 
        visible={carregandoHook} 
        mensagem={operacaoAtual || 'Processando...'}
      />
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  conteudo: {
    flex: 1,
  },
  cartaoFormulario: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },
  tituloFormulario: {
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#2A2A2A',
  },
  inputDescricao: {
    marginBottom: 12,
    backgroundColor: '#2A2A2A',
    minHeight: 100,
  },
  infoInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 12,
  },
  textoErro: {
    color: '#f44336',
    fontSize: 12,
    flex: 1,
  },
  contadorCaracteres: {
    color: '#B0B0B0',
    fontSize: 11,
    fontStyle: 'italic',
  },
  divisor: {
    marginVertical: 20,
    backgroundColor: '#333333',
  },
  containerBotoes: {
    gap: 12,
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoLimpar: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    paddingVertical: 8,
    borderRadius: 8,
  },
  snackbar: {
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default TelaCadastroJogo;
