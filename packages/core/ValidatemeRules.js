const config = {
  clientRulesHandler() {
    throw new Error("Client's rules handler not found.");
  },
};

// TODO: validate the data structure? See https://www.npmjs.com/package/validated
function setConfig(newConfig) {
  Object.keys(newConfig).forEach(key => {
    config[key] = newConfig[key];
  });
}
function getRule(name) {
  return config
    .clientRulesHandler(name)
    .catch(() => import(`./rules/${name}`))
    .then(module => module.default);
}

export default {
  setConfig,
  getRule,
};
