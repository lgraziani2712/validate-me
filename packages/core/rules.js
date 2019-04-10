import { loadMessage } from './dictionary';

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

export function processErrors(fields, failedFields) {
  return Promise.all(
    Object.keys(failedFields).map(name => {
      const field = fields[name];

      if (process.env.NODE_ENV !== 'production' && !field) {
        // eslint-disable-next-line no-console
        console.warn(
          `[dev-only] @validate-me: Unknown field "${name}" while parsing errors from server.`,
        );

        return undefined;
      }

      return field.parseError(failedFields[name]);
    }),
  );
}

export async function loadRule(rawRule) {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(rawRule)) {
      throw new Error(
        `[dev-only] @validate-me: "loadRule" accepts only string[], received "${typeof rawRule}" instead.`,
      );
    }
  }
  const [name, ...args] = rawRule;
  const rule = cachedRules[name];

  if (rule) {
    return {
      name,
      run: rule.apply(null, args),
      args,
    };
  }

  return Promise.all([
    loadMessage(name),
    clientHandler(name)
      .catch(() => import(`./rules/${name}.js`))
      .then(({ default: rule }) => {
        cachedRules[name] = rule;

        return { name, run: rule.apply(null, args), args };
      })
      .catch(() => {
        throw { name, args };
      }),
  ]).then(all => all[1]);
}

function unknownRuleErrorOnInit(err) {
  throw err instanceof Error
    ? err
    : new Error(
        `Unknown rule "${err.name}" with args "${err.args.join(', ')}".`,
      );
}

export async function processRawRules(rawRules, onSuccess, onFinally) {
  return Promise.all(rawRules.map(loadRule))
    .then(onSuccess)
    .catch(unknownRuleErrorOnInit)
    .finally(onFinally);
}

/**
 * @typedef {Promise<{default: Function}>} ModulePromise
 * @typedef {(name: string) => ModulePromise} ClientRuleHandler
 */
