import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextoAutenticacao = createContext();

export const useAuth = () => {
  const context = useContext(ContextoAutenticacao);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de ProvedorAutenticacao');
  }
  return context;
};

const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    setUsuario(null);
  };

  const valor = {
    usuario,
    carregando,
    login,
    logout,
    estaLogado: !!usuario,
  };

  return (
    <ContextoAutenticacao.Provider value={valor}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

export default ProvedorAutenticacao;