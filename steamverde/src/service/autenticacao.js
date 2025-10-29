import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from '../model/Usuario';

class AutenticacaoService {
  static STORAGE_KEY = '@steamverde:usuarios';
  static USUARIO_LOGADO_KEY = '@steamverde:usuario_logado';

  static usuariosPadrao = [
    {
      id: '1',
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha: 'admin123',
      tipo: Usuario.TIPOS.ADMIN,
      criadoEm: new Date().toISOString()
    },
    {
      id: '2',
      nome: 'Gabriel Martins',
      email: 'gabriel@vianna.com',
      senha: '123456',
      tipo: Usuario.TIPOS.COMUM,
      criadoEm: new Date().toISOString()
    }
  ];

  static async inicializarUsuarios() {
    try {
      const usuariosExistentes = await this.buscarTodosUsuarios();
      if (usuariosExistentes.length === 0) {
        await AsyncStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(this.usuariosPadrao)
        );
      }
    } catch (error) {
      console.error('Erro ao inicializar usuários:', error);
    }
  }

  static async buscarTodosUsuarios() {
    try {
      const usuariosJson = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (usuariosJson) {
        return JSON.parse(usuariosJson);
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  }

  static async login(email, senha) {
    try {
      await this.inicializarUsuarios();
      
      const usuarios = await this.buscarTodosUsuarios();
      const usuario = usuarios.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (usuario) {
        await AsyncStorage.setItem(
          this.USUARIO_LOGADO_KEY,
          JSON.stringify(usuario)
        );
        return { sucesso: true, usuario };
      }

      return { sucesso: false, erro: 'Email ou senha incorretos' };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { sucesso: false, erro: 'Erro ao realizar login' };
    }
  }

  static async cadastrar(nome, email, senha) {
    try {
      if (!Usuario.validarNome(nome)) {
        return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
      }

      if (!Usuario.validarEmail(email)) {
        return { sucesso: false, erro: 'Email inválido' };
      }

      if (!Usuario.validarSenha(senha)) {
        return { sucesso: false, erro: 'Senha deve ter pelo menos 6 caracteres' };
      }

      const usuarios = await this.buscarTodosUsuarios();
      
      const emailJaExiste = usuarios.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (emailJaExiste) {
        return { sucesso: false, erro: 'Email já cadastrado' };
      }

      const novoUsuario = {
        id: Date.now().toString(),
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        senha,
        tipo: Usuario.TIPOS.COMUM,
        criadoEm: new Date().toISOString()
      };

      usuarios.push(novoUsuario);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));

      return { sucesso: true, usuario: novoUsuario };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return { sucesso: false, erro: 'Erro ao cadastrar usuário' };
    }
  }

  static async logout() {
    try {
      await AsyncStorage.removeItem(this.USUARIO_LOGADO_KEY);
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { sucesso: false, erro: 'Erro ao fazer logout' };
    }
  }

  static async buscarUsuarioLogado() {
    try {
      const usuarioJson = await AsyncStorage.getItem(this.USUARIO_LOGADO_KEY);
      if (usuarioJson) {
        return JSON.parse(usuarioJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
      return null;
    }
  }

  static async verificarSessao() {
    const usuario = await this.buscarUsuarioLogado();
    return usuario !== null;
  }

  static async atualizarUsuario(id, dadosAtualizados) {
    try {
      const usuarios = await this.buscarTodosUsuarios();
      const indice = usuarios.findIndex(u => u.id === id);

      if (indice === -1) {
        return { sucesso: false, erro: 'Usuário não encontrado' };
      }

      if (dadosAtualizados.email) {
        if (!Usuario.validarEmail(dadosAtualizados.email)) {
          return { sucesso: false, erro: 'Email inválido' };
        }

        const emailJaExiste = usuarios.some(
          u => u.id !== id && u.email.toLowerCase() === dadosAtualizados.email.toLowerCase()
        );

        if (emailJaExiste) {
          return { sucesso: false, erro: 'Email já cadastrado' };
        }
      }

      if (dadosAtualizados.nome) {
        if (!Usuario.validarNome(dadosAtualizados.nome)) {
          return { sucesso: false, erro: 'Nome deve ter pelo menos 3 caracteres' };
        }
      }

      if (dadosAtualizados.senha) {
        if (!Usuario.validarSenha(dadosAtualizados.senha)) {
          return { sucesso: false, erro: 'Senha deve ter pelo menos 6 caracteres' };
        }
      }

      usuarios[indice] = {
        ...usuarios[indice],
        ...dadosAtualizados,
      };

      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
      await AsyncStorage.setItem(this.USUARIO_LOGADO_KEY, JSON.stringify(usuarios[indice]));

      return { sucesso: true, usuario: usuarios[indice] };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { sucesso: false, erro: 'Erro ao atualizar usuário' };
    }
  }
}

export default AutenticacaoService;