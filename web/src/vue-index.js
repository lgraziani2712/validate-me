import Vue from 'vue';
import ValidatemePlugin from '@validate-me/vue-plugin';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import ValidatemeRules from '@validate-me/core/ValidatemeRules';

import App from './App';

ValidatemeDictionary.setConfig({
  clientDictionaryHandler: (lang, name) =>
    import(`./dictionary/${lang}/${name}`),
});
ValidatemeRules.setConfig({
  clientRulesHandler: name => import(`./rules/${name}`),
});

Vue.use(ValidatemePlugin);

new Vue({
  el: '#vue',
  render(h) {
    return h(App);
  },
});
