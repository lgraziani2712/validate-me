import { loadMessage } from './ValidatemeDictionary';

const cachedRules = {};

// Dev/Test only
let toCall = true;

/**
 * @type {ClientRuleHandler} client handler
 * @return {ModulePromise} Returns a validator
 */
let clientHandler = () => {
  if (process.env.NODE_ENV !== 'production' && toCall) {
    // eslint-disable-next-line no-console
    console.warn("[dev-only] @validate-me: Client's rules handler not found.");

    toCall = false;
  }

  return Promise.reject();
};

/**
 *
 * @param {ClientRuleHandler} newHandler Rules' client handler
 * @return {void}
 */
export function setHandler(newHandler) {
  clientHandler = newHandler;
}

export function loadRule(rawRule) {
  const [rule, ...args] = rawRule.split(':');

  const validator = cachedRules[rule];

  if (validator) {
    return Promise.resolve({
      name: rule.name,
      run: rule.apply(null, args),
      args,
    });
  }

  return loadMessage(rule).then(() =>
    clientHandler(rule)
      .catch(() => import(`./rules/${rule}`))
      .then(mod => mod.default)
      .then(rule => {
        cachedRules[rule.name] = rule;

        return { name: rule.name, run: rule.apply(null, args), args };
      })
      .catch(() => {
        throw { name: rule, args };
      }),
  );
}

/**
 * @typedef {Promise<{default: Function}>} ModulePromise
 * @typedef {(name: string) => ModulePromise} ClientRuleHandler
 */
