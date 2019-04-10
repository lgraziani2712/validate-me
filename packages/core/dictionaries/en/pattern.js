const pattern = (_, pattern, type, flags, example) =>
  `${
    type === 'mul' ? 'Each comma-separated-value m' : 'M'
  }ust match the following pattern: ${pattern}${
    example ? ` - E.g. ${example}` : ''
  }`;

export default pattern;
