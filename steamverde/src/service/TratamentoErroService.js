class TratamentoErroService {
  static TIPOS_ERRO = {
    REDE: 'REDE',
    VALIDACAO: 'VALIDACAO',
    ARMAZENAMENTO: 'ARMAZENAMENTO',
    SISTEMA: 'SISTEMA',
    TIMEOUT: 'TIMEOUT'
  };

  static analisarErro(erro) {
    if (!erro) {
      return {
        tipo: this.TIPOS_ERRO.SISTEMA,
        mensagem: 'Erro desconhecido',
        recuperavel: false
      };
    }

    const mensagemErro = erro.message || erro.toString();

    if (mensagemErro.includes('Network') || mensagemErro.includes('fetch')) {
      return {
        tipo: this.TIPOS_ERRO.REDE,
        mensagem: 'Problema de conexão. Verifique sua internet.',
        recuperavel: true,
        acaoRecuperacao: 'Tentar novamente'
      };
    }

    if (mensagemErro.includes('AsyncStorage') || mensagemErro.includes('storage')) {
      return {
        tipo: this.TIPOS_ERRO.ARMAZENAMENTO,
        mensagem: 'Erro ao salvar dados. Verifique o espaço disponível.',
        recuperavel: true,
        acaoRecuperacao: 'Tentar novamente'
      };
    }

    if (mensagemErro.includes('timeout') || mensagemErro.includes('Timeout')) {
      return {
        tipo: this.TIPOS_ERRO.TIMEOUT,
        mensagem: 'Operação demorou muito. Tente novamente.',
        recuperavel: true,
        acaoRecuperacao: 'Tentar novamente'
      };
    }

    if (mensagemErro.includes('validação') || mensagemErro.includes('inválido')) {
      return {
        tipo: this.TIPOS_ERRO.VALIDACAO,
        mensagem: 'Dados inválidos. Verifique os campos.',
        recuperavel: true,
        acaoRecuperacao: 'Corrigir dados'
      };
    }

    return {
      tipo: this.TIPOS_ERRO.SISTEMA,
      mensagem: 'Erro interno do sistema. Tente mais tarde.',
      recuperavel: false,
      detalhes: mensagemErro
    };
  }

  static obterMensagemUsuario(erro) {
    const analiseErro = this.analisarErro(erro);
    return analiseErro.mensagem;
  }

  static podeRecuperar(erro) {
    const analiseErro = this.analisarErro(erro);
    return analiseErro.recuperavel;
  }

  static obterAcaoRecuperacao(erro) {
    const analiseErro = this.analisarErro(erro);
    return analiseErro.acaoRecuperacao || 'Tentar novamente';
  }

  static loggarErro(erro, contexto = '') {
    const analiseErro = this.analisarErro(erro);
    const logInfo = {
      timestamp: new Date().toISOString(),
      contexto,
      tipo: analiseErro.tipo,
      mensagem: analiseErro.mensagem,
      detalhes: analiseErro.detalhes || erro.message,
      stack: erro.stack
    };

    console.error('[ERRO]', logInfo);
    
    return logInfo;
  }

  static tratarErro(erro, contextoMensagem = '') {
    const analiseErro = this.analisarErro(erro);
    const mensagem = contextoMensagem || analiseErro.mensagem;
    
    console.error(`${mensagem}:`, erro);
    
    return {
      tipo: analiseErro.tipo,
      mensagem: mensagem,
      recuperavel: analiseErro.recuperavel,
      erro: erro
    };
  }

  static simularTimeoutOperacao(operacao, timeout = 10000) {
    return Promise.race([
      operacao,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Operação demorou muito')), timeout)
      )
    ]);
  }
}

export default TratamentoErroService;