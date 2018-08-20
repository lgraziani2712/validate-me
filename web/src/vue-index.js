import Vue from 'vue';
import ValidatemePlugin from '@validate-me/vue';

import App from './App';

Vue.use(ValidatemePlugin);

new Vue({
  el: '#vue',
  render(h) {
    return h(App);
  },
});
