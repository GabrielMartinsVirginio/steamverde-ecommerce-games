import React, { createContext, useContext } from 'react';
import { useCarrinho } from '../../../utils/useCarrinho';

const ContextoCarrinho = createContext();

export const useCarrinhoContext = () => {
  const context = useContext(ContextoCarrinho);
  if (!context) {
    throw new Error('useCarrinhoContext deve ser usado dentro de ProvedorCarrinho');
  }
  return context;
};

const ProvedorCarrinho = ({ children }) => {
  const carrinho = useCarrinho();

  return (
    <ContextoCarrinho.Provider value={carrinho}>
      {children}
    </ContextoCarrinho.Provider>
  );
};

export default ProvedorCarrinho;