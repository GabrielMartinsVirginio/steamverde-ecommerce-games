import React, { createContext, useContext, useState, useEffect } from 'react';
import AutenticacaoService from '../../../service/autenticacao';

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
    verificarSessao();
  }, []);

  const verificarSessao = async () => {
    try {
      const usuarioSalvo = await AutenticacaoService.buscarUsuarioLogado();
      if (usuarioSalvo) {
        setUsuario(usuarioSalvo);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    } finally {
      setCarregando(false);
    }
  };

  const login = async (email, senha) => {
    setCarregando(true);
    const resultado = await AutenticacaoService.login(email, senha);
    setCarregando(false);
    
    if (resultado.sucesso) {
      setUsuario(resultado.usuario);
    }
    
    return resultado;
  };

  const cadastrar = async (nome, email, senha) => {
    setCarregando(true);
    const resultado = await AutenticacaoService.cadastrar(nome, email, senha);
    setCarregando(false);
    
    return resultado;
  };

  const logout = async () => {
    setCarregando(true);
    await AutenticacaoService.logout();
    setUsuario(null);
    setCarregando(false);
  };

  const ehAdmin = () => {
    return usuario?.tipo === 'admin';
  };

  const ehUsuarioComum = () => {
    return usuario?.tipo === 'comum';
  };

  const valor = {
    usuario,
    carregando,
    login,
    cadastrar,
    logout,
    ehAdmin,
    ehUsuarioComum,
    estaLogado: !!usuario,
  };

  return (
    <ContextoAutenticacao.Provider value={valor}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

export default ProvedorAutenticacao;