const pattern = (pattern, type) => {
  const regex = new RegExp(
    type !== 'mul' ? pattern : `^${pattern}(,${pattern},?)*$`,
  );

  return regex.test.bind(regex);
};

export default pattern;
