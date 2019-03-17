const min = (_, pattern, type) =>
  `${
    type === 'mul' ? 'Cada uno de los valores separados por coma d' : 'D'
  }ebe coincidir con el siguiente patrón: ${pattern}`;

export default min;
