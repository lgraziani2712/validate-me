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
