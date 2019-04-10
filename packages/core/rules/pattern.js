const pattern = (pattern, flags, type) => {
  const regex = new RegExp(
    type !== 'mul' ? pattern : `^${pattern}(,${pattern},?)*$`,
    flags,
  );

  return regex.test.bind(regex);
};

export default pattern;
