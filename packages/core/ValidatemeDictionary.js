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

function setConfig(newLang, newHandler) {
  lang = newLang;

  if (newHandler) {
    clientHandler = newHandler;
  }
  if (!dictionary[newLang]) {
    dictionary[newLang] = {};
    extras[newLang] = {};
  }
}
function getWarning(rule, value, args) {
  const unknownRule = dictionary[lang]._unknownRule;
  const fn = dictionary[lang][rule];
  const warning = extras[lang].preWarning || '';

  if (!fn && !unknownRule) {
    return '';
  }

  return warning + (!fn ? unknownRule(rule, value) : fn(value, ...args));
}
function getMessage(rule, value, args) {
  const fn = dictionary[lang][rule];

  return !fn ? '' : fn(value, ...args);
}
function loadMessage(name) {
  if (dictionary[lang][name]) {
    return Promise.resolve();
  }
  if (!extras[lang]) {
    loadExtras();
  }

  return clientHandler(lang, name)
    .catch(() => import(`./dictionaries/${lang}/${name}`))
    .catch(() => clientHandler(lang, '_unknownRule'))
    .catch(() => import(`./dictionaries/${lang}/_unknownRule`))
    .then(mod => {
      dictionary[lang][mod.default.name] = mod.default;
    });
}
function loadExtras() {
  clientHandler(lang, '_extras')
    .catch(() => import(`./dictionaries/${lang}/_extras`))
    .then(mod => {
      extras[lang] = mod.default;
    });
}

export default {
  setConfig,
  loadMessage,
  getMessage,
  getWarning,
};
