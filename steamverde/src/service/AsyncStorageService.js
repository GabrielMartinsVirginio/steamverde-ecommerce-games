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
}

export default AsyncStorageService;