import Vue from 'vue';
import App from './App.vue';
import {
  createRouter,
} from './router';

Vue.config.productionTip = false;

const router = createRouter();

const routerReady = new Promise((resolve) => {
  router.onReady(resolve);
}).then(() => {
  // Execute the initial route's optional hook without blocking rendering.
  router.getMatchedComponents(router.currentRoute).forEach((component) => {
    // Allow hook to be optional.
    if (component.optional) {
      component.optional(router.currentRoute, {});
    }
  });

  // Subscribe to the beforeResolve hook for _required_ component hook.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const requiredPromises = matched.map((component) => {
      if (component.required) {
        return component.required(to, from);
      }
      return Promise.resolve();
    });

    Promise.all(requiredPromises)
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });

  // Subscribe to the afterEach hook for critical and optional hooks for subsequent navigation.
  /* router.afterEach((to, from) => {
    const matched = router.getMatchedComponents(to);

    matched.forEach((component) => {
      if (component.critical) {
        component.critical(store, to, from);
      }
    });

    matched.forEach((component) => {
      if (component.optional) {
        component.optional(store, to, from);
      }
    });
  }); */
});

const app = new Vue({
  router,
  render: h => h(App),
});

routerReady.then(() => {
  app.$mount('#app');
});
