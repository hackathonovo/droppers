import VueRouter from 'vue-router';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';

import store from 'store';

const routes = [{
  path: '/',
  component: HomePage,
  name: 'home',
  meta: {
    authenticatedRoute: true
  }
}, {
  path: '/login',
  component: LoginPage,
  name: 'login',
  meta: {
    authenticatedRoute: false
  }
}, {
  path: '*',
  component: NotFoundPage,
  name: '404',
  meta: {
    authenticatedRoute: false
  }
}];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.authenticatedRoute && !store.getters.isAuthenticated) {
    if (!store.state.session.isLoaded) {
      store.dispatch('checkSession').then(() => {
        next();
      }).catch(() => {
        store.commit('UNAUTHENTICATED_REQUEST', to.name);
        next({
          name: 'login'
        });
      });
    } else {
      store.commit('UNAUTHENTICATED_REQUEST', to.name);
      next({
        name: 'login'
      });
    }
  } else {
    next();
  }
});

export default router;
