const pattern = (_, pattern, type, flags, example) =>
  `${
    type === 'mul' ? 'Cada uno de los valores separados por coma d' : 'D'
  }ebe ${
    example
      ? `ser similar a: ${example}`
      : `coincidir con el siguiente patrón: ${pattern}`
  }`;

export default pattern;
