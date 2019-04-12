import { onModNotFound } from './rules';

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
const extras = {};
/**
 * @type {{[key: string]: {[key: string}: boolean}}
 */
const loadingCache = { en: {} };

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
      loadingCache[lang] = {};
    }
  }
  if (config.handler) {
    clientHandler = config.handler;
  }
  if (!extras[lang]) {
    loadExtras();
  }
}

export function getWarning({ name, args }, value) {
  const unknownRule = extras[lang].unknownRule;
  const fn = dictionary[lang][name];
  const warning = extras[lang].preWarning || '';

  if (!(fn || unknownRule)) {
    // eslint-disable-next-line no-console
    return console.error(
      `validate-me: Cannot render a warning for the unknown rule "${name}".` +
        ' The _extras file must contain the "unknownRule" prop.',
    );
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
    .catch(onModNotFound(() => import(`./dictionaries/${lang}/${name}.js`)))
    .catch(
      onModNotFound(() => {
        throw new Error(`Unknown dictionary for the "${name}" rule.`);
      }),
    )
    .then(({ default: rule }) => {
      dictionary[lang][name] = rule;
    })
    .finally(() => {
      cache[name] = false;
    });
}

function loadExtras() {
  extras[lang] = {};

  clientHandler(lang, '_extras')
    .catch(onModNotFound(() => import(`./dictionaries/${lang}/_extras.js`)))
    .catch(onModNotFound(() => {}))
    .then(mod => {
      extras[lang] = mod.default;
    });
}
