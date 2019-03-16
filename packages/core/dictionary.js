/* eslint-disable no-underscore-dangle */

// Dev/Test only
let toCall = true;

/**
 * @type {ClientRuleHandler} client handler
 * @return {ModulePromise} Returns a validator
 */
let clientHandler = () => {
  if (process.env.NODE_ENV !== 'production' && toCall) {
    // eslint-disable-next-line no-console
    console.warn(
      "[dev-only] @validate-me: Client's dictionary handler not found.",
    );

    toCall = false;
  }

  return Promise.reject();
};

let lang = 'en';
const dictionary = { en: {} };
const extras = { en: {} };
/**
 * @type {{[key: string]: string[]}}
 */
const loadingCache = { en: [] };

/**
 * @param {Object} config The new configuration.
 * @param {string} [config.lang] The new language.
 * @param {Function} [config.handler] The client's handler.
 *
 * @return {void}
 */
export function setConfig(config) {
  if (config.lang) {
    lang = config.lang;

    if (!dictionary[lang]) {
      dictionary[lang] = {};
      extras[lang] = {};
      loadingCache[lang] = {};
    }
  }
  if (config.handler) {
    clientHandler = config.handler;
  }
}

export function getWarning({ name, args }, value) {
  const unknownRule = dictionary[lang]._unknownRule;
  const fn = dictionary[lang][name];
  const warning = extras[lang].preWarning || '';

  if (!(fn || unknownRule)) {
    return '';
  }

  return warning + (fn ? fn(value, ...args) : unknownRule(name, value));
}

export function getMessage({ name, args }, value) {
  const fn = dictionary[lang][name];

  return fn ? fn(value, ...args) : '';
}

export function loadMessage(name) {
  if (dictionary[lang][name] || loadingCache[lang][name]) {
    return Promise.resolve();
  }
  if (!extras[lang]) {
    loadExtras();
  }
  const cache = loadingCache[lang];

  cache[name] = true;

  return clientHandler(lang, name)
    .catch(() => import(`./dictionaries/${lang}/${name}`))
    .catch(() => clientHandler(lang, '_unknownRule'))
    .catch(() => import(`./dictionaries/${lang}/_unknownRule`))
    .then(({ default: rule }) => {
      dictionary[lang][rule.name] = rule;
    })
    .finally(() => {
      cache[name] = false;
    });
}

function loadExtras() {
  clientHandler(lang, '_extras')
    .catch(() => import(`./dictionaries/${lang}/_extras`))
    .then(mod => {
      extras[lang] = mod.default;
    });
}
