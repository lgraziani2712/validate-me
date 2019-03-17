const min = (_, pattern, type) =>
  `${
    type === 'mul' ? 'Each comma-separated-value m' : 'M'
  }ust match the following pattern: ${pattern}`;

export default min;
