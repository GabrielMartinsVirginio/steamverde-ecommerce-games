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
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
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
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
    criadoEm: '2024-01-02T00:00:00.000Z',
    atualizadoEm: '2024-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    nome: 'FIFA 24',
    preco: 249.90,
    categoria: 'Esportes',
    descricao: 'O jogo de futebol mais realista do mundo com tecnologia HyperMotion.',
    desenvolvedor: 'EA Sports',
    dataLancamento: '2023-09-29',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg',
    criadoEm: '2024-01-03T00:00:00.000Z',
    atualizadoEm: '2024-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    nome: 'Grand Theft Auto V',
    preco: 89.90,
    categoria: 'Ação',
    descricao: 'Aventura de ação em mundo aberto em Los Santos com três protagonistas jogáveis e modo online.',
    desenvolvedor: 'Rockstar Games',
    dataLancamento: '2013-09-17',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    criadoEm: '2024-01-04T00:00:00.000Z',
    atualizadoEm: '2024-01-04T00:00:00.000Z'
  },
  {
    id: '5',
    nome: 'Forza Horizon 5',
    preco: 179.90,
    categoria: 'Corrida',
    descricao: 'Corrida em mundo aberto no México com centenas de carros.',
    desenvolvedor: 'Playground Games',
    dataLancamento: '2021-11-09',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    criadoEm: '2024-01-05T00:00:00.000Z',
    atualizadoEm: '2024-01-05T00:00:00.000Z'
  },
  {
    id: '6',
    nome: 'Phasmophobia',
    preco: 35.90,
    categoria: 'Terror',
    descricao: 'Jogo cooperativo de investigação paranormal para até 4 jogadores.',
    desenvolvedor: 'Kinetic Games',
    dataLancamento: '2020-09-18',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg',
    criadoEm: '2024-01-06T00:00:00.000Z',
    atualizadoEm: '2024-01-06T00:00:00.000Z'
  },
  {
    id: '7',
    nome: 'Portal 2',
    preco: 29.90,
    categoria: 'Puzzle',
    descricao: 'Jogo de quebra-cabeças em primeira pessoa com portais.',
    desenvolvedor: 'Valve',
    dataLancamento: '2011-04-19',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg',
    criadoEm: '2024-01-07T00:00:00.000Z',
    atualizadoEm: '2024-01-07T00:00:00.000Z'
  },
  {
    id: '8',
    nome: 'Age of Empires IV',
    preco: 129.90,
    categoria: 'Estratégia',
    descricao: 'Jogo de estratégia em tempo real com civilizações históricas.',
    desenvolvedor: 'Relic Entertainment',
    dataLancamento: '2021-10-28',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg',
    criadoEm: '2024-01-08T00:00:00.000Z',
    atualizadoEm: '2024-01-08T00:00:00.000Z'
  },
  {
    id: '10',
    nome: 'Red Dead Redemption 2',
    preco: 199.90,
    categoria: 'Ação',
    descricao: 'Épico faroeste em mundo aberto ambientado em 1899 na América.',
    desenvolvedor: 'Rockstar Games',
    dataLancamento: '2018-10-26',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    criadoEm: '2024-01-10T00:00:00.000Z',
    atualizadoEm: '2024-01-10T00:00:00.000Z'
  },
  {
    id: '11',
    nome: 'Stardew Valley',
    preco: 24.90,
    categoria: 'Simulação',
    descricao: 'Simulador de fazenda relaxante com exploração, relacionamentos e crafting.',
    desenvolvedor: 'ConcernedApe',
    dataLancamento: '2016-02-26',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    criadoEm: '2024-01-11T00:00:00.000Z',
    atualizadoEm: '2024-01-11T00:00:00.000Z'
  },
  {
    id: '12',
    nome: 'Hollow Knight',
    preco: 39.90,
    categoria: 'Indie',
    descricao: 'Metroidvania desafiador com arte em 2D e exploração atmosférica.',
    desenvolvedor: 'Team Cherry',
    dataLancamento: '2017-02-24',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',
    criadoEm: '2024-01-12T00:00:00.000Z',
    atualizadoEm: '2024-01-12T00:00:00.000Z'
  },
  {
    id: '13',
    nome: 'Resident Evil 4 Remake',
    preco: 249.90,
    categoria: 'Terror',
    descricao: 'Remake do clássico survival horror com gráficos modernos e jogabilidade renovada.',
    desenvolvedor: 'Capcom',
    dataLancamento: '2023-03-24',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    criadoEm: '2024-01-13T00:00:00.000Z',
    atualizadoEm: '2024-01-13T00:00:00.000Z'
  },
  {
    id: '14',
    nome: 'Celeste',
    preco: 34.90,
    categoria: 'Puzzle',
    descricao: 'Plataforma desafiador sobre escalar uma montanha com narrativa emocionante.',
    desenvolvedor: 'Maddy Makes Games',
    dataLancamento: '2018-01-25',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg',
    criadoEm: '2024-01-14T00:00:00.000Z',
    atualizadoEm: '2024-01-14T00:00:00.000Z'
  },
  {
    id: '15',
    nome: 'Need for Speed Unbound',
    preco: 199.90,
    categoria: 'Corrida',
    descricao: 'Corridas de rua com estilo visual único e customização extrema.',
    desenvolvedor: 'Criterion Games',
    dataLancamento: '2022-12-02',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1846380/header.jpg',
    criadoEm: '2024-01-15T00:00:00.000Z',
    atualizadoEm: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '17',
    nome: 'NBA 2K24',
    preco: 249.90,
    categoria: 'Esportes',
    descricao: 'Simulação de basquete mais realista com modos de carreira e online.',
    desenvolvedor: '2K Sports',
    dataLancamento: '2023-09-08',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg',
    criadoEm: '2024-01-17T00:00:00.000Z',
    atualizadoEm: '2024-01-17T00:00:00.000Z'
  },
  {
    id: '18',
    nome: 'Civilization VI',
    preco: 99.90,
    categoria: 'Estratégia',
    descricao: 'Jogo de estratégia por turnos onde você constrói um império ao longo da história.',
    desenvolvedor: 'Firaxis Games',
    dataLancamento: '2016-10-21',
    imagem: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg',
    criadoEm: '2024-01-18T00:00:00.000Z',
    atualizadoEm: '2024-01-18T00:00:00.000Z'
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
        
        const jogosTemImagem = jogosSalvos.length > 0 && jogosSalvos.every(jogo => jogo.hasOwnProperty('imagem'));
        
        if (jogosSalvos.length > 0 && jogosTemImagem) {
          setJogos(jogosSalvos);
        } else {
          console.log('Atualizando jogos com imagens...');
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