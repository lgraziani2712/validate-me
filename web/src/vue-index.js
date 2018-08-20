import Vue from 'vue';
import ValidatemePlugin from '@validate-me/vue';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';

import App from './App';

ValidatemeDictionary.setConfig({
  lang: 'es',
  clientDictionaryHandler(lang, name) {
    return import(`./dictionaries/${lang}/${name}`);
  },
});

Vue.use(ValidatemePlugin);

new Vue({
  el: '#vue',
  render(h) {
    return h(App);
  },
});
