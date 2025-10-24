class ValidacaoService {
  static validarNomeJogo(nome) {
    const erros = [];
    
    if (!nome || !nome.trim()) {
      erros.push('Nome é obrigatório');
      return erros;
    }

    const nomeProcessado = nome.trim();
    
    if (nomeProcessado.length < 2) {
      erros.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (nomeProcessado.length > 100) {
      erros.push('Nome deve ter no máximo 100 caracteres');
    }

    if (!/^[a-zA-ZÀ-ÿ0-9\s\-:.'!]+$/.test(nomeProcessado)) {
      erros.push('Nome contém caracteres inválidos');
    }

    return erros;
  }

  static validarPreco(preco) {
    const erros = [];
    
    if (!preco || !preco.toString().trim()) {
      erros.push('Preço é obrigatório');
      return erros;
    }

    const precoStr = preco.toString().replace(',', '.');
    const precoNum = parseFloat(precoStr);
    
    if (isNaN(precoNum)) {
      erros.push('Preço deve ser um número válido');
      return erros;
    }

    if (precoNum <= 0) {
      erros.push('Preço deve ser maior que zero');
    }

    if (precoNum > 9999.99) {
      erros.push('Preço não pode ser maior que R$ 9.999,99');
    }

    if (!/^\d+(\.\d{1,2})?$/.test(precoStr)) {
      erros.push('Preço deve ter no máximo 2 casas decimais');
    }

    return erros;
  }

  static validarCategoria(categoria) {
    const erros = [];
    const categoriasValidas = [
      'Ação', 'Aventura', 'RPG', 'Estratégia', 'Esportes', 
      'Corrida', 'Simulação', 'Puzzle', 'Terror', 'Indie'
    ];

    if (!categoria || !categoria.trim()) {
      erros.push('Categoria é obrigatória');
      return erros;
    }

    if (!categoriasValidas.includes(categoria.trim())) {
      erros.push('Categoria inválida');
    }

    return erros;
  }

  static validarDescricao(descricao) {
    const erros = [];
    
    if (!descricao || !descricao.trim()) {
      erros.push('Descrição é obrigatória');
      return erros;
    }

    const descricaoProcessada = descricao.trim();
    
    if (descricaoProcessada.length < 10) {
      erros.push('Descrição deve ter pelo menos 10 caracteres');
    }

    if (descricaoProcessada.length > 500) {
      erros.push('Descrição deve ter no máximo 500 caracteres');
    }

    return erros;
  }

  static validarDesenvolvedor(desenvolvedor) {
    const erros = [];
    
    if (!desenvolvedor || !desenvolvedor.trim()) {
      erros.push('Desenvolvedor é obrigatório');
      return erros;
    }

    const desenvolvedorProcessado = desenvolvedor.trim();
    
    if (desenvolvedorProcessado.length < 2) {
      erros.push('Nome do desenvolvedor deve ter pelo menos 2 caracteres');
    }

    if (desenvolvedorProcessado.length > 80) {
      erros.push('Nome do desenvolvedor deve ter no máximo 80 caracteres');
    }

    if (!/^[a-zA-ZÀ-ÿ0-9\s\-&.()]+$/.test(desenvolvedorProcessado)) {
      erros.push('Nome do desenvolvedor contém caracteres inválidos');
    }

    return erros;
  }

  static validarDataLancamento(data) {
    const erros = [];
    
    if (!data || !data.trim()) {
      return erros;
    }

    const dataObj = new Date(data);
    const hoje = new Date();
    const anoMinimo = 1970;
    
    if (isNaN(dataObj.getTime())) {
      erros.push('Data de lançamento inválida');
      return erros;
    }

    if (dataObj.getFullYear() < anoMinimo) {
      erros.push(`Ano deve ser maior que ${anoMinimo}`);
    }

    if (dataObj > hoje) {
      erros.push('Data não pode ser no futuro');
    }

    return erros;
  }

  static validarFormularioCompleto(formulario) {
    const errosCompletos = {};

    const errosNome = this.validarNomeJogo(formulario.nome);
    if (errosNome.length > 0) {
      errosCompletos.nome = errosNome[0];
    }

    const errosPreco = this.validarPreco(formulario.preco);
    if (errosPreco.length > 0) {
      errosCompletos.preco = errosPreco[0];
    }

    const errosCategoria = this.validarCategoria(formulario.categoria);
    if (errosCategoria.length > 0) {
      errosCompletos.categoria = errosCategoria[0];
    }

    const errosDescricao = this.validarDescricao(formulario.descricao);
    if (errosDescricao.length > 0) {
      errosCompletos.descricao = errosDescricao[0];
    }

    const errosDesenvolvedor = this.validarDesenvolvedor(formulario.desenvolvedor);
    if (errosDesenvolvedor.length > 0) {
      errosCompletos.desenvolvedor = errosDesenvolvedor[0];
    }

    const errosData = this.validarDataLancamento(formulario.dataLancamento);
    if (errosData.length > 0) {
      errosCompletos.dataLancamento = errosData[0];
    }

    return {
      valido: Object.keys(errosCompletos).length === 0,
      erros: errosCompletos
    };
  }

  static formatarPrecoParaExibicao(preco) {
    if (!preco) return '';
    const precoStr = preco.toString().replace(',', '.');
    const precoNum = parseFloat(precoStr);
    if (isNaN(precoNum)) return preco.toString();
    return precoNum.toFixed(2).replace('.', ',');
  }

  static formatarPrecoParaSalvar(preco) {
    if (!preco) return 0;
    const precoStr = preco.toString().replace(',', '.');
    const precoNum = parseFloat(precoStr);
    return isNaN(precoNum) ? 0 : precoNum;
  }
}

export default ValidacaoService;