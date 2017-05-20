import VueRouter from 'vue-router';

import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

const routes = [{
  path: '/',
  component: HomePage,
  name: 'login'
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

/* optional guard */
// router.beforeEach((to, from, next) => {
//   if (to.meta.authenticatedRoute && !store.getters.isAuthenticated) {
//     if (!store.state.session.isLoaded) {
//       store.dispatch('checkSession').then(() => {
//         next();
//       }).catch(() => {
//         store.commit('UNAUTHENTICATED_REQUEST', to.name);
//         next({
//           name: 'login'
//         });
//       });
//     } else {
//       store.commit('UNAUTHENTICATED_REQUEST', to.name);
//       next({
//         name: 'login'
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
