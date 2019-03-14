const len = (min, max) => value =>
  value === '' || (min <= value.length && value.length <= max);

export default len;
