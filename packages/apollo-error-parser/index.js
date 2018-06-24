const apolloErrorParser = errorClassName => error => {
  const actualError = error.graphQLErrors[0];

  if (!actualError || actualError.name !== errorClassName) {
    throw error;
  }

  return actualError.data;
};

export default apolloErrorParser;
