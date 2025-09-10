class AbrigoAnimais {
  constructor() {
    this.animaisPorPessoa = { 1: [], 2: [] };
    this.animaisPorAbrigo = [];
    this.limitePorPessoa = 3;

    // regras de adoção por brinquedo
    this.regras = {
      Rex: (brinquedos) =>
        this._contemSequencia(brinquedos, ['RATO', 'BOLA']),
      Mimi: (brinquedos) =>
        this._contemSequencia(brinquedos, ['BOLA', 'LASER']),
      Fofo: (brinquedos) =>
        this._contemSequencia(brinquedos, ['BOLA', 'RATO', 'LASER']),
      Zero: (brinquedos) =>
        this._contemSequencia(brinquedos, ['RATO', 'BOLA']),
      Bola: (brinquedos) =>
        this._contemSequencia(brinquedos, ['CAIXA', 'NOVELO']),
      Bebe: (brinquedos) =>
        this._contemSequencia(brinquedos, ['LASER', 'RATO', 'BOLA']),
      Loco: (brinquedos) =>
        brinquedos.includes('RATO') && brinquedos.includes('SKATE'), // ordem não importa
    };

    this.brinquedosValidos = [
      'RATO',
      'BOLA',
      'LASER',
      'CAIXA',
      'NOVELO',
      'SKATE',
    ];

    this.animaisValidos = [
      'Rex',
      'Mimi',
      'Fofo',
      'Zero',
      'Bola',
      'Bebe',
      'Loco',
    ];
  }

  
  _contemSequencia(lista, sequencia) {
    let i = 0;
    for (const b of lista) {
      if (b === sequencia[i]) {
        i++;
        if (i === sequencia.length) return true;
      }
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, animais) {
    const listaBrinq1 = brinquedosPessoa1.split(',');
    const listaBrinq2 = brinquedosPessoa2.split(',');
    const listaAnimais = animais.split(',');

    // valida duplicados
    if (
      new Set(listaBrinq1).size !== listaBrinq1.length ||
      new Set(listaBrinq2).size !== listaBrinq2.length
    ) {
      return { erro: 'Brinquedo inválido' };
    }
    if (new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    
    for (const b of [...listaBrinq1, ...listaBrinq2]) {
      if (!this.brinquedosValidos.includes(b)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    
    for (const a of listaAnimais) {
      if (!this.animaisValidos.includes(a)) {
        return { erro: 'Animal inválido' };
      }
    }

    this.animaisPorPessoa = { 1: [], 2: [] };
    this.animaisPorAbrigo = [];

    for (const animal of listaAnimais) {
      const regra = this.regras[animal];
      const podePessoa1 = regra(listaBrinq1);
      const podePessoa2 = regra(listaBrinq2);

      let adotado = false;

      if (podePessoa1 && podePessoa2) {
        
        this.animaisPorAbrigo.push(animal);
        adotado = true;
      } else if (podePessoa1 && this.animaisPorPessoa[1].length < this.limitePorPessoa) {
        this.animaisPorPessoa[1].push(animal);
        adotado = true;
      } else if (podePessoa2 && this.animaisPorPessoa[2].length < this.limitePorPessoa) {
        this.animaisPorPessoa[2].push(animal);
        adotado = true;
      }

      if (!adotado) {
        this.animaisPorAbrigo.push(animal);
      }
    }

    const resultado = [
      ...this.animaisPorPessoa[1].map((a) => `${a} - pessoa 1`),
      ...this.animaisPorPessoa[2].map((a) => `${a} - pessoa 2`),
      ...this.animaisPorAbrigo.map((a) => `${a} - abrigo`),
    ];

    return { lista: resultado.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };


