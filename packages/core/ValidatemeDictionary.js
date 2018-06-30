const config = {
  lang: 'en',
  clientDictionaryHandler() {
    throw new Error("Client's dictionary handler not found.");
  },
};
const dictionary = {};
const extras = {};

// TODO: validate the data structure? See https://www.npmjs.com/package/validated
function setConfig(newConfig) {
  Object.keys(newConfig).forEach(key => {
    config[key] = newConfig[key];
  });

  if (!dictionary[config.lang]) {
    dictionary[config.lang] = {};
  }
  if (!extras[config.lang]) {
    extras[config.lang] = {};
  }
}
function getWarning(rule, value, ...args) {
  const fn = dictionary[config.lang][rule];
  const unknownRule = dictionary[config.lang].unknownRule;

  return !fn
    ? (unknownRule && unknownRule(rule, value)) || ''
    : extras.preWarning + fn(value, ...args);
}
function getMessage(rule, value, ...args) {
  const fn = dictionary[config.lang][rule];

  return !fn ? '' : fn(value, ...args);
}
function loadMessage(name) {
  config
    .clientDictionaryHandler(config.lang, name)
    .catch(() => import(`./dictionaries/${config.lang}/rules/${name}`))
    .catch(() => import(`./dictionaries/${config.lang}/unknownRule`))
    .then(module => module.default)
    .then(rule => {
      dictionary[config.lang][rule.name] = rule;

      loadExtras();
    });
}
function loadExtras() {
  import(`./dictionaries/${config.lang}/extras`)
    .then(module => module.default)
    .then(newExtras => {
      extras[config.lang] = newExtras;
    });
}

export default {
  setConfig,
  loadMessage,
  getMessage,
  getWarning,
};
