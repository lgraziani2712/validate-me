const notContains = (_, partialValue) =>
  `The field must *not* include "${partialValue}".`;

export default notContains;
