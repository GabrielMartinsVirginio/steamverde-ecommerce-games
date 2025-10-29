import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  static KEYS = {
    JOGOS: '@steamverde:jogos',
    USUARIO: '@steamverde:usuario',
    CONFIGURACOES: '@steamverde:configuracoes',
  };

  static async salvarJogos(jogos) {
    try {
      const jogosJson = JSON.stringify(jogos);
      await AsyncStorage.setItem(this.KEYS.JOGOS, jogosJson);
    } catch (error) {
      console.error('Erro ao salvar jogos:', error);
      throw new Error('Falha ao salvar jogos');
    }
  }

  static async carregarJogos() {
    try {
      const jogosJson = await AsyncStorage.getItem(this.KEYS.JOGOS);
      if (jogosJson !== null) {
        const jogos = JSON.parse(jogosJson);
        return jogos;
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      return [];
    }
  }

  static async limparJogos() {
    try {
      await AsyncStorage.removeItem(this.KEYS.JOGOS);
    } catch (error) {
      console.error('Erro ao limpar jogos:', error);
      throw new Error('Falha ao limpar jogos');
    }
  }

  static async temJogosSalvos() {
    try {
      const jogosJson = await AsyncStorage.getItem(this.KEYS.JOGOS);
      return jogosJson !== null;
    } catch (error) {
      console.error('Erro ao verificar jogos salvos:', error);
      return false;
    }
  }

  static async salvarDados(chave, dados) {
    try {
      const dadosJson = JSON.stringify(dados);
      await AsyncStorage.setItem(chave, dadosJson);
    } catch (error) {
      console.error(`Erro ao salvar dados (${chave}):`, error);
      throw new Error(`Falha ao salvar dados: ${chave}`);
    }
  }

  static async obterDados(chave) {
    try {
      const dadosJson = await AsyncStorage.getItem(chave);
      if (dadosJson !== null) {
        return JSON.parse(dadosJson);
      }
      return null;
    } catch (error) {
      console.error(`Erro ao obter dados (${chave}):`, error);
      return null;
    }
  }

  static async removerDados(chave) {
    try {
      await AsyncStorage.removeItem(chave);
    } catch (error) {
      console.error(`Erro ao remover dados (${chave}):`, error);
      throw new Error(`Falha ao remover dados: ${chave}`);
    }
  }
}

export default AsyncStorageService;