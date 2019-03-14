import Vue from 'vue';
import ValidatemePlugin from '@validate-me/vue';
import { setConfig } from '@validate-me/core/dictionary';

import App from './App';

setConfig({
  lang: 'es',
  handler: (lang, name) => import(`./dictionaries/${lang}/${name}`),
});

Vue.use(ValidatemePlugin);

new Vue({
  el: '#vue',
  render(h) {
    return h(App);
  },
});
