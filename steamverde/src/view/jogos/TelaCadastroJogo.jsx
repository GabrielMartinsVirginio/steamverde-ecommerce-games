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

const TelaCadastroJogo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const jogoParaEditar = route.params?.jogo;
  const isEdicao = !!jogoParaEditar;

  const [formulario, setFormulario] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    desenvolvedor: '',
    dataLancamento: ''
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
        dataLancamento: jogoParaEditar.dataLancamento || ''
      });
    }
  }, [isEdicao, jogoParaEditar]);

  const atualizarCampo = (campo, valor) => {
    setFormulario(prev => ({ ...prev, [campo]: valor }));
    if (erros[campo]) {
      setErros(prev => ({ ...prev, [campo]: null }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formulario.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!formulario.preco.trim()) {
      novosErros.preco = 'Preço é obrigatório';
    } else {
      const preco = parseFloat(formulario.preco);
      if (isNaN(preco) || preco <= 0) {
        novosErros.preco = 'Preço deve ser maior que 0';
      }
    }

    if (!formulario.categoria.trim()) {
      novosErros.categoria = 'Categoria é obrigatória';
    }

    if (!formulario.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!formulario.desenvolvedor.trim()) {
      novosErros.desenvolvedor = 'Desenvolvedor é obrigatório';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const salvarJogo = async () => {
    if (!validarFormulario()) {
      mostrarSnackbar('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    setSalvando(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const jogoData = {
        id: isEdicao ? jogoParaEditar.id : Date.now().toString(),
        nome: formulario.nome.trim(),
        preco: parseFloat(formulario.preco),
        categoria: formulario.categoria,
        descricao: formulario.descricao.trim(),
        desenvolvedor: formulario.desenvolvedor.trim(),
        dataLancamento: formulario.dataLancamento || new Date().toISOString().split('T')[0],
        criadoEm: isEdicao ? jogoParaEditar.criadoEm : new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      };

      console.log('Jogo salvo:', jogoData);
      
      mostrarSnackbar(
        isEdicao ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!', 
        'success'
      );

      setTimeout(() => {
        navigation.goBack();
      }, 2000);

    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
      mostrarSnackbar('Erro ao salvar jogo. Tente novamente.', 'error');
    } finally {
      setSalvando(false);
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
    setSalvando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Jogo excluído:', jogoParaEditar.id);
      mostrarSnackbar('Jogo excluído com sucesso!', 'success');
      
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao excluir jogo:', error);
      mostrarSnackbar('Erro ao excluir jogo. Tente novamente.', 'error');
    } finally {
      setSalvando(false);
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
      dataLancamento: ''
    });
    setErros({});
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEdicao ? 'Editar Jogo' : 'Cadastrar Jogo'} />
        {isEdicao && (
          <Appbar.Action 
            icon="delete" 
            onPress={confirmarExclusao}
            disabled={salvando}
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
              disabled={salvando}
            />
            {erros.nome && <Text style={estilos.textoErro}>{erros.nome}</Text>}

            <TextInput
              label="Preço (R$) *"
              value={formulario.preco}
              onChangeText={(valor) => atualizarCampo('preco', valor)}
              mode="outlined"
              keyboardType="numeric"
              style={estilos.input}
              error={!!erros.preco}
              disabled={salvando}
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
                  disabled={salvando}
                  right={<TextInput.Icon icon="chevron-down" onPress={() => setMenuCategoria(true)} />}
                  onFocus={() => setMenuCategoria(true)}
                  showSoftInputOnFocus={false}
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
              disabled={salvando}
            />
            {erros.desenvolvedor && <Text style={estilos.textoErro}>{erros.desenvolvedor}</Text>}

            <TextInput
              label="Data de Lançamento"
              value={formulario.dataLancamento}
              onChangeText={(valor) => atualizarCampo('dataLancamento', valor)}
              mode="outlined"
              placeholder="AAAA-MM-DD"
              style={estilos.input}
              disabled={salvando}
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
              disabled={salvando}
            />
            {erros.descricao && <Text style={estilos.textoErro}>{erros.descricao}</Text>}

            <Divider style={estilos.divisor} />

            <View style={estilos.containerBotoes}>
              <Button 
                mode="contained" 
                onPress={salvarJogo}
                style={estilos.botaoSalvar}
                disabled={salvando}
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
                  disabled={salvando}
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
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  conteudo: {
    flex: 1,
  },
  cartaoFormulario: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  tituloFormulario: {
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  inputDescricao: {
    marginBottom: 12,
    backgroundColor: 'white',
    minHeight: 100,
  },
  textoErro: {
    color: '#f44336',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 12,
  },
  divisor: {
    marginVertical: 20,
    backgroundColor: '#E0E0E0',
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