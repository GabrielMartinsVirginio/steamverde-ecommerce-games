import { useState, useCallback } from 'react';

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
  const [jogos, setJogos] = useState(jogosIniciais);
  const [carregando, setCarregando] = useState(false);

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (dadosJogo.id && jogos.find(j => j.id === dadosJogo.id)) {
        setJogos(prev => prev.map(jogo => 
          jogo.id === dadosJogo.id 
            ? { ...dadosJogo, atualizadoEm: new Date().toISOString() }
            : jogo
        ));
      } else {
        const novoJogo = {
          ...dadosJogo,
          id: Date.now().toString(),
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString()
        };
        setJogos(prev => [...prev, novoJogo]);
      }
      
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: error.message };
    } finally {
      setCarregando(false);
    }
  }, [jogos]);

  const excluirJogo = useCallback(async (id) => {
    setCarregando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJogos(prev => prev.filter(jogo => jogo.id !== id));
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: error.message };
    } finally {
      setCarregando(false);
    }
  }, []);

  return {
    jogos,
    carregando,
    buscarJogos,
    buscarJogoPorId,
    salvarJogo,
    excluirJogo
  };
};