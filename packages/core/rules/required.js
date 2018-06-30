const required = () => () => value =>
  value !== undefined && value !== null && value !== '';

export default required;
