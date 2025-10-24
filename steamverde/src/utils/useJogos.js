import { useState, useCallback, useEffect } from 'react';
import AsyncStorageService from '../service/AsyncStorageService';
import TratamentoErroService from '../service/TratamentoErroService';

const jogosIniciais = [
  {
    id: '1',
    nome: 'Cyberpunk 2077',
    preco: 199.90,
    categoria: 'RPG',
    descricao: 'Um RPG de ação em mundo aberto que se passa em Night City.',
    desenvolvedor: 'CD Projekt RED',
    dataLancamento: '2020-12-10',
    criadoEm: '2024-01-01T00:00:00.000Z',
    atualizadoEm: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    nome: 'The Witcher 3',
    preco: 149.90,
    categoria: 'RPG',
    descricao: 'RPG de fantasia com mundo aberto e escolhas que impactam a história.',
    desenvolvedor: 'CD Projekt RED',
    dataLancamento: '2015-05-19',
    criadoEm: '2024-01-02T00:00:00.000Z',
    atualizadoEm: '2024-01-02T00:00:00.000Z'
  }
];

export const useJogos = () => {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [operacaoAtual, setOperacaoAtual] = useState('');

  useEffect(() => {
    const inicializarJogos = async () => {
      setCarregando(true);
      setOperacaoAtual('Carregando jogos...');
      setErro(null);
      
      try {
        const operacaoCarregar = AsyncStorageService.carregarJogos();
        const jogosSalvos = await TratamentoErroService.simularTimeoutOperacao(operacaoCarregar, 5000);
        
        if (jogosSalvos.length > 0) {
          setJogos(jogosSalvos);
        } else {
          setJogos(jogosIniciais);
          await AsyncStorageService.salvarJogos(jogosIniciais);
        }
      } catch (error) {
        const erroInfo = TratamentoErroService.loggarErro(error, 'inicializarJogos');
        setErro(erroInfo);
        setJogos(jogosIniciais);
      } finally {
        setCarregando(false);
        setOperacaoAtual('');
      }
    };

    inicializarJogos();
  }, []);

  const buscarJogos = useCallback(async () => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCarregando(false);
    return jogos;
  }, [jogos]);

  const buscarJogoPorId = useCallback((id) => {
    return jogos.find(jogo => jogo.id === id);
  }, [jogos]);

  const salvarJogo = useCallback(async (dadosJogo) => {
    setCarregando(true);
    const isEdicao = dadosJogo.id && jogos.find(j => j.id === dadosJogo.id);
    setOperacaoAtual(isEdicao ? 'Atualizando jogo...' : 'Salvando jogo...');
    setErro(null);
    
    try {
      let jogosAtualizados;
      
      if (isEdicao) {
        jogosAtualizados = jogos.map(jogo => 
          jogo.id === dadosJogo.id 
            ? { ...dadosJogo, atualizadoEm: new Date().toISOString() }
            : jogo
        );
      } else {
        const novoJogo = {
          ...dadosJogo,
          id: Date.now().toString(),
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString()
        };
        jogosAtualizados = [...jogos, novoJogo];
      }
      
      const operacaoSalvar = AsyncStorageService.salvarJogos(jogosAtualizados);
      await TratamentoErroService.simularTimeoutOperacao(operacaoSalvar, 8000);
      setJogos(jogosAtualizados);
      
      return { sucesso: true };
    } catch (error) {
      const erroInfo = TratamentoErroService.loggarErro(error, 'salvarJogo');
      setErro(erroInfo);
      return { 
        sucesso: false, 
        erro: TratamentoErroService.obterMensagemUsuario(error),
        recuperavel: TratamentoErroService.podeRecuperar(error)
      };
    } finally {
      setCarregando(false);
      setOperacaoAtual('');
    }
  }, [jogos]);

  const excluirJogo = useCallback(async (id) => {
    setCarregando(true);
    setOperacaoAtual('Excluindo jogo...');
    setErro(null);
    
    try {
      const jogosAtualizados = jogos.filter(jogo => jogo.id !== id);
      const operacaoExcluir = AsyncStorageService.salvarJogos(jogosAtualizados);
      await TratamentoErroService.simularTimeoutOperacao(operacaoExcluir, 8000);
      setJogos(jogosAtualizados);
      return { sucesso: true };
    } catch (error) {
      const erroInfo = TratamentoErroService.loggarErro(error, 'excluirJogo');
      setErro(erroInfo);
      return { 
        sucesso: false, 
        erro: TratamentoErroService.obterMensagemUsuario(error),
        recuperavel: TratamentoErroService.podeRecuperar(error)
      };
    } finally {
      setCarregando(false);
      setOperacaoAtual('');
    }
  }, [jogos]);

  const limparErro = useCallback(() => {
    setErro(null);
  }, []);

  return {
    jogos,
    carregando,
    erro,
    operacaoAtual,
    buscarJogos,
    buscarJogoPorId,
    salvarJogo,
    excluirJogo,
    limparErro
  };
};