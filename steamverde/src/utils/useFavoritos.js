import { useState, useEffect } from 'react';
import AsyncStorageService from '../service/AsyncStorageService';
import TratamentoErroService from '../service/TratamentoErroService';

const CHAVE_FAVORITOS = '@steamverde:favoritos';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      setCarregando(true);
      const favoritosSalvos = await AsyncStorageService.obterDados(CHAVE_FAVORITOS);
      setFavoritos(favoritosSalvos || []);
    } catch (erro) {
      TratamentoErroService.tratarErro(erro, 'Erro ao carregar favoritos');
      setFavoritos([]);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarFavorito = async (jogo) => {
    try {
      console.log('Adicionando favorito:', jogo.nome);
      console.log('Favoritos atuais:', favoritos.length);
      
      const jogoExiste = favoritos.some(fav => fav.id === jogo.id);
      if (jogoExiste) {
        console.log('Jogo já existe nos favoritos');
        return { sucesso: false, mensagem: 'Jogo já está nos favoritos!' };
      }

      const novosFavoritos = [...favoritos, jogo];
      console.log('Salvando favoritos:', novosFavoritos.length);
      await AsyncStorageService.salvarDados(CHAVE_FAVORITOS, novosFavoritos);
      setFavoritos(novosFavoritos);
      console.log('Favorito adicionado com sucesso!');
      return { sucesso: true, mensagem: 'Jogo adicionado aos favoritos!' };
    } catch (erro) {
      console.error('Erro ao adicionar favorito:', erro);
      TratamentoErroService.tratarErro(erro, 'Erro ao adicionar favorito');
      return { sucesso: false, mensagem: 'Erro ao adicionar aos favoritos.' };
    }
  };

  const removerFavorito = async (jogoId) => {
    try {
      const novosFavoritos = favoritos.filter(fav => fav.id !== jogoId);
      await AsyncStorageService.salvarDados(CHAVE_FAVORITOS, novosFavoritos);
      setFavoritos(novosFavoritos);
      return { sucesso: true, mensagem: 'Jogo removido dos favoritos!' };
    } catch (erro) {
      TratamentoErroService.tratarErro(erro, 'Erro ao remover favorito');
      return { sucesso: false, mensagem: 'Erro ao remover dos favoritos.' };
    }
  };

  const ehFavorito = (jogoId) => {
    return favoritos.some(fav => fav.id === jogoId);
  };

  const limparFavoritos = async () => {
    try {
      await AsyncStorageService.removerDados(CHAVE_FAVORITOS);
      setFavoritos([]);
      return { sucesso: true, mensagem: 'Favoritos limpos com sucesso!' };
    } catch (erro) {
      TratamentoErroService.tratarErro(erro, 'Erro ao limpar favoritos');
      return { sucesso: false, mensagem: 'Erro ao limpar favoritos.' };
    }
  };

  return {
    favoritos,
    carregando,
    adicionarFavorito,
    removerFavorito,
    ehFavorito,
    limparFavoritos,
    recarregar: carregarFavoritos,
  };
};
