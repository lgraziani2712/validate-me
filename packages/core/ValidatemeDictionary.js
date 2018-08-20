const config = {
  lang: 'en',
  clientDictionaryHandler() {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        "[dev-only] @validate-me: Client's dictionary handler not found.",
      );
    }

    return Promise.reject();
  },
};
const dictionary = { en: {} };
const extras = { en: {} };

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
function getWarning(rule, value, args) {
  const unknownRule = dictionary[config.lang].unknownRule;
  const fn = dictionary[config.lang][rule];
  const warning = extras[config.lang].preWarning || '';

  if (!fn && !unknownRule) {
    return '';
  }

  return warning + (!fn ? unknownRule(rule, value) : fn(value, ...args));
}
function getMessage(rule, value, args) {
  const fn = dictionary[config.lang][rule];

  return !fn ? '' : fn(value, ...args);
}
function loadMessage(name) {
  if (dictionary[config.lang][name]) {
    return Promise.resolve();
  }
  if (!extras[config.lang]) {
    loadExtras();
  }

  return config
    .clientDictionaryHandler(config.lang, name)
    .catch(() => import(`./dictionaries/${config.lang}/${name}`))
    .catch(() => config.clientDictionaryHandler(config.lang, '_unknownRule'))
    .catch(() => import(`./dictionaries/${config.lang}/_unknownRule`))
    .then(mod => {
      dictionary[config.lang][name] = mod.default;
    });
}
function loadExtras() {
  config
    .clientDictionaryHandler(config.lang, '_extras')
    .catch(() => import(`./dictionaries/${config.lang}/_extras`))
    .then(mod => {
      extras[config.lang] = mod.default;
    });
}

export default {
  setConfig,
  loadMessage,
  getMessage,
  getWarning,
};
