const pattern = (pattern, type) => {
  const regex =
    type === 'mul'
      ? new RegExp(`^${pattern}(,${pattern},?)*$`)
      : new RegExp(pattern);

  return regex.test.bind(regex);
};

export default pattern;
