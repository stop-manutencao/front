import Vue from 'vue'
import App from './App';

import router from './router';

export const globalContrastVariable = new Vue({
  data: {
    applyContrast: false,
  },
  methods: {
    modify() {
      globalContrastVariable.applyContrast = !globalContrastVariable.applyContrast;
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
