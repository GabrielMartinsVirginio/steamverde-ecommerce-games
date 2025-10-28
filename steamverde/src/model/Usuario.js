class Usuario {
  constructor(id, nome, email, senha, tipo = 'comum') {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.criadoEm = new Date().toISOString();
  }

  static TIPOS = {
    ADMIN: 'admin',
    COMUM: 'comum'
  };

  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validarSenha(senha) {
    return senha && senha.length >= 6;
  }

  static validarNome(nome) {
    return nome && nome.trim().length >= 3;
  }

  ehAdmin() {
    return this.tipo === Usuario.TIPOS.ADMIN;
  }

  ehComum() {
    return this.tipo === Usuario.TIPOS.COMUM;
  }

  paraJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo,
      criadoEm: this.criadoEm
    };
  }

  static deJSON(json) {
    return new Usuario(
      json.id,
      json.nome,
      json.email,
      json.senha,
      json.tipo
    );
  }
}

export default Usuario;