import VueRouter from 'vue-router';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';

import RescuersPage from 'pages/RescuersPage';
import RescuersOverviewPage from 'pages/rescuers/RescuersOverviewPage';
import RescuersNewPage from 'pages/rescuers/RescuersNewPage';
import RescuersDetailsPage from 'pages/rescuers/RescuersDetailsPage';

import AreasPage from 'pages/AreasPage';
import AreasNewPage from 'pages/areas/AreasNewPage';


import ActionsPage from 'pages/ActionsPage';
import ActionsOverviewPage from 'pages/actions/ActionsOverviewPage';
import ActionsHistoryPage from 'pages/actions/ActionsHistoryPage';

import NotFoundPage from 'pages/NotFoundPage';

import store from 'store';

const routes = [{
  path: '/',
  redirect: {
    name: 'home'
  }
}, {
  path: '/login',
  component: LoginPage,
  name: 'login'
}, {
  path: '/home',
  component: HomePage,
  name: 'home',
  meta: {
    authenticatedRoute: true
  }
}, {
  path: '/rescuers',
  component: RescuersPage,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: RescuersOverviewPage,
    meta: {
      authenticatedRoute: true
    }
  }, {
    path: 'new',
    component: RescuersNewPage,
    meta: {
      authenticatedRoute: true
    }
  }, {
    path: 'details/:id',
    component: RescuersDetailsPage,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/areas',
  component: AreasPage,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: 'new/:id',
    component: AreasNewPage,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/actions',
  component: ActionsPage,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: ActionsOverviewPage,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/history',
  component: ActionsPage,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: ActionsHistoryPage,
    meta: {
      authenticatedRoute: true
    }
  }]
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
