import { useState, useCallback } from 'react';

export const useCarrinho = () => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const adicionarAoCarrinho = useCallback((jogo, quantidade = 1) => {
    setItensCarrinho(prev => {
      const itemExistente = prev.find(item => item.id === jogo.id);
      
      if (itemExistente) {
        return prev.map(item =>
          item.id === jogo.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        return [...prev, { ...jogo, quantidade }];
      }
    });
  }, []);

  const removerDoCarrinho = useCallback((jogoId) => {
    setItensCarrinho(prev => prev.filter(item => item.id !== jogoId));
  }, []);

  const atualizarQuantidade = useCallback((jogoId, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(jogoId);
      return;
    }

    setItensCarrinho(prev =>
      prev.map(item =>
        item.id === jogoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  }, [removerDoCarrinho]);

  const limparCarrinho = useCallback(() => {
    setItensCarrinho([]);
  }, []);

  const calcularTotal = useCallback(() => {
    return itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }, [itensCarrinho]);

  const calcularQuantidadeTotal = useCallback(() => {
    return itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  }, [itensCarrinho]);

  const verificarSeEstaNoCarrinho = useCallback((jogoId) => {
    return itensCarrinho.some(item => item.id === jogoId);
  }, [itensCarrinho]);

  return {
    itensCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    calcularTotal,
    calcularQuantidadeTotal,
    verificarSeEstaNoCarrinho,
    quantidadeItens: itensCarrinho.length
  };
};