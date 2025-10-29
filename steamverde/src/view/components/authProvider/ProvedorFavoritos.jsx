import React, { createContext, useContext } from 'react';
import { useFavoritos } from '../../../utils/useFavoritos';

const ContextoFavoritos = createContext();

export const useFavoritosContext = () => {
  const contexto = useContext(ContextoFavoritos);
  if (!contexto) {
    throw new Error('useFavoritosContext deve ser usado dentro de um ProvedorFavoritos');
  }
  return contexto;
};

const ProvedorFavoritos = ({ children }) => {
  const favoritosHook = useFavoritos();

  return (
    <ContextoFavoritos.Provider value={favoritosHook}>
      {children}
    </ContextoFavoritos.Provider>
  );
};

export default ProvedorFavoritos;
