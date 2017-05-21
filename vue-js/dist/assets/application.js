webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// SESSION
var SESSION_REQUEST = exports.SESSION_REQUEST = 'SESSION_REQUEST';
var SESSION_SUCCESS = exports.SESSION_SUCCESS = 'SESSION_SUCCESS';
var SESSION_FAILURE = exports.SESSION_FAILURE = 'SESSION_FAILURE';
var SESSION_DESTROY = exports.SESSION_DESTROY = 'SESSION_DESTROY';
var UNAUTHENTICATED_REQUEST = exports.UNAUTHENTICATED_REQUEST = 'UNAUTHENTICATED_REQUEST';

// RESCUERS
var RESCUERS_REQUEST = exports.RESCUERS_REQUEST = 'RESCUERS_REQUEST';
var RESCUERS_SUCCESS = exports.RESCUERS_SUCCESS = 'RESCUERS_SUCCESS';
var RESCUERS_FAILURE = exports.RESCUERS_FAILURE = 'RESCUERS_FAILURE';

// RESCUERS-DETAIL
var RESCUERS_DETAIL_REQUEST = exports.RESCUERS_DETAIL_REQUEST = 'RESCUERS_DETAIL_REQUEST';
var RESCUERS_DETAIL_SUCCESS = exports.RESCUERS_DETAIL_SUCCESS = 'RESCUERS_DETAIL_SUCCESS';
var RESCUERS_DETAIL_EDIT = exports.RESCUERS_DETAIL_EDIT = 'RESCUERS_DETAIL_EDIT';
var RESCUERS_DETAIL_SET = exports.RESCUERS_DETAIL_SET = 'RESCUERS_DETAIL_SET';
var RESCUERS_DETAIL_FAILURE = exports.RESCUERS_DETAIL_FAILURE = 'RESCUERS_DETAIL_FAILURE';

// AREA
var AREA_DETAIL_SET = exports.AREA_DETAIL_SET = 'AREA_DETAIL_SET';

// ACTION
var ACTIONS_REQUEST = exports.ACTIONS_REQUEST = 'ACTIONS_REQUEST';
var ACTIONS_SUCCESS = exports.ACTIONS_SUCCESS = 'ACTIONS_SUCCESS';
var ACTIONS_FAILURE = exports.ACTIONS_FAILURE = 'ACTIONS_FAILURE';

// HISTORY
var HISTORY_REQUEST = exports.HISTORY_REQUEST = 'HISTORY_REQUEST';
var HISTORY_SUCCESS = exports.HISTORY_SUCCESS = 'HISTORY_SUCCESS';
var HISTORY_FAILURE = exports.HISTORY_FAILURE = 'HISTORY_FAILURE';

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var specialties = exports.specialties = {
  MOUNTAIN_CLIMBING: {
    name: 'MOUNTAIN_CLIMBING',
    label: 'Mountain climbing'
  },
  SPORTS_CLIMBING: {
    name: 'SPORTS_CLIMBING',
    label: 'Sports climbing'
  },
  SPELEOLOGY: {
    name: 'SPELEOLOGY',
    label: 'Speleology'
  },
  MEDICINE: {
    name: 'MEDICINE',
    label: 'Medicine'
  }
};

exports.default = Object.values(specialties);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = __webpack_require__(28);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API_DOMAIN = 'http://192.168.201.43:8080';
var API_NAMESPACE = API_DOMAIN + '/api/v1';
var RESPONSE_AUTHORIZATION_TOKEN = 'X-Authorization-Token';
var REQUEST_AUTHORIZATION_TOKEN = 'X-Authorization-Token';

var ApiAdapter = function () {
  function ApiAdapter() {
    _classCallCheck(this, ApiAdapter);
  }

  _createClass(ApiAdapter, [{
    key: 'setToken',
    value: function setToken(token) {
      this.token = token;
    }
  }, {
    key: 'get',
    value: function get(url, payload) {
      return (0, _request2.default)({
        url: url,
        method: 'get',
        headers: this.authHeaders,
        data: payload
      }).then(function (_ref) {
        var data = _ref.data;

        return data;
      });
    }
  }, {
    key: 'login',
    value: function login(_ref2) {
      var username = _ref2.username,
          password = _ref2.password;

      var data = {
        email: username,
        password: password
      };

      return (0, _request2.default)({
        url: API_NAMESPACE + '/users/login',
        method: 'post',
        mode: 'no-cors',
        headers: this.authHeaders,
        data: data
      }).then(function (response) {
        return {
          user: response.data,
          token: response.data.accessToken
        };
      });
    }
  }, {
    key: 'currentUser',
    value: function currentUser() {
      var url = API_NAMESPACE + '/users/login';
      return this.get(url);
    }
  }, {
    key: 'fetchRescuers',
    value: function fetchRescuers() {
      var url = API_NAMESPACE + '/users/';
      return this.get(url);
    }
  }, {
    key: 'fetchRescuerByID',
    value: function fetchRescuerByID(id) {
      var url = API_NAMESPACE + '/users/' + id;
      return this.get(url);
    }
  }, {
    key: 'updateRescuer',
    value: function updateRescuer(_ref3) {
      var data = _ref3.data;

      return (0, _request2.default)({
        url: API_NAMESPACE + '/users/' + data.id,
        method: 'put',
        headers: this.authHeaders,
        data: data
      }).then(function (_ref4) {
        var response = _ref4.response;

        return response;
      });
    }
  }, {
    key: 'sendRescuer',
    value: function sendRescuer(data) {
      return (0, _request2.default)({
        url: API_NAMESPACE + '/users/register',
        method: 'post',
        headers: this.authHeaders,
        data: data
      });
    }
  }, {
    key: 'patchRescuer',
    value: function patchRescuer(data) {
      return (0, _request2.default)({
        url: API_NAMESPACE + '/users/update',
        method: 'post',
        headers: this.authHeaders,
        data: data
      });
    }

    // AREA

  }, {
    key: 'sendArea',
    value: function sendArea(data) {
      return (0, _request2.default)({
        url: API_NAMESPACE + '/rescue/add_areas',
        method: 'post',
        headers: this.authHeaders,
        data: data
      });
    }

    // actions

  }, {
    key: 'fetchActions',
    value: function fetchActions() {
      var url = API_NAMESPACE + '/rescue';
      return this.get(url);
    }

    // history

  }, {
    key: 'fetchHistory',
    value: function fetchHistory() {
      var url = API_NAMESPACE + '/rescue';
      return this.get(url, { active: false });
    }
  }, {
    key: 'authHeaders',
    get: function get() {
      return _defineProperty({}, REQUEST_AUTHORIZATION_TOKEN, '' + (this.token || 'b6hda4uaamobal74cva5s1n9f5tu5rsro3tatdjjbkqbg6s4c58'));
    }
  }]);

  return ApiAdapter;
}();

exports.default = new ApiAdapter();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItem = setItem;
exports.getItem = getItem;
exports.removeItem = removeItem;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var LOCAL_STORAGE_KEY_PREFIX = 'hgss';

function getName(name) {
  return LOCAL_STORAGE_KEY_PREFIX + '-' + name;
}

function localStorageCall(methodName, name) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  try {
    var _localStorage;

    return (_localStorage = localStorage)[methodName].apply(_localStorage, [getName(name)].concat(_toConsumableArray(args)));
  } catch (e) {
    console.warn('Error with local storage service!'); // eslint-disable-line no-console
    return false;
  }
}

function setItem(name, value) {
  localStorageCall('setItem', name, [value]);
}

function getItem(name) {
  return localStorageCall('getItem', name);
}

function removeItem(name) {
  localStorageCall('removeItem', name);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _apiAdapter = __webpack_require__(6);

var _apiAdapter2 = _interopRequireDefault(_apiAdapter);

var _localStorage = __webpack_require__(7);

var localStorage = _interopRequireWildcard(_localStorage);

var _state = __webpack_require__(32);

var _state2 = _interopRequireDefault(_state);

var _mutations = __webpack_require__(31);

var _mutations2 = _interopRequireDefault(_mutations);

var _actions = __webpack_require__(29);

var _actions2 = _interopRequireDefault(_actions);

var _getters = __webpack_require__(30);

var _getters2 = _interopRequireDefault(_getters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var actions = (0, _actions2.default)({ apiAdapter: _apiAdapter2.default, localStorage: localStorage });

exports.default = new _vuex2.default.Store({
  state: _state2.default,
  actions: actions,
  getters: _getters2.default,
  mutations: _mutations2.default
});

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(11);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueMaterial = __webpack_require__(77);

var _vueMaterial2 = _interopRequireDefault(_vueMaterial);

var _router = __webpack_require__(27);

var _router2 = _interopRequireDefault(_router);

var _store = __webpack_require__(8);

var _store2 = _interopRequireDefault(_store);

var _Application = __webpack_require__(51);

var _Application2 = _interopRequireDefault(_Application);

__webpack_require__(80);

__webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueMaterial2.default);

var APP_CONTAINER_ID = 'app';
var appContainer = document.getElementById(APP_CONTAINER_ID);

if (appContainer) {
  new _vue2.default({ // eslint-disable-line no-new
    el: appContainer,
    render: function render(renderFunc) {
      return renderFunc(_Application2.default);
    },
    router: _router2.default,
    store: _store2.default,
    data: function data() {
      return {};
    }
  });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

exports.default = {
  computed: _extends({}, (0, _vuex.mapState)(['session'])),
  data: function data() {
    return {};
  },

  methods: _extends({}, (0, _vuex.mapActions)(['logout']), {
    toggleSidenav: function toggleSidenav() {
      this.$refs.sidenav.toggle();
    },
    logoutCurrentUser: function logoutCurrentUser() {
      this.logout();
      this.$router.push({
        name: 'login'
      });
    }
  })
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {};
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {};
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {};
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

exports.default = {
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: _extends({}, (0, _vuex.mapActions)(['login']), {
    loginSubmit: function loginSubmit() {
      var _this = this;

      this.invalidLogin = false;

      this.login({
        username: this.username,
        password: this.password
      }).then(function () {
        var nextPage = _this.$store.state.session.nextPathName || 'home';
        _this.$router.push({
          name: nextPage
        });
      }).catch(function () {
        _this.invalidLogin = true;
      });
    }
  }),
  data: function data() {
    return {
      username: '',
      password: '',
      invalidLogin: false
    };
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  components: {},
  props: {},
  computed: {},
  watch: {},
  data: function data() {
    return {};
  },

  methods: {}
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {};
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['isHistoryLoading', 'history']), {
    orderedActions: function orderedActions() {
      return (0, _lodash2.default)(this.history, this.orderField, this.direction);
    }
  }),

  methods: _extends({}, (0, _vuex.mapActions)(['fetchHistory']), {
    rowSelected: function rowSelected(id) {
      // this.$router.push({
      //   path: `/areas/new/${id}`
      // });
    },
    reOrder: function reOrder(object) {
      this.orderField = object.name;
      this.direction = object.type;
    }
  }),

  data: function data() {
    return {
      orderField: 'id',
      direction: 'asc'
    };
  },
  created: function created() {
    this.fetchHistory();
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['isActionsLoading', 'actions']), {
    orderedActions: function orderedActions() {
      return (0, _lodash2.default)(this.actions, this.orderField, this.direction);
    }
  }),

  methods: _extends({}, (0, _vuex.mapActions)(['fetchActions']), {
    rowSelected: function rowSelected(id) {
      this.$router.push({
        path: '/areas/new/' + id
      });
    },
    reOrder: function reOrder(object) {
      this.orderField = object.name;
      this.direction = object.type;
    }
  }),

  data: function data() {
    return {
      orderField: 'id',
      direction: 'asc'
    };
  },
  created: function created() {
    this.fetchActions();
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _mutationTypes = __webpack_require__(2);

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['actions', 'isActionsLoaded'])),

  methods: _extends({}, (0, _vuex.mapMutations)([mutationTypes.AREA_DETAIL_SET]), (0, _vuex.mapActions)(['sendAreaDetails']), {
    initMap: function initMap() {
      var _this = this;

      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.84, lng: 15.894 },
        zoom: 8,
        mapTypeId: 'terrain'
      });

      var currAction = this.actions.find(function (action) {
        return action.id === _this.features.rescueId;
      });

      if (currAction.rescuers) {
        currAction.rescuers.forEach(function (rescuer) {
          if (rescuer && rescuer.lat && rescuer.lng) {
            var marker = new window.google.maps.Marker({
              position: { lat: rescuer.latitude, lng: rescuer.longitude },
              map: _this.map,
              animation: window.google.maps.Animation.DROP,
              title: rescuer.status || 'Rescuer'
            });

            var infowindow = new window.google.maps.InfoWindow({
              content: rescuer.status || 'Rescuer'
            });

            marker.setMap(_this.map);

            marker.addListener('click', function () {
              infowindow.open(this.map, marker);
            });
          }
        });
      }

      var drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon']
        }
      });
      drawingManager.setMap(this.map);

      window.google.maps.event.addListener(drawingManager, 'polygoncomplete', function (poly) {
        var lines = poly.getPaths().b[0].b;
        var polygon = [];

        lines.forEach(function (line) {
          polygon.push([line.lng(), line.lat()]);
        });

        _this.features.coordinates = [polygon];
      });
    },
    onSave: function onSave() {
      this[mutationTypes.AREA_DETAIL_SET](this.features);
      this.sendAreaDetails();
    }
  }),

  data: function data() {
    return {
      map: null,
      features: {
        rescueId: this.$route.params.id,
        coordinates: []
      }
    };
  },
  mounted: function mounted() {
    if (!this.isActionsLoaded) {
      this.$router.push({
        path: '/actions'
      });
    }
    this.initMap();
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _mutationTypes = __webpack_require__(2);

var mutationTypes = _interopRequireWildcard(_mutationTypes);

var _specialties = __webpack_require__(5);

var _specialties2 = _interopRequireDefault(_specialties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['isRescuersLoaded', 'getRescuerDetails'])),

  watch: {
    isRescuersLoaded: function isRescuersLoaded() {
      this.setRescuerDetails();
      this.form = this.getRescuerDetails;
    }
  },

  methods: _extends({}, (0, _vuex.mapActions)(['fetchRescuers', 'patchRescuerDetails']), (0, _vuex.mapMutations)([mutationTypes.RESCUERS_DETAIL_SET, mutationTypes.RESCUERS_DETAIL_EDIT]), {
    toggleEditMode: function toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      this.form = this.getRescuerDetails;
    },
    setRescuerDetails: function setRescuerDetails() {
      this[mutationTypes.RESCUERS_DETAIL_SET](this.$route.params.id);
    },
    formSubmit: function formSubmit() {
      this[mutationTypes.RESCUERS_DETAIL_EDIT](this.form);
      this.patchRescuerDetails();
    }
  }),

  data: function data() {
    return {
      specialties: _specialties2.default,
      isEditMode: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        rank: '',
        region: '',
        hasSearchDog: null,
        specialties: [],
        address: {
          city: '',
          country: '',
          postalCode: '',
          street: '',
          streetNumber: ''
        },
        availablePeriods: []
      }
    };
  },
  created: function created() {
    if (this.isRescuersLoaded) {
      this.setRescuerDetails();
    }
    this.fetchRescuers();
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _specialties = __webpack_require__(5);

var _specialties2 = _interopRequireDefault(_specialties);

var _mutationTypes = __webpack_require__(2);

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: _extends({}, (0, _vuex.mapMutations)([mutationTypes.RESCUERS_DETAIL_EDIT]), (0, _vuex.mapActions)(['sendRescuerDetails']), {
    formSubmit: function formSubmit() {
      this[mutationTypes.RESCUERS_DETAIL_EDIT](this.form);
      this.sendRescuerDetails();
    }
  }),
  data: function data() {
    return {
      specialties: _specialties2.default,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        rank: '',
        region: '',
        hasSearchDog: null,
        specialties: [],
        password: '',
        address: {
          city: '',
          country: '',
          postalCode: '',
          street: '',
          streetNumber: ''
        },
        availablePeriods: [{
          day: 'ALL',
          startHour: null,
          endHour: null
        }]
      }
    };
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['isRescuersLoading', 'rescuers']), {
    orderedRescuers: function orderedRescuers() {
      return (0, _lodash2.default)(this.rescuers, this.orderField, this.direction);
    }
  }),

  methods: _extends({}, (0, _vuex.mapActions)(['fetchRescuers']), {
    rowSelected: function rowSelected(index) {
      this.$router.push({
        path: '/rescuers/details/' + index
      });
    },
    reOrder: function reOrder(object) {
      this.orderField = object.name;
      this.direction = object.type;
    }
  }),

  data: function data() {
    return {
      orderField: 'id',
      direction: 'asc'
    };
  },
  created: function created() {
    this.fetchRescuers();
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueRouter = __webpack_require__(11);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _HomePage = __webpack_require__(54);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = __webpack_require__(55);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _RescuersPage = __webpack_require__(57);

var _RescuersPage2 = _interopRequireDefault(_RescuersPage);

var _RescuersOverviewPage = __webpack_require__(63);

var _RescuersOverviewPage2 = _interopRequireDefault(_RescuersOverviewPage);

var _RescuersNewPage = __webpack_require__(62);

var _RescuersNewPage2 = _interopRequireDefault(_RescuersNewPage);

var _RescuersDetailsPage = __webpack_require__(61);

var _RescuersDetailsPage2 = _interopRequireDefault(_RescuersDetailsPage);

var _AreasPage = __webpack_require__(53);

var _AreasPage2 = _interopRequireDefault(_AreasPage);

var _AreasNewPage = __webpack_require__(60);

var _AreasNewPage2 = _interopRequireDefault(_AreasNewPage);

var _ActionsPage = __webpack_require__(52);

var _ActionsPage2 = _interopRequireDefault(_ActionsPage);

var _ActionsOverviewPage = __webpack_require__(59);

var _ActionsOverviewPage2 = _interopRequireDefault(_ActionsOverviewPage);

var _ActionsHistoryPage = __webpack_require__(58);

var _ActionsHistoryPage2 = _interopRequireDefault(_ActionsHistoryPage);

var _NotFoundPage = __webpack_require__(56);

var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);

var _store = __webpack_require__(8);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  redirect: {
    name: 'home'
  }
}, {
  path: '/login',
  component: _LoginPage2.default,
  name: 'login'
}, {
  path: '/home',
  component: _HomePage2.default,
  name: 'home',
  meta: {
    authenticatedRoute: true
  }
}, {
  path: '/rescuers',
  component: _RescuersPage2.default,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: _RescuersOverviewPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }, {
    path: 'new',
    component: _RescuersNewPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }, {
    path: 'details/:id',
    component: _RescuersDetailsPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/areas',
  component: _AreasPage2.default,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: 'new/:id',
    component: _AreasNewPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/actions',
  component: _ActionsPage2.default,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: _ActionsOverviewPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '/history',
  component: _ActionsPage2.default,
  meta: {
    authenticatedRoute: true
  },
  children: [{
    path: '',
    component: _ActionsHistoryPage2.default,
    meta: {
      authenticatedRoute: true
    }
  }]
}, {
  path: '*',
  component: _NotFoundPage2.default,
  name: '404',
  meta: {
    authenticatedRoute: false
  }
}];

var router = new _vueRouter2.default({
  routes: routes
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

exports.default = router;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var url = _ref.url,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'get' : _ref$method,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers;

  var requestUrl = url;
  var requestData = {
    method: method,
    headers: _extends({
      'Content-type': 'application/json'
    }, headers)
  };

  if (expectsPayload(method)) {
    requestData.body = JSON.stringify(data);
  }

  if (method === 'get') {
    var query = querify(data);
    requestUrl = query ? url + '?' + query : url;
  }

  return fetch(requestUrl, requestData).then(resolveStatus).then(json);
};

var _qs = __webpack_require__(48);

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function querify(data) {
  return _qs2.default.stringify(data, { arrayFormat: 'brackets' });
}

function resolveStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response.statusText);
}

function json(response) {
  return response.json().then(function (data) {
    return {
      data: data,
      headers: response.headers
    };
  });
}

function expectsPayload(method) {
  var normalizedMethod = method.toLowerCase();
  return ['post', 'put', 'patch'].includes(normalizedMethod);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var apiAdapter = _ref.apiAdapter,
      localStorage = _ref.localStorage;

  return {
    login: function login(_ref2, _ref3) {
      var commit = _ref2.commit;
      var username = _ref3.username,
          password = _ref3.password;

      commit(mutationTypes.SESSION_REQUEST);
      return apiAdapter.login({
        username: username, password: password
      }).then(function (_ref4) {
        var user = _ref4.user,
            token = _ref4.token;

        commit(mutationTypes.SESSION_SUCCESS, {
          user: user,
          token: token
        });
      }).catch(function (error) {
        commit(mutationTypes.SESSION_FAILURE);
        throw error;
      });
    },
    checkSession: function checkSession(_ref5) {
      var commit = _ref5.commit;

      var token = localStorage.getItem('api-token');
      if (token) {
        commit(mutationTypes.SESSION_REQUEST);
        apiAdapter.setToken(token);
        return apiAdapter.currentUser().then(function (_ref6) {
          var data = _ref6.data;

          commit(mutationTypes.SESSION_SUCCESS, {
            user: data,
            token: token
          });
        }).catch(function (error) {
          commit(mutationTypes.SESSION_FAILURE);
          throw error;
        });
      }
      return Promise.reject();
    },
    logout: function logout(_ref7) {
      var commit = _ref7.commit;

      localStorage.removeItem('api-token');
      commit(mutationTypes.SESSION_DESTROY);
    },
    fetchRescuers: function fetchRescuers(_ref8) {
      var state = _ref8.state,
          commit = _ref8.commit;

      if (state.rescuers.data.length) {
        return;
      }
      commit(mutationTypes.RESCUERS_REQUEST);
      apiAdapter.fetchRescuers().then(function (data) {
        commit(mutationTypes.RESCUERS_SUCCESS, data);
      }).catch(function (error) {
        commit(mutationTypes.RESCUERS_FAILURE);
        throw error;
      });
    },
    getRescuerDetails: function getRescuerDetails(_ref9, _ref10) {
      var commit = _ref9.commit,
          state = _ref9.state;
      var id = _ref10.id;

      commit(mutationTypes.RESCUERS_DETAIL_REQUEST);
      apiAdapter.fetchRescuerByID(id).then(function (data) {
        commit(mutationTypes.RESCUERS_DETAIL_SUCCESS, data);
        return data;
      }).catch(function () {
        commit(mutationTypes.RESCUERS_DETAIL_FAILURE);
      });
    },
    sendRescuerDetails: function sendRescuerDetails(_ref11) {
      var state = _ref11.state;

      apiAdapter.sendRescuer(state.currentRescuer.data).then(function (data) {
        state.rescuers.data.push(state.currentRescuer.data);
      }).catch(function () {});
    },
    patchRescuerDetails: function patchRescuerDetails(_ref12) {
      var state = _ref12.state;

      apiAdapter.patchRescuer(state.currentRescuer.data).then(function (data) {
        var indexToEdit = void 0;
        state.currentRescuer.data = state.rescuers.data.forEach(function (res, index) {
          if (res.id === state.currentRescuer.data.id) {
            indexToEdit = index;
          }
        });

        state.rescuers.data[indexToEdit] = state.currentRescuer.data;
      }).catch(function () {});
    },
    sendAreaDetails: function sendAreaDetails(_ref13) {
      var state = _ref13.state;

      apiAdapter.sendArea(state.currentArea.data).then(function (data) {}).catch(function () {});
    },
    fetchActions: function fetchActions(_ref14) {
      var commit = _ref14.commit,
          state = _ref14.state;

      commit(mutationTypes.ACTIONS_REQUEST);
      apiAdapter.fetchActions().then(function (data) {
        commit(mutationTypes.ACTIONS_SUCCESS, data);
      }).catch(function (error) {
        commit(mutationTypes.ACTIONS_FAILURE);
        throw error;
      });
    },
    fetchHistory: function fetchHistory(_ref15) {
      var commit = _ref15.commit,
          state = _ref15.state;

      commit(mutationTypes.HISTORY_REQUEST);
      apiAdapter.fetchHistory().then(function (data) {
        commit(mutationTypes.HISTORY_SUCCESS, data);
      }).catch(function (error) {
        commit(mutationTypes.HISTORY_FAILURE);
        throw error;
      });
    }
  };
};

var _mutationTypes = __webpack_require__(2);

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  isAuthenticated: function isAuthenticated(state, getters) {
    return Boolean(getters.currentUser);
  },
  currentUser: function currentUser(state) {
    return state.session.user;
  },
  rescuers: function rescuers(state) {
    return state.rescuers.data;
  },
  isRescuersLoaded: function isRescuersLoaded(state) {
    return state.rescuers.isLoaded;
  },
  isRescuersLoading: function isRescuersLoading(state) {
    return state.rescuers.isLoading;
  },
  getRescuerDetails: function getRescuerDetails(state) {
    return state.currentRescuer.data;
  },
  actions: function actions(state) {
    return state.actions.data;
  },
  isActionsLoaded: function isActionsLoaded(state) {
    return state.actions.isLoaded;
  },
  isActionsLoading: function isActionsLoading(state) {
    return state.actions.isLoading;
  },
  history: function history(state) {
    return state.history.data;
  },
  isHistoryLoaded: function isHistoryLoaded(state) {
    return state.history.isLoaded;
  },
  isHistoryLoading: function isHistoryLoading(state) {
    return state.history.isLoading;
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutationTypes$SESSIO;

var _apiAdapter = __webpack_require__(6);

var _apiAdapter2 = _interopRequireDefault(_apiAdapter);

var _localStorage = __webpack_require__(7);

var localStorage = _interopRequireWildcard(_localStorage);

var _mutationTypes = __webpack_require__(2);

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_mutationTypes$SESSIO = {}, _defineProperty(_mutationTypes$SESSIO, mutationTypes.SESSION_REQUEST, function (state) {
  state.session.isLoading = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.SESSION_SUCCESS, function (state, _ref) {
  var user = _ref.user,
      token = _ref.token;

  state.session.isLoading = false;
  state.session.isLoaded = true;
  state.session.user = user;
  state.session.token = token;

  localStorage.setItem('api-token', token);
  _apiAdapter2.default.setToken(token);
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.SESSION_FAILURE, function (state) {
  state.session.isLoading = false;
  state.session.isLoaded = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.SESSION_DESTROY, function (state) {
  state.session.user = null;
  state.session.token = '';
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.UNAUTHENTICATED_REQUEST, function (state, pathName) {
  state.session.nextPathName = pathName;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_REQUEST, function (state) {
  state.rescuers.isLoading = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_SUCCESS, function (state, data) {
  state.rescuers.data = data;
  state.rescuers.isLoaded = true;
  state.rescuers.isLoading = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_FAILURE, function (state) {
  state.rescuers.isLoading = false;
  state.rescuers.isLoaded = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_DETAIL_REQUEST, function (state) {
  state.rescuers.isLoading = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_DETAIL_SUCCESS, function (state) {
  state.rescuers.isLoaded = true;
  state.rescuers.isLoading = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_DETAIL_EDIT, function (state, data) {
  state.currentRescuer.data = data;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_DETAIL_FAILURE, function (state) {
  state.rescuers.isLoading = false;
  state.rescuers.isLoaded = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.RESCUERS_DETAIL_SET, function (state, id) {
  state.currentRescuer.data = state.rescuers.data.find(function (res) {
    return res.id === id;
  });
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.AREA_DETAIL_SET, function (state, data) {
  state.currentArea.data = data;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.ACTIONS_REQUEST, function (state) {
  state.actions.isLoading = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.ACTIONS_SUCCESS, function (state, data) {
  state.actions.data = data;
  state.actions.isLoaded = true;
  state.actions.isLoading = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.ACTIONS_FAILURE, function (state) {
  state.actions.isLoading = false;
  state.actions.isLoaded = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.HISTORY_REQUEST, function (state) {
  state.history.isLoading = true;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.HISTORY_SUCCESS, function (state, data) {
  state.history.data = data;
  state.history.isLoaded = true;
  state.history.isLoading = false;
}), _defineProperty(_mutationTypes$SESSIO, mutationTypes.HISTORY_FAILURE, function (state) {
  state.history.isLoading = false;
  state.history.isLoaded = false;
}), _mutationTypes$SESSIO);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {
  session: {
    isLoaded: false,
    isLoading: false,
    user: null,
    token: null
  },
  rescuers: {
    isLoaded: false,
    isLoading: false,
    data: []
  },
  currentRescuer: {
    data: {}
  },
  currentArea: {
    data: {}
  },
  actions: {
    isLoaded: false,
    isLoading: false,
    data: []
  },

  history: {
    isLoaded: false,
    isLoading: false,
    data: []
  }
};

exports.default = state;

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"n8qEkwzZigLSZk1PUBhRI_0"};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"DLPugLOZrq4D5Pp6DO0xU_0"};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"q_YOT5n8AEKGjrmf90xEg_0"};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"map":"_2bozokgbJ99Ay8eJU0ilLE_0"};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"_1bHSUrA5ZPvLl0lgHlensc_0","loader":"_2cZ57CSStYj2CX6L9yJDVo_0","row":"_3YQBNZXgiqJ1AYW5875m51_0"};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"_2el8DF1jZVRqnsCV86Ux0c_0","loader":"_1M0FhBwnVWhnU0p1xYASv0_0","row":"_35tnBp38YricQSIg2YOG3l_0"};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"title":"_2dd63Tii2WogySRoq1CxKv_0"};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"card":"_29BajvS9KaNwvoB1mnUQgO_0","loader":"_23S31nw5WmfIF3qSmkTWJn_0","row":"_2HSwGr2pAdfIu69O64X2UV_0"};

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(46)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(75),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/components/Application.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Application.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e61832ba", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-e61832ba", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(40)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(69),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/ActionsPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ActionsPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52729105", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-52729105", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(35)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(64),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/AreasPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AreasPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03846664", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-03846664", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(39)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(68),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/HomePage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HomePage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4826f405", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-4826f405", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(36)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(65),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/LoginPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LoginPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d88e7b1", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-0d88e7b1", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(42)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(71),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/NotFoundPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotFoundPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60701fd6", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-60701fd6", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(41)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(70),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/RescuersPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RescuersPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-577e2dba", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-577e2dba", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(45)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(74),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/actions/ActionsHistoryPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ActionsHistoryPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a77af0e2", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-a77af0e2", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(44)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(73),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/actions/ActionsOverviewPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ActionsOverviewPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84fe70e8", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-84fe70e8", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(43)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(72),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/areas/AreasNewPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AreasNewPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74b4cdee", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-74b4cdee", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(37)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(66),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/rescuers/RescuersDetailsPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RescuersDetailsPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d0fb8f9", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-1d0fb8f9", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(38)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(67),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/rescuers/RescuersNewPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RescuersNewPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1daf2a57", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-1daf2a57", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
var cssModules = {}
cssModules["$style"] = __webpack_require__(47)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(76),
  /* scopeId */
  null,
  /* cssModules */
  cssModules
)
Component.options.__file = "/Users/mjanjic/Desktop/droppers/vue-js/src/pages/rescuers/RescuersOverviewPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RescuersOverviewPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e9ad6560", Component.options)
  } else {
    if (module.hot.data.cssModules && JSON.stringify(module.hot.data.cssModules) !== JSON.stringify(cssModules)) {
      delete Component.options._Ctor
    }
    hotAPI.reload("data-v-e9ad6560", Component.options)
  }
  module.hot.dispose(function (data) {
    data.cssModules = cssModules
  })
})()}

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-03846664", module.exports)
  }
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-card', {
    class: _vm.$style.card
  }, [_c('md-card-header-text', [_c('div', {
    staticClass: "md-title"
  }, [_vm._v("Login")])]), _vm._v(" "), _c('md-card-content', [_c('form', {
    attrs: {
      "novalidate": ""
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.loginSubmit($event)
      }
    }
  }, [_c('md-input-container', {
    class: {
      'md-input-invalid': _vm.invalidLogin
    }
  }, [_c('label', [_vm._v("Username")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.username),
      callback: function($$v) {
        _vm.username = $$v
      },
      expression: "username"
    }
  })], 1), _vm._v(" "), _c('md-input-container', {
    class: {
      'md-input-invalid': _vm.invalidLogin
    }
  }, [_c('label', [_vm._v("Password")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "type": "password"
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.invalidLogin),
      expression: "invalidLogin"
    }],
    staticClass: "md-error"
  }, [_vm._v("Username or password incorrect")])], 1), _vm._v(" "), _c('md-button', {
    staticClass: "md-warn md-raised",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Submit")])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d88e7b1", module.exports)
  }
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isRescuersLoaded && !_vm.isEditMode) ? _c('md-card', {
    class: _vm.$style.card
  }, [_c('div', {
    staticClass: "md-headline"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.firstName + ' ' + _vm.getRescuerDetails.lastName))]), _vm._v(" "), _c('div', {
    staticClass: "md-subheading"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.email))]), _vm._v(" "), _c('div', {
    staticClass: "md-subheading"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.phoneNumber))]), _vm._v(" "), (_vm.getRescuerDetails.specialities) ? _c('div', {
    staticClass: "md-subheading"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.specialities.join(', ')))]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.getRescuerDetails.hasSearchDog),
      expression: "getRescuerDetails.hasSearchDog"
    }],
    staticClass: "md-subheading"
  }, [_vm._v("Has search dog")]), _vm._v(" "), _c('div', {
    staticClass: "md-subheading"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.rank))]), _vm._v(" "), _c('div', {
    staticClass: "md-subheading"
  }, [_vm._v(_vm._s(_vm.getRescuerDetails.region))])]) : _vm._e(), _vm._v(" "), _c('md-card', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEditMode),
      expression: "isEditMode"
    }],
    class: _vm.$style.card
  }, [_c('md-card-header-text', [_c('div', {
    staticClass: "md-title"
  }, [_vm._v("Edit rescuer")])]), _vm._v(" "), _c('md-card-content', [(_vm.form) ? _c('form', {
    attrs: {
      "novalidate": ""
    }
  }, [_c('label', [_vm._v("Name")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("First name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.firstName),
      callback: function($$v) {
        _vm.form.firstName = $$v
      },
      expression: "form.firstName"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Last name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.lastName),
      callback: function($$v) {
        _vm.form.lastName = $$v
      },
      expression: "form.lastName"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Address")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("City")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.city),
      callback: function($$v) {
        _vm.form.address.city = $$v
      },
      expression: "form.address.city"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Country")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.country),
      callback: function($$v) {
        _vm.form.address.country = $$v
      },
      expression: "form.address.country"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Postal code")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.postalCode),
      callback: function($$v) {
        _vm.form.address.postalCode = $$v
      },
      expression: "form.address.postalCode"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Street name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.street),
      callback: function($$v) {
        _vm.form.address.street = $$v
      },
      expression: "form.address.street"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Street number")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.streetNumber),
      callback: function($$v) {
        _vm.form.address.streetNumber = $$v
      },
      expression: "form.address.streetNumber"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Contact")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Email")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.email),
      callback: function($$v) {
        _vm.form.email = $$v
      },
      expression: "form.email"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Phone number")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.phoneNumber),
      callback: function($$v) {
        _vm.form.phoneNumber = $$v
      },
      expression: "form.phoneNumber"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Other")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Rank")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.rank),
      callback: function($$v) {
        _vm.form.rank = $$v
      },
      expression: "form.rank"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Region")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.region),
      callback: function($$v) {
        _vm.form.region = $$v
      },
      expression: "form.region"
    }
  })], 1), _vm._v(" "), _c('div', [_c('md-checkbox', {
    model: {
      value: (_vm.form.hasSearchDog),
      callback: function($$v) {
        _vm.form.hasSearchDog = $$v
      },
      expression: "form.hasSearchDog"
    }
  }, [_vm._v("Search dog")])], 1), _vm._v(" "), _c('label', [_vm._v("Schedule")])], 1) : _vm._e()])], 1), _vm._v(" "), (_vm.isRescuersLoaded) ? _c('md-button', {
    staticClass: "md-fab md-fab-bottom-right",
    nativeOn: {
      "click": function($event) {
        _vm.toggleEditMode($event)
      }
    }
  }, [(_vm.isEditMode) ? _c('md-icon', {
    nativeOn: {
      "click": function($event) {
        _vm.formSubmit($event)
      }
    }
  }, [_vm._v("save")]) : _c('md-icon', [_vm._v("edit")])], 1) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1d0fb8f9", module.exports)
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-card', {
    class: _vm.$style.card
  }, [_c('md-card-header-text', [_c('div', {
    staticClass: "md-title"
  }, [_vm._v("New rescuer")])]), _vm._v(" "), _c('md-card-content', [_c('form', {
    attrs: {
      "novalidate": ""
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.formSubmit($event)
      }
    }
  }, [_c('label', [_vm._v("Name")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("First name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.firstName),
      callback: function($$v) {
        _vm.form.firstName = $$v
      },
      expression: "form.firstName"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Last name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.lastName),
      callback: function($$v) {
        _vm.form.lastName = $$v
      },
      expression: "form.lastName"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Password")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "type": "password"
    },
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.form.password = $$v
      },
      expression: "form.password"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Address")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("City")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.city),
      callback: function($$v) {
        _vm.form.address.city = $$v
      },
      expression: "form.address.city"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Country")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.country),
      callback: function($$v) {
        _vm.form.address.country = $$v
      },
      expression: "form.address.country"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Postal code")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.postalCode),
      callback: function($$v) {
        _vm.form.address.postalCode = $$v
      },
      expression: "form.address.postalCode"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Street name")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.street),
      callback: function($$v) {
        _vm.form.address.street = $$v
      },
      expression: "form.address.street"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Street number")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.address.streetNumber),
      callback: function($$v) {
        _vm.form.address.streetNumber = $$v
      },
      expression: "form.address.streetNumber"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Contact")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Email")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.email),
      callback: function($$v) {
        _vm.form.email = $$v
      },
      expression: "form.email"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Phone number")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "type": "tel"
    },
    model: {
      value: (_vm.form.phoneNumber),
      callback: function($$v) {
        _vm.form.phoneNumber = $$v
      },
      expression: "form.phoneNumber"
    }
  })], 1), _vm._v(" "), _c('label', [_vm._v("Other")]), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Rank")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.rank),
      callback: function($$v) {
        _vm.form.rank = $$v
      },
      expression: "form.rank"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Region")]), _vm._v(" "), _c('md-input', {
    model: {
      value: (_vm.form.region),
      callback: function($$v) {
        _vm.form.region = $$v
      },
      expression: "form.region"
    }
  })], 1), _vm._v(" "), _c('md-input-container', [_c('label', [_vm._v("Specialties")]), _vm._v(" "), _c('md-select', {
    attrs: {
      "multiple": ""
    },
    model: {
      value: (_vm.form.specialties),
      callback: function($$v) {
        _vm.form.specialties = $$v
      },
      expression: "form.specialties"
    }
  }, [_c('md-subheader', [_vm._v("Specialties")]), _vm._v(" "), _vm._l((_vm.specialties), function(spec) {
    return _c('md-option', {
      key: spec.name,
      attrs: {
        "value": spec.name
      }
    }, [_vm._v(_vm._s(spec.label))])
  })], 2)], 1), _vm._v(" "), _c('div', [_c('md-checkbox', {
    model: {
      value: (_vm.form.hasSearchDog),
      callback: function($$v) {
        _vm.form.hasSearchDog = $$v
      },
      expression: "form.hasSearchDog"
    }
  }, [_vm._v("Search dog")])], 1), _vm._v(" "), _c('label', [_vm._v("Weekly schedule")]), _vm._v(" "), _c('md-input-container', {
    class: _vm.$style.dayInput
  }, [_c('label', [_vm._v("Hour Start")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "type": "number"
    },
    model: {
      value: (_vm.form.availablePeriods[0].startHour),
      callback: function($$v) {
        _vm.form.availablePeriods[0].startHour = $$v
      },
      expression: "form.availablePeriods[0].startHour"
    }
  })], 1), _vm._v(" "), _c('md-input-container', {
    class: _vm.$style.dayInput
  }, [_c('label', [_vm._v("HourEnd")]), _vm._v(" "), _c('md-input', {
    attrs: {
      "type": "number"
    },
    model: {
      value: (_vm.form.availablePeriods[0].endHour),
      callback: function($$v) {
        _vm.form.availablePeriods[0].endHour = $$v
      },
      expression: "form.availablePeriods[0].endHour"
    }
  })], 1), _vm._v(" "), _c('md-button', {
    staticClass: "md-warn md-raised",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Submit")])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1daf2a57", module.exports)
  }
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n  HOME PAGE\n\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4826f405", module.exports)
  }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-52729105", module.exports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-577e2dba", module.exports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n  Not found\n  "), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Home")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60701fd6", module.exports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    class: _vm.$style.map,
    attrs: {
      "id": "map"
    }
  }), _vm._v(" "), _c('md-button', {
    staticClass: "md-warn md-raised",
    nativeOn: {
      "click": function($event) {
        _vm.onSave($event)
      }
    }
  }, [_vm._v("Save")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74b4cdee", module.exports)
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isActionsLoading) ? _c('div', {
    class: _vm.$style.loader
  }, [_c('md-spinner', {
    staticClass: "md-warn",
    attrs: {
      "md-indeterminate": ""
    }
  })], 1) : _c('div', [_c('md-table-card', {
    class: _vm.$style.card
  }, [_c('md-table', {
    attrs: {
      "md-sort": "description"
    },
    on: {
      "sort": _vm.reOrder
    }
  }, [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
    attrs: {
      "md-sort-by": "description"
    }
  }, [_vm._v("Description")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "injuredContact"
    }
  }, [_vm._v("Injured person contact")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "personWhoCalledContact"
    }
  }, [_vm._v("Incident reporter contact")])], 1)], 1), _vm._v(" "), _c('md-table-body', _vm._l((_vm.orderedActions), function(act) {
    return _c('md-table-row', {
      key: act.id,
      class: _vm.$style.row,
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.rowSelected(act.id)
        }
      }
    }, [_c('md-table-cell', [_vm._v(_vm._s(act.description))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(act.injuredContact))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(act.personWhoCalledContact))])], 1)
  }))], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-84fe70e8", module.exports)
  }
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isHistoryLoading) ? _c('div', {
    class: _vm.$style.loader
  }, [_c('md-spinner', {
    staticClass: "md-warn",
    attrs: {
      "md-indeterminate": ""
    }
  })], 1) : _c('div', [_c('md-table-card', {
    class: _vm.$style.card
  }, [_c('md-table', {
    attrs: {
      "md-sort": "description"
    },
    on: {
      "sort": _vm.reOrder
    }
  }, [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
    attrs: {
      "md-sort-by": "description"
    }
  }, [_vm._v("Description")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "injuredContact"
    }
  }, [_vm._v("Injured person contact")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "personWhoCalledContact"
    }
  }, [_vm._v("Incident reporter contact")])], 1)], 1), _vm._v(" "), _c('md-table-body', _vm._l((_vm.orderedActions), function(act) {
    return _c('md-table-row', {
      key: act.id,
      class: _vm.$style.row,
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.rowSelected(act.id)
        }
      }
    }, [_c('md-table-cell', [_vm._v(_vm._s(act.description))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(act.injuredContact))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(act.personWhoCalledContact))])], 1)
  }))], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a77af0e2", module.exports)
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('md-toolbar', [_c('md-button', {
    staticClass: "md-icon-button",
    nativeOn: {
      "click": function($event) {
        _vm.toggleSidenav($event)
      }
    }
  }, [_c('md-icon', [_vm._v("menu")])], 1), _vm._v(" "), _c('h2', {
    class: [_vm.$style.title, 'md-title']
  }, [_vm._v("HGSS - Admin dashboard")]), _vm._v(" "), _c('md-button', {
    staticClass: "md-icon-button",
    nativeOn: {
      "click": function($event) {
        _vm.logoutCurrentUser($event)
      }
    }
  }, [_c('md-icon', [_vm._v("exit_to_app")])], 1)], 1), _vm._v(" "), _c('md-sidenav', {
    ref: "sidenav",
    staticClass: "md-left"
  }, [_c('md-toolbar', {
    staticClass: "md-large"
  }, [_c('div', {
    staticClass: "md-toolbar-container"
  }, [_c('h3', {
    staticClass: "md-title"
  }, [_vm._v("Menu")])])]), _vm._v(" "), _c('md-list', [_c('md-list-item', [_c('router-link', {
    attrs: {
      "exact": "",
      "to": '/home'
    }
  }, [_c('md-icon', [_vm._v("home")]), _vm._v(" "), _c('span', [_vm._v("Home")])], 1)], 1), _vm._v(" "), _c('md-list-item', [_c('router-link', {
    attrs: {
      "exact": "",
      "to": '/rescuers'
    }
  }, [_c('md-icon', [_vm._v("directions_run")]), _vm._v(" "), _c('span', [_vm._v("Rescuers")])], 1)], 1), _vm._v(" "), _c('md-list-item', [_c('router-link', {
    attrs: {
      "exact": "",
      "to": '/actions'
    }
  }, [_c('md-icon', [_vm._v("priority_high")]), _vm._v(" "), _c('span', [_vm._v("Actions")])], 1)], 1), _vm._v(" "), _c('md-list-item', [_c('router-link', {
    attrs: {
      "exact": "",
      "to": '/history'
    }
  }, [_c('md-icon', [_vm._v("history")]), _vm._v(" "), _c('span', [_vm._v("History")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e61832ba", module.exports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isRescuersLoading) ? _c('div', {
    class: _vm.$style.loader
  }, [_c('md-spinner', {
    staticClass: "md-warn",
    attrs: {
      "md-indeterminate": ""
    }
  })], 1) : _c('div', [_c('md-table-card', {
    class: _vm.$style.card
  }, [_c('md-table', {
    attrs: {
      "md-sort": "firstName"
    },
    on: {
      "sort": _vm.reOrder
    }
  }, [_c('md-table-header', [_c('md-table-row', [_c('md-table-head', {
    attrs: {
      "md-sort-by": "firstName"
    }
  }, [_vm._v("First name")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "lastName"
    }
  }, [_vm._v("Last name")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "phoneNumber"
    }
  }, [_vm._v("Phone number")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "email"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "adress"
    }
  }, [_vm._v("Adress")]), _vm._v(" "), _c('md-table-head', {
    attrs: {
      "md-sort-by": "speciality"
    }
  }, [_vm._v("Speciality")])], 1)], 1), _vm._v(" "), _c('md-table-body', _vm._l((_vm.orderedRescuers), function(res) {
    return _c('md-table-row', {
      key: res.id,
      class: _vm.$style.row,
      nativeOn: {
        "click": function($event) {
          $event.preventDefault();
          _vm.rowSelected(res.id)
        }
      }
    }, [_c('md-table-cell', {
      attrs: {
        "md-sort-by": "res.firstName"
      }
    }, [_vm._v(_vm._s(res.firstName))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(res.lastName))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(res.phoneNumber))]), _vm._v(" "), _c('md-table-cell', [_vm._v(_vm._s(res.email))]), _vm._v(" "), (res.address) ? _c('md-table-cell', [_vm._v(_vm._s(res.address.street + ' ' + res.address.streetNumber))]) : _c('md-table-cell', [_vm._v("No info")]), _vm._v(" "), (res.specialties) ? _c('md-table-cell', [_vm._v(_vm._s(res.specialties.join(', ')))]) : _c('md-table-cell', [_vm._v("No info")])], 1)
  }))], 1)], 1), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": '/rescuers/new'
    }
  }, [_c('md-button', {
    staticClass: "md-fab md-fab-bottom-right"
  }, [_c('md-icon', [_vm._v("add")])], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e9ad6560", module.exports)
  }
}

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
],[81]);