/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameRules/BanditAI.js":
/*!***********************************!*\
  !*** ./src/gameRules/BanditAI.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BanditAI)
/* harmony export */ });
/* harmony import */ var _GameTurn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameTurn */ "./src/gameRules/GameTurn.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var BanditAI = /*#__PURE__*/function (_GameTurn) {
  _inherits(BanditAI, _GameTurn);

  var _super = _createSuper(BanditAI);

  function BanditAI(gameCharacter) {
    var _this$gameCharacter$s;

    var _this;

    _classCallCheck(this, BanditAI);

    console.log('Bandit AI loading for ' + (gameCharacter === null || gameCharacter === void 0 ? void 0 : gameCharacter.name));
    _this = _super.call(this, gameCharacter);

    _defineProperty(_assertThisInitialized(_this), "hasAction", true);

    _this.state = _this.gameCharacter.state;
    _this.walk = (_this$gameCharacter$s = _this.gameCharacter.sheet.walk) !== null && _this$gameCharacter$s !== void 0 ? _this$gameCharacter$s : 6;
    return _this;
  }

  _createClass(BanditAI, [{
    key: "aiActionChoice",
    value: function aiActionChoice() {
      if (this.walk > 0) {
        this.actionChoice = 'move';
        return this.state.setState(['aiTurn', 'move']);
      } else if (this.hasAction == true) {
        console.log('>> seek attack');
        var threatenSquares = this.state.map.pathAdjacencies(this.gameCharacter.position);
        var found = false;

        var _iterator = _createForOfIteratorHelper(threatenSquares),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var square = _step.value;

            if ('' + square == '' + this.gameCharacter.aiSeekKill.position) {
              console.log('found');
              return this.state.setState(['aiTurn', 'attack']);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.hasAction = false;
        return this.state.setState();
      } else {
        return this.state.setState(['aiTurn', 'end']);
      }
    }
  }, {
    key: "aiMove",
    value: function aiMove() {
      this.state.stateChain = ['aiTurn', 'end'];

      if (this.gameCharacter.aiSeekKill && this.walk > 0) {
        var moveTo = this.gameCharacter.aiSeekKill.position;
        var path = this.state.map.aStar(this.gameCharacter.position, moveTo);

        if (path.length > this.walk) {
          path = path.slice(0, this.walk);
        }

        if ('' + path[path.length - 1] == this.gameCharacter.aiSeekKill.position) {
          path = path.slice(0, path.length - 1);
        }

        this.walk = 0;

        if (path.length > 1) {
          console.log('AI walking');
          this.gameCharacter.walkPath = path;
          return this.state.setState(['aiTurn', 'animate']);
        } else {
          console.log('AI at destination');
          return this.state.setState(['aiTurn', 'mainMenu']);
        }
      } else {
        console.log('aiMove: no target to seek');
        return this.state.setState(['aiTurn', 'end']);
      }
    }
  }, {
    key: "aiAttack",
    value: function aiAttack() {
      console.log('Attack');
      this.gameCharacter.attack(this.gameCharacter.aiSeekKill);
      this.hasAction = false;
      this.state.stateChain = ['aiTurn', 'mainMenu'];
      this.state.loop.go();
    }
  }]);

  return BanditAI;
}(_GameTurn__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/gameRules/GameCharacter.js":
/*!****************************************!*\
  !*** ./src/gameRules/GameCharacter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameCharacter)
/* harmony export */ });
/* harmony import */ var _lib_Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Character */ "./src/lib/Character.js");
/* harmony import */ var _lib_AnimationPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/AnimationPath */ "./src/lib/AnimationPath.js");
/* harmony import */ var _lib_Callback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Callback */ "./src/lib/Callback.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var GameCharacter = /*#__PURE__*/function () {
  function GameCharacter(name) {
    _classCallCheck(this, GameCharacter);

    _defineProperty(this, "prefab", void 0);

    _defineProperty(this, "position", void 0);

    _defineProperty(this, "animationState", 'idle');

    _defineProperty(this, "sheet", {});

    _defineProperty(this, "walkPath", []);

    _defineProperty(this, "animations", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "HP", void 0);

    _defineProperty(this, "deathSaveSuccesses", 0);

    _defineProperty(this, "deathSaveFailures", 0);

    _defineProperty(this, "isAI", false);

    _defineProperty(this, "isAlive", true);

    _defineProperty(this, "initiative", 10);

    _defineProperty(this, "_lastAnimationState", void 0);

    this.name = name; // TODO: this is a stupid hack

    if (this.name == 'Sam') {
      this.isAI = true;
    }
  }

  _createClass(GameCharacter, [{
    key: "place",
    value: function place() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var facing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (position != null) {
        this.position = position;
        this.character.place(position);
      }

      if (facing != null) {
        this.character.setFacing(facing);
      }
    }
  }, {
    key: "centerCameraOn",
    value: function centerCameraOn() {
      this.character.centerInCamera();
    }
  }, {
    key: "rollInitiative",
    value: function rollInitiative() {
      var mod = 0;
      if ('dex' in this.sheet) mod = Math.floor((this.sheet.dex - 10) / 2);
      this.initiative = Math.ceil(Math.random() * 20) + mod;
    }
  }, {
    key: "updateState",
    value: function updateState() {
      var _this = this;

      if (this.HP <= 0) {
        this.animationState = 'die';
        this.isAlive = false;
      }

      if (this.animationState && this.animationState != this._lastAnimationState) {
        var _this$prefab;

        if ((_this$prefab = this.prefab) !== null && _this$prefab !== void 0 && _this$prefab.animations && this.prefab.animations[this.animationState]) {
          var reset = false; // TODO TODO: this is a hack, seriously, animations need work

          if (this.animationState == 'die' || this.animationState == 'attack') {
            console.log('die/attack reset');
            reset = true;
          }

          this.character.setAnimationGroup(this.prefab.animations[this.animationState], reset);
        }

        this._lastAnimationState = this.animationState;
      }

      if (this.walkPath && this.walkPath.length >= 2) {
        this.animationState = 'walk';
        var finalSquare = this.walkPath[this.walkPath.length - 1];
        var endWalk = new _lib_Callback__WEBPACK_IMPORTED_MODULE_2__.default(function () {
          _this.place(finalSquare);

          _this.state.update();

          if (_this.isAI) {
            _this.state.stateChain = ['aiTurn', 'mainMenu'];
          } else {
            _this.state.stateChain = ['turn', 'mainMenu'];
          }

          _this.state.loop.go();
        });
        this.character.setPathFromSequence(this.walkPath, this.animations['walk'], 15, endWalk.callString);
        this.walkPath = [];
      }
    }
  }, {
    key: "attack",
    value: function attack(targetGameCharacter) {
      console.log(this.name + ' attacks ' + targetGameCharacter.name);
      this.turn.actions = this.turn.actions.filter(function (act) {
        return act != 'action';
      });
      console.log('' + this.turn.actions);
      var damage = Math.ceil(Math.random() * 6);
      targetGameCharacter.HP -= damage;
      this.state.ui.popup = "".concat(this.name, " attack ").concat(targetGameCharacter.name, " for ").concat(damage, " damage");
      if (targetGameCharacter.HP <= 0) this.state.ui.popup += " ".concat(targetGameCharacter.name, " dies");
      this.state.update();
    } // TODO: set facing

  }], [{
    key: "fromPrefab",
    value: function fromPrefab(prefab, name) {
      var _newC$sheet$HP, _prefab$defaultSprite, _prefab$scale;

      var revealsMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var newC = new GameCharacter(name);
      newC.prefab = prefab;

      for (var key in (_prefab$sheet = prefab === null || prefab === void 0 ? void 0 : prefab.sheet) !== null && _prefab$sheet !== void 0 ? _prefab$sheet : {}) {
        var _prefab$sheet;

        newC.sheet[key] = prefab.sheet[key];
      }

      newC.HP = (_newC$sheet$HP = newC.sheet.HP) !== null && _newC$sheet$HP !== void 0 ? _newC$sheet$HP : 1;
      newC.animations = {};

      for (var key in (_prefab$animations = prefab === null || prefab === void 0 ? void 0 : prefab.animations) !== null && _prefab$animations !== void 0 ? _prefab$animations : {}) {
        var _prefab$animations;

        newC.animations[key] = prefab.animations[key];
      }

      newC.character = new _lib_Character__WEBPACK_IMPORTED_MODULE_0__.default(name, (_prefab$defaultSprite = prefab.defaultSprite) !== null && _prefab$defaultSprite !== void 0 ? _prefab$defaultSprite : null, null, (_prefab$scale = prefab.scale) !== null && _prefab$scale !== void 0 ? _prefab$scale : null, revealsMap);
      this.animationState = 'idle';
      if (newC.animations.idle) newC.character.setAnimationGroup(newC.animations.idle);
      return newC;
    }
  }]);

  return GameCharacter;
}();



/***/ }),

/***/ "./src/gameRules/GameLoop.js":
/*!***********************************!*\
  !*** ./src/gameRules/GameLoop.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameLoop)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameLoop = /*#__PURE__*/function () {
  function GameLoop(gameState) {
    _classCallCheck(this, GameLoop);

    _defineProperty(this, "state", void 0);

    this.state = gameState;
    this.state.loop = this;
  }

  _createClass(GameLoop, [{
    key: "go",
    value: function go() {
      if (this.state.stateChain[0] == 'setup') {
        this.state.sceneLoop.go();
      }
    }
  }]);

  return GameLoop;
}();



/***/ }),

/***/ "./src/gameRules/GameState.js":
/*!************************************!*\
  !*** ./src/gameRules/GameState.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameState)
/* harmony export */ });
/* harmony import */ var _SceneLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneLoop */ "./src/gameRules/SceneLoop.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var GameState = /*#__PURE__*/function () {
  function GameState() {
    _classCallCheck(this, GameState);

    _defineProperty(this, "sceneLoop", void 0);

    _defineProperty(this, "sceneState", void 0);

    _defineProperty(this, "loop", void 0);
  }

  _createClass(GameState, [{
    key: "loadScene",
    value: function loadScene(sceneState) {
      this.sceneLoop = new _SceneLoop__WEBPACK_IMPORTED_MODULE_0__.default(sceneState);
      this.sceneState = sceneState;
      this.stateChain = ['setup'];
      window.currentScene = sceneState;
      this.loop.go();
    }
  }]);

  return GameState;
}();



/***/ }),

/***/ "./src/gameRules/GameTurn.js":
/*!***********************************!*\
  !*** ./src/gameRules/GameTurn.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameTurn)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameTurn = /*#__PURE__*/function () {
  function GameTurn(gameCharacter) {
    var _this$gameCharacter$s, _this$gameCharacter$s2;

    _classCallCheck(this, GameTurn);

    _defineProperty(this, "actions", []);

    _defineProperty(this, "gameCharacter", void 0);

    _defineProperty(this, "walk", 0);

    this.gameCharacter = gameCharacter;
    this.gameCharacter.gameTurn = this;
    this.walk = (_this$gameCharacter$s = (_this$gameCharacter$s2 = this.gameCharacter.sheet) === null || _this$gameCharacter$s2 === void 0 ? void 0 : _this$gameCharacter$s2.walk) !== null && _this$gameCharacter$s !== void 0 ? _this$gameCharacter$s : 0;
    this.actions = ['action', 'bonus', 'reaction'];
  }

  _createClass(GameTurn, [{
    key: "hasMove",
    get: function get() {
      return this.walk >= 1;
    }
  }, {
    key: "hasAction",
    get: function get() {
      var _iterator = _createForOfIteratorHelper(this.actions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var act = _step.value;
          if (act == 'action') return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }]);

  return GameTurn;
}();



/***/ }),

/***/ "./src/gameRules/GameUI.js":
/*!*********************************!*\
  !*** ./src/gameRules/GameUI.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameUI)
/* harmony export */ });
/* harmony import */ var _lib_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Dialog */ "./src/lib/Dialog.js");
/* harmony import */ var _lib_Callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Callback */ "./src/lib/Callback.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/util */ "./src/lib/util.js");
/* harmony import */ var _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/HighlightGroup */ "./src/lib/HighlightGroup.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var GameUI = /*#__PURE__*/function () {
  function GameUI(state) {
    _classCallCheck(this, GameUI);

    _defineProperty(this, "moveSelectSquares", void 0);

    _defineProperty(this, "attackSelectSquares", void 0);

    _defineProperty(this, "popup", void 0);

    _defineProperty(this, "deathSaveSuccess", 0);

    _defineProperty(this, "deathSaveFail", 0);

    this.state = state;
  }

  _createClass(GameUI, [{
    key: "turnMenu",
    value: function turnMenu() {
      var _this = this;

      if (this.state.activeCharacter.HP <= 0) this.state.turnEnd();
      var moveAction = new _lib_Callback__WEBPACK_IMPORTED_MODULE_1__.default(function () {
        _this.firstMenu.destroy();

        _this.state.stateChain = ['turn', 'makeMove'];

        _this.state.loop.go();
      });
      var attackAction = new _lib_Callback__WEBPACK_IMPORTED_MODULE_1__.default(function () {
        _this.firstMenu.destroy();

        _this.state.stateChain = ['turn', 'attack'];

        _this.state.loop.go();
      });
      if (this.firstMenu) this.firstMenu.destroy();
      this.firstMenu = new _lib_Dialog__WEBPACK_IMPORTED_MODULE_0__.default(this.state.activeCharacter.name + '\'s turn');
      this.firstMenu.setText(this.state.activeCharacter.name + '\'s turn');
      this.firstMenu.place([1450, 300], [400, 400]);
      var endTurn = new _lib_Callback__WEBPACK_IMPORTED_MODULE_1__.default(function () {
        _this.firstMenu.destroy();

        _this.state.turnEnd();
      });

      if (this.state.activeCharacter.turn.hasMove) {
        this.firstMenu.addButton('Move', [32, 232], [400, 64], moveAction.callString);
      }

      if (this.state.activeCharacter.turn.hasAction) {
        this.firstMenu.addButton('Attack', [32, 132], [400, 64], attackAction.callString);
      }

      this.firstMenu.addButton('End Turn', [32, 32], [400, 64], endTurn.callString);
    }
  }, {
    key: "moveSelection",
    value: function moveSelection() {
      var _this$state$activeCha,
          _this$state$activeCha2,
          _this$state$activeCha3,
          _this2 = this;

      this.moveSelectSquares = this.state.map.closeSurfaces(this.state.activeCharacter.position, Math.floor((_this$state$activeCha = (_this$state$activeCha2 = this.state.activeCharacter) === null || _this$state$activeCha2 === void 0 ? void 0 : (_this$state$activeCha3 = _this$state$activeCha2.turn) === null || _this$state$activeCha3 === void 0 ? void 0 : _this$state$activeCha3.walk) !== null && _this$state$activeCha !== void 0 ? _this$state$activeCha : 0));
      this.state.update(); //console.log('moveSelectSquares:' + JSON.stringify(this.moveSelectSquares));

      this.state.map.receiveClick = function (coords, face) {
        // console.log(JSON.stringify(coords));
        // console.log(face);
        // console.log(JSON.stringify(this.moveSelectSquares));
        if (face == 0) {
          var found = false;

          var _iterator = _createForOfIteratorHelper(_this2.moveSelectSquares),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var checkCoords = _step.value;

              if ('' + coords == '' + checkCoords) {
                found = true;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          if (found) {
            _this2.state.map.receiveClick = function () {};

            var walkPath = _this2.state.map.aStar(_this2.state.activeCharacter.position, coords);

            if (!walkPath || walkPath.length <= 1) {
              _this2.moveSelectSquares = [];

              _this2.state.update();

              _this2.state.stateChain = ['turn', 'mainMenu'];

              _this2.state.loop.go();

              return;
            }

            _this2.state.activeCharacter.turn.walk -= walkPath.length - 1;
            _this2.state.activeCharacter.walkPath = walkPath;
            _this2.moveSelectSquares = [];
            _this2.state.stateChain = ['turn', 'animate'];

            _this2.state.update();

            _this2.state.loop.go();
          }
        }
      };
    }
  }, {
    key: "attackSelection",
    value: function attackSelection() {
      var _this3 = this;

      var characterPositions = [];

      var _iterator2 = _createForOfIteratorHelper(this.state.initiativeOrder),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var gC = _step2.value;
          characterPositions.push(gC.position);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var characterPosition = this.state.activeCharacter.position;
      var adjacencies = this.state.map.pathAdjacencies(characterPosition);
      adjacencies.push(characterPosition);
      var targets = [];

      for (var _i = 0, _characterPositions = characterPositions; _i < _characterPositions.length; _i++) {
        var charPos = _characterPositions[_i];

        var _iterator3 = _createForOfIteratorHelper(adjacencies),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var adjPos = _step3.value;

            if (charPos[0] == adjPos[0] && charPos[1] == adjPos[1] && charPos[2] == adjPos[2]) {
              targets.push(charPos);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      this.attackSelectSquares = targets;
      console.log('aSS:  ' + JSON.stringify(this.attackSelectSquares));
      this.state.update();

      this.state.map.receiveClick = function (coords, face) {
        if (face != 0) return;

        if ('' + coords == '' + characterPosition) {
          _this3.state.map.receiveClick = function () {};

          _this3.attackSelectSquares = [];

          _this3.state.update();

          _this3.state.stateChain = ['turn', 'mainMenu'];

          _this3.state.loop.go();

          return;
        }

        var found = false;
        var checkCoords;

        var _iterator4 = _createForOfIteratorHelper(_this3.attackSelectSquares),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            checkCoords = _step4.value;

            if ('' + coords == '' + checkCoords) {
              found = true;
              break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (found) {
          // find target character;
          var found2 = false;
          var targetGC;

          var _iterator5 = _createForOfIteratorHelper(_this3.state.initiativeOrder),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              targetGC = _step5.value;

              if ('' + targetGC.position == '' + coords) {
                found = true;
                break;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          _this3.state.activeCharacter.attack(targetGC);

          _this3.state.map.receiveClick = function () {};

          _this3.state.stateChain = ['turn', 'mainMenu'];
          _this3.attackSelectSquares = [];

          _this3.state.update();

          _this3.state.loop.go();
        }
      };
    }
  }, {
    key: "updateState",
    value: function updateState() {
      var _this4 = this;

      if (this.moveSelectSquares !== undefined && this.moveSelectSquares.length > 0) {
        if (!this.moveHG) this.moveHG = new _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__.default();else this.moveHG.clearHighlights();
        this.moveHG.highlightMultiple(this.moveSelectSquares, [0]);
        this.moveHG.showHighlights();
      } else {
        if (this.moveHG) this.moveHG.clearHighlights();
      }

      if (this.attackSelectSquares !== undefined && this.attackSelectSquares.length > 0) {
        if (!this.attackHG) this.attackHG = new _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__.default();else this.attackHG.clearHighlights();
        this.attackHG.highlightMultiple(this.attackSelectSquares, [0]);
        this.attackHG.showHighlights();
      } else {
        this.attackSelectSquares = [];
        if (this.attackHG) this.attackHG.clearHighlights();
      }

      if (this.popup) {
        if (this.popupDialog) this.popupDialog.destroy();
        this.popupDialog = new _lib_Dialog__WEBPACK_IMPORTED_MODULE_0__.default('_popup');
        this.popupDialog.setText(this.popup, .002);
        this.popupDialog.place(32, 32, 600, 300);
        _lib_Callback__WEBPACK_IMPORTED_MODULE_1__.default.delayed(4, function () {
          return _this4.popupDialog.destroy();
        });
        this.popup = null;
      }
    }
  }]);

  return GameUI;
}();



/***/ }),

/***/ "./src/gameRules/SceneLoop.js":
/*!************************************!*\
  !*** ./src/gameRules/SceneLoop.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SceneLoop)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneLoop = /*#__PURE__*/function () {
  function SceneLoop(state) {
    _classCallCheck(this, SceneLoop);

    this.state = state;
    this.state.loop = this;
  }

  _createClass(SceneLoop, [{
    key: "go",
    value: function go() {
      if (!this.state.stateChain) {} else if (this.state.stateChain[0] == 'setup') {
        console.log(':: setup');
        this.state.setup();
        this.state.update();
      } else if (this.state.stateChain[0] == 'turn') {
        if (this.state.stateChain.length == 1) {
          console.log(':: turn');
          this.state.turnSetup();
          this.state.update();
        } else if (this.state.stateChain[1] == 'mainMenu') {
          console.log(':: mainMenu');
          this.state.ui.turnMenu();
          this.state.update();
        } else if (this.state.stateChain[1] == 'makeMove') {
          console.log(':: makeMove');
          this.state.ui.moveSelection();
          this.state.update();
        } else if (this.state.stateChain[1] == 'attack') {
          console.log(':: attack');
          this.state.ui.attackSelection();
          this.state.update();
        } else if (this.state.stateChain[1] == 'end') {
          console.log(':: end');
          this.state.turnEnd();
          this.state.update();
        }
      } else if (this.state.stateChain[0] == 'aiTurn') {
        if (this.state.stateChain.length == 1) {
          console.log(':: ai turn');
          this.state.aiTurnSetup();
          this.state.update();
        } else if (this.state.stateChain[1] == 'mainMenu') {
          console.log(':: ai main menu');
          this.state.activeCharacter.turn.aiActionChoice();
          this.state.update();
        } else if (this.state.stateChain[1] == 'move') {
          console.log(':: ai move');
          this.state.activeCharacter.turn.aiMove();
          this.state.update();
        } else if (this.state.stateChain[1] == 'attack') {
          console.log(':: ai attack');
          this.state.activeCharacter.turn.aiAttack();
          this.state.update();
        } else if (this.state.stateChain[1] == 'end') {
          console.log(':: ai end');
          this.state.aiTurnEnd();
          this.state.update();
        }
      } else if (this.state.stateChain[0] == 'gameEnd') {
        console.log(':: game end');
      }
    }
  }]);

  return SceneLoop;
}();



/***/ }),

/***/ "./src/gameRules/SceneState.js":
/*!*************************************!*\
  !*** ./src/gameRules/SceneState.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SceneState)
/* harmony export */ });
/* harmony import */ var _lib_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Scene */ "./src/lib/Scene.js");
/* harmony import */ var _lib_Callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Callback */ "./src/lib/Callback.js");
/* harmony import */ var _GameCharacter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameCharacter */ "./src/gameRules/GameCharacter.js");
/* harmony import */ var _GameUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameUI */ "./src/gameRules/GameUI.js");
/* harmony import */ var _GameTurn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameTurn */ "./src/gameRules/GameTurn.js");
/* harmony import */ var _BanditAI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BanditAI */ "./src/gameRules/BanditAI.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var SceneState = /*#__PURE__*/function () {
  function SceneState(name) {
    _classCallCheck(this, SceneState);

    _defineProperty(this, "active", void 0);

    _defineProperty(this, "scene", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "loop", void 0);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "gameCharacters", {});

    _defineProperty(this, "gameMap", void 0);

    _defineProperty(this, "gameUI", void 0);

    _defineProperty(this, "initiativeIndex", -1);

    _defineProperty(this, "initiativeOrder", []);

    _defineProperty(this, "ui", void 0);

    _defineProperty(this, "activeCharacter", void 0);

    _defineProperty(this, "stateChain", ['setup']);

    _defineProperty(this, "_listeners", []);

    this.name = name;
    this.ui = new _GameUI__WEBPACK_IMPORTED_MODULE_3__.default(this);
    this.add(this.ui);
  }

  _createClass(SceneState, [{
    key: "deactivate",
    value: function deactivate() {
      if (this.scene) this.scene.deactivate();
    }
  }, {
    key: "activate",
    value: function activate() {
      if (this.scene == null) {
        this.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_0__.default(name, this);
      }

      if (window.currentScene && window.currentScene.deactivate) this.currentScene.deactivate();
      this.scene.activate();
      window.currentScene = this;
    }
  }, {
    key: "add",
    value: function add(object) {
      this._listeners.push(object);

      object.state = this;
      if ('addState' in object) object.addState();
    }
  }, {
    key: "update",
    value: function update() {
      var _iterator = _createForOfIteratorHelper(this._listeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          if (listener.updateState) listener.updateState();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      this.fillInitiativeOrder();
      this.initiativeIndex = 0;
      this.stateChain = ['turn'];
      this.loop.go();
    }
  }, {
    key: "setState",
    value: function setState() {
      var stateChain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (stateChain != null) this.stateChain = stateChain;
      this.update();
      this.loop.go();
    }
  }, {
    key: "turnSetup",
    value: function turnSetup() {
      var aliveCount = 0;

      var _iterator2 = _createForOfIteratorHelper(this.initiativeOrder),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var character = _step2.value;
          console.log("".concat(character.name, " ").concat(character.isAlive, " ").concat(character.isAI));
          if (character.isAlive && !character.isAI) aliveCount++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (aliveCount <= 0) {
        return this.setState(['endGame']);
      }

      if (this.initiativeOrder.length == 0) {
        this.activeCharacter = null;
        return this.setState(['turn', 'noCharacters']);
      } else {
        if (this.initiativeIndex >= this.initiativeOrder.length) {
          this.initiativeIndex = 0;
        }

        this.activeCharacter = this.initiativeOrder[this.initiativeIndex];

        if (this.activeCharacter.HP <= 0) {
          if (this.initiativeOrder.length <= 1) {
            return this.setState(['endGame']);
          } else {
            return this.setState(['turn', 'end']);
          }
        }

        if (this.activeCharacter.isAI) {
          return this.setState(['aiTurn']);
        } else {
          this.activeCharacter.turn = new _GameTurn__WEBPACK_IMPORTED_MODULE_4__.default(this.activeCharacter);
          this.activeCharacter.centerCameraOn();
          return this.setState(['turn', 'mainMenu']);
        }
      }
    }
  }, {
    key: "aiTurnSetup",
    value: function aiTurnSetup() {
      if (this.initiativeOrder.length == 0) {
        this.activeCharacter = null;
        return this.stateChain(['turn', 'noCharacters']);
      } else {
        // TODO: URGENT, this is a stupid hack
        this.activeCharacter.aiSeekKill = this.gameCharacters['Sal'];
        this.activeCharacter.turn = new _BanditAI__WEBPACK_IMPORTED_MODULE_5__.default(this.activeCharacter);
        this.activeCharacter.centerCameraOn();
        return this.setState(['aiTurn', 'mainMenu']);
      }
    }
  }, {
    key: "turnEnd",
    value: function turnEnd() {
      console.log('end');
      this.initiativeIndex = (this.initiativeIndex + 1) % this.initiativeOrder.length;
      return this.setState(['turn']);
    }
  }, {
    key: "aiTurnEnd",
    value: function aiTurnEnd() {
      console.log('ai turn end');
      this.initiativeIndex = (this.initiativeIndex + 1) % this.initiativeOrder.length;
      return this.setState(['turn']);
    }
  }, {
    key: "addCharacterPrefab",
    value: function addCharacterPrefab(prefab, name, position) {
      var initiative = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var revealsMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      if (!this.gameCharacters) this.gameCharacters = {};
      this.gameCharacters[name] = _GameCharacter__WEBPACK_IMPORTED_MODULE_2__.default.fromPrefab(prefab, name, revealsMap);
      this.gameCharacters[name].rollInitiative();
      this.gameCharacters[name].place(position);
      this.add(this.gameCharacters[name]);

      if (initiative == null) {
        this.gameCharacters[name].rollInitiative();
      } else this.gameCharacters[name].initiative = initiative;

      this.update();
      return this.gameCharacters[name];
    }
  }, {
    key: "fillInitiativeOrder",
    value: function fillInitiativeOrder() {
      this.initiativeOrder = [];

      for (var key in this.gameCharacters) {
        this.initiativeOrder.push(this.gameCharacters[key]);
      }

      this.initiativeOrder.sort(function (a, b) {
        return b.initiative - a.initiative;
      });
      return this.initiativeOrder;
    }
  }]);

  return SceneState;
}();



/***/ }),

/***/ "./src/lib/Animation.js":
/*!******************************!*\
  !*** ./src/lib/Animation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Animation)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation = /*#__PURE__*/function () {
  function Animation(name) {
    var frames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, Animation);

    this.name = name;

    var details = _i.getSpriteDetails(this.name);

    if (details != null && details.length > 0) {
      return;
    }

    this.loop = loop; // TODO: Non-looping animations are weird, clean them up

    _i.createAnimation(this.name, loop);

    this.frames = [];

    var _iterator = _createForOfIteratorHelper(frames),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var frame = _step.value;
        this.addFrame(frame);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(Animation, [{
    key: "addFrame",
    value: function addFrame(frame) {
      var _frame$ticks, _frame$flip;

      if (!frame || frame['sprite'] == undefined) return;
      var spriteName = frame.sprite.name;
      var ticks = (_frame$ticks = frame['ticks']) !== null && _frame$ticks !== void 0 ? _frame$ticks : 15;
      var flip = (_frame$flip = frame['flip']) !== null && _frame$flip !== void 0 ? _frame$flip : false;
      var position, offset; // if (frame['position']) position = toSpaceCoords(frame.position);
      // else position = [0, 0, 0];

      if (frame['offset']) offset = frame['offset'];else offset = [0, 0, 0];
      var spacePosition = [offset[0], offset[1], offset[2]];

      try {
        _i.addFrame(this.name, spriteName, ticks, flip, spacePosition);
      } catch (e) {
        console.error("Error calling _i.addFrame with " + this.name + ", " + this.spriteName + ", " + ticks + ", " + flip + ", " + JSON.stringify(spacePosition));
        console.error(e);
      }

      this.frames.push(frame);
    }
  }, {
    key: "toString",
    value: function toString() {
      var message = "Animation(" + this.name + ") {";

      var _iterator2 = _createForOfIteratorHelper(this.frames),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _frame$sprite, _frame$ticks2, _frame$flip2;

          var frame = _step2.value;
          message += "frame(".concat((_frame$sprite = frame.sprite) === null || _frame$sprite === void 0 ? void 0 : _frame$sprite.name, " ").concat((_frame$ticks2 = frame.ticks) !== null && _frame$ticks2 !== void 0 ? _frame$ticks2 : 15, " ").concat((_frame$flip2 = frame.flip) !== null && _frame$flip2 !== void 0 ? _frame$flip2 : false, " ").concat(frame.offset, "), ");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      message += "}";
      return message;
    }
  }]);

  return Animation;
}();


window.Animation = Animation;

/***/ }),

/***/ "./src/lib/AnimationGroup.js":
/*!***********************************!*\
  !*** ./src/lib/AnimationGroup.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimationGroup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimationGroup = /*#__PURE__*/function () {
  function AnimationGroup(name) {
    var animations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, AnimationGroup);

    this.name = name;

    var details = _i.getAnimationGroupDetails(name);

    if (details != null && details.length > 0) return;

    try {
      _i.createAnimationGroup(this.name);
    } catch (e) {
      console.error("Error calling _i.createAnimationGroup with ".concat(this.name));
      console.error(e);
    }

    if (animations != null) {
      var animationNames = animations.map(function (animation) {
        return animation.name;
      });

      try {
        _i.setGroupAnimations(this.name, animationNames);
      } catch (e) {
        console.error("Error calling _i.setGroupAnimations with ".concat(this.name, " ").concat(JSON.stringify(animations)));
        console.error(e);
      }
    }
  }

  _createClass(AnimationGroup, [{
    key: "setAnimations",
    value: function setAnimations(animations) {
      var animationNames = animations.map(function (animation) {
        return animation.name;
      });

      try {
        _i.setGroupAnimations(this.name, animationNames);
      } catch (e) {
        console.error("Error calling _i.setGroupAnimations with ".concat(this.name, " ").concat(JSON.stringify(animations)));
        console.error(e);
      }
    }
  }]);

  return AnimationGroup;
}();


window.AnimationGroup = AnimationGroup;

/***/ }),

/***/ "./src/lib/AnimationPath.js":
/*!**********************************!*\
  !*** ./src/lib/AnimationPath.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnimationPath)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/lib/util.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var AnimationPath = /*#__PURE__*/function () {
  function AnimationPath(name) {
    var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, AnimationPath);

    this.name = name;

    _i.createPath(this.name);

    var _iterator = _createForOfIteratorHelper(nodes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        this.addNode(node);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(AnimationPath, [{
    key: "addNode",
    value: function addNode(node) {
      var _node$ticks, _node$animationGroup, _node$jump;

      if (!node || !node['position']) return;
      var position = node['position'];
      var ticks = (_node$ticks = node['ticks']) !== null && _node$ticks !== void 0 ? _node$ticks : 15;
      var animationGroup = (_node$animationGroup = node['animationGroup']) !== null && _node$animationGroup !== void 0 ? _node$animationGroup : {
        name: null
      };
      var jump = (_node$jump = node['jump']) !== null && _node$jump !== void 0 ? _node$jump : 0.0;
      var _eval = node['eval'];

      if (eval != null) {
        _i.addScriptedPathNode(this.name, _eval, position, ticks, animationGroup.name, jump);
      } else {
        _i.addPathNode(this.name, position, ticks, animationGroup.name, jump);
      }
    }
  }], [{
    key: "fromSequence",
    value: function fromSequence(name, animationGroup, squares) {
      var ticks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15;
      var finalEval = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var nodes = [];
      var lastSquare = null;
      if (squares == null) squares = [];

      for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        var jump = 0;
        if (lastSquare != null && lastSquare[1] != square[1]) jump = 0.5;
        var position = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toSpaceCoords)(square);

        if (i == squares.length - 1 && finalEval != null) {
          nodes.push({
            animationGroup: animationGroup,
            position: position,
            jump: jump,
            ticks: ticks,
            eval: finalEval
          });
        } else {
          nodes.push({
            animationGroup: animationGroup,
            position: position,
            jump: jump,
            ticks: ticks
          });
        }

        lastSquare = square;
      }

      return new AnimationPath(name, nodes);
    }
  }]);

  return AnimationPath;
}();


window.AnimationPath = AnimationPath;

/***/ }),

/***/ "./src/lib/AudioSource.js":
/*!********************************!*\
  !*** ./src/lib/AudioSource.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudioSource)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AudioSource = /*#__PURE__*/function () {
  function AudioSource() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "__default__";
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, AudioSource);

    this.name = name;
    this.loop = loop;
  }

  _createClass(AudioSource, [{
    key: "playSound",
    value: function playSound(soundClip) {
      try {
        _i.playSound(soundClip.name, this.name, this.loop);
      } catch (e) {
        console.error("Error calling _i.playSound on ".concat(this.name, " with soundClip ").concat(soundClip.name, " loop = ").concat(loop));
        console.error(e);
      }
    }
  }]);

  return AudioSource;
}();


window.AudioSource = AudioSource;

/***/ }),

/***/ "./src/lib/Callback.js":
/*!*****************************!*\
  !*** ./src/lib/Callback.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Callback)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Callback = /*#__PURE__*/function () {
  function Callback(fn) {
    var _window$currentScene;

    var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Callback);

    this.key = '_callback' + Math.random();
    this.global = global;
    window.currentScene = (_window$currentScene = window.currentScene) !== null && _window$currentScene !== void 0 ? _window$currentScene : {};

    if (!this.global) {
      window.currentScene[this.key] = fn;
    } else {
      var _window$_callbacks;

      window._callbacks = (_window$_callbacks = window._callbacks) !== null && _window$_callbacks !== void 0 ? _window$_callbacks : {};
      window._callbacks[this.key] = fn;
    }
  }

  _createClass(Callback, [{
    key: "callString",
    get: function get() {
      var call;

      if (!this.global) {
        call = "window.currentScene[\"".concat(this.key, "\"]()");
      } else {
        call = "window._callbacks[\"".concat(this.key, "\"]();");
      }

      return "\n    ".concat(call, "\n    ");
    }
  }], [{
    key: "delayed",
    value: function delayed(seconds, fn) {
      var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var callback = new Callback(fn, global);

      try {
        _i.delayedEval(seconds, callback.callString);
      } catch (e) {
        console.error("error calling _i.delayedEval with ".concat(seconds, " ").concat(fn, " ").concat(global));
        console.error(e);
      }
    }
  }, {
    key: "call",
    value: function call(fn) {
      var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cb = new Callback(fn, global);
      return cb.callString;
    }
  }]);

  return Callback;
}();



/***/ }),

/***/ "./src/lib/Character.js":
/*!******************************!*\
  !*** ./src/lib/Character.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Character)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/lib/util.js");
/* harmony import */ var _AnimationPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimationPath */ "./src/lib/AnimationPath.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Character = /*#__PURE__*/function () {
  function Character(name) {
    var _this$sprite;

    var sprite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var revealsMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    _classCallCheck(this, Character);

    this.name = name;
    this.sprite = sprite;
    if (position) this.position = position;else this.position = [0, 0, 0];
    if (scale) this.scale = null;else this.scale = [1, 1];

    _i.createCharacter(this.name, (_this$sprite = this.sprite) === null || _this$sprite === void 0 ? void 0 : _this$sprite.name, this.scale, revealsMap);
  }

  _createClass(Character, [{
    key: "destroy",
    value: function destroy() {
      try {} catch (e) {}
    }
  }, {
    key: "place",
    value: function place(position) {
      this.position = position;

      try {
        _i.placeCharacter(this.name, (0,_util__WEBPACK_IMPORTED_MODULE_0__.toSpaceCoords)(this.position));
      } catch (e) {
        console.error("Error calling _i.placeCharacter for ".concat(this.name, " ").concat(JSON.stringify(this.position)));
        console.error(e);
      }
    }
  }, {
    key: "setSprite",
    value: function setSprite(sprite) {
      var _this$sprite2;

      this.sprite = sprite;

      _i.setCharSprite(this.name, (_this$sprite2 = this.sprite) === null || _this$sprite2 === void 0 ? void 0 : _this$sprite2.name);
    }
  }, {
    key: "setAnimationGroup",
    value: function setAnimationGroup(group) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      console.log('set animation group ' + group.name);

      if (!this.animationGroup || this.animationGroup.name !== group.name) {
        try {
          _i.setCharacterAnimationGroup(this.name, group.name, reset);

          this.animationGroup = group;
        } catch (e) {
          console.error("Error calling _i.setCharacterAnimationGroup on ".concat(this.name, " with ").concat(JSON.stringify(group)));
          console.error(e);
        }
      }
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      try {
        _i.attachPath(this.name, path.name);
      } catch (e) {
        console.error("Error calling _i.setPath for ".concat(this.name, " on ").concat(path.name, ": ").concat(JSON.stringify(path)));
        console.error(e);
      }
    }
  }, {
    key: "setFacing",
    value: function setFacing(facing) {
      try {
        _i.setCharacterFacing(this.name, facing);
      } catch (e) {
        console.error("Error calling _i.setFacing for ".concat(this.name, " with ").concat(facing));
        console.error(e);
      }
    }
  }, {
    key: "setPathFromSequence",
    value: function setPathFromSequence(coordList, animationGroup) {
      var ticks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

      var _eval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var _path = _AnimationPath__WEBPACK_IMPORTED_MODULE_1__.default.fromSequence(this.name + '_path', animationGroup, coordList, ticks, _eval);

      this.setPath(_path);
    }
  }, {
    key: "followWithCamera",
    value: function followWithCamera() {
      try {
        _i.focusCameraOnCharacter(this.name);
      } catch (e) {
        console.error("Error calling _i.focusCameraOnCharacter for ".concat(this.name));
        console.error(e);
      }
    }
  }, {
    key: "unfollowWithCamera",
    value: function unfollowWithCamera() {
      try {
        _i.unfocusCamera();
      } catch (e) {
        console.error("Error calling _i.unfocusCamera for ".concat(this.name));
        console.error(e);
      }
    }
  }, {
    key: "centerInCamera",
    value: function centerInCamera() {
      try {
        _i.moveCameraToCharacter(this.name);
      } catch (e) {
        console.error("Error calling _i.moveCameraToCharacter for ".concat(this.name));
        console.error(e);
      }
    }
  }, {
    key: "characterClick",
    value: function characterClick() {
      console.log("Script detected click on ".concat(this.name));
    }
  }]);

  return Character;
}();


window.Character = Character;

/***/ }),

/***/ "./src/lib/Decal.js":
/*!**************************!*\
  !*** ./src/lib/Decal.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Decal)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Decal = /*#__PURE__*/function () {
  function Decal(name, texture) {
    var outline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Decal);

    this.name = name;
    this.outline = outline;
    if (texture == null) texture = {
      name: null
    };

    try {
      _i.createDecal(name, texture.name, outline);
    } catch (e) {
      console.error("Error calling _i.createDecal for ".concat(this.name, " with texture ").concat(texture.name));
      console.error(e);
    }
  }

  _createClass(Decal, [{
    key: "place",
    value: function place() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      try {
        _i.placeDecal(this.name, position, rotation, scale);
      } catch (e) {
        console.error("Error calling _i.placeDecal for ".concat(this.name, " at position ").concat(position, ", rotation ").concat(rotation, ", scale ").concat(scale));
        console.error(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      try {
        _i.removeDecal(this.name);
      } catch (e) {
        console.error("Error calling _i.destroyDecal for ".concat(this.name));
        console.error(e);
      }
    }
  }]);

  return Decal;
}();


window.Decal = Decal;

/***/ }),

/***/ "./src/lib/DecalTexture.js":
/*!*********************************!*\
  !*** ./src/lib/DecalTexture.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DecalTexture)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DecalTexture = function DecalTexture(name, path) {
  var lit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _classCallCheck(this, DecalTexture);

  this.name = name;

  var details = _i.getTextureDetails(name);

  if (details != null && details.length > 0) return;
  this.lit = lit;

  try {
    _i.loadFlatTexture(name, window.modPath, path, lit);
  } catch (e) {
    console.error("Error calling _i.loadFlatTexture for ".concat(this.name, " for path ").concat(path, " with modPath ").concat(window.modPath));
    console.error(e);
  }
};


window.DecalTexture = DecalTexture;

/***/ }),

/***/ "./src/lib/Dialog.js":
/*!***************************!*\
  !*** ./src/lib/Dialog.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dialog)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dialog = /*#__PURE__*/function () {
  function Dialog() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var portraitTexture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var rightSide = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Dialog);

    if (name == null) name = '__default__';
    this.name = name;
    this.text = text;
    this.portraitTexture = portraitTexture;
    this.rightSide = false;

    if (portraitTexture == null) {
      portraitTexture = {
        name: null
      };
    }

    try {
      _i.createDialog(name, text, portraitTexture.name, rightSide);
    } catch (e) {
      console.error("Error calling _i.createDialog for ".concat(this.name, " with portrait ").concat(portraitTexture.name, " rightside=").concat(rightSide));
      console.error(e);
    }
  }

  _createClass(Dialog, [{
    key: "place",
    value: function place() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      try {
        _i.placeDialog(this.name, position, size);
      } catch (e) {
        console.error("Error calling _i.placeDialog for ".concat(this.name, " with position ").concat(position, ", size ").concat(size));
        console.error(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      try {
        _i.destroyDialog(this.name);
      } catch (e) {
        console.error("Error calling _i.destroyDialog for ".concat(this.name));
        console.error(e);
      }
    }
  }, {
    key: "setText",
    value: function setText(text) {
      var seconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      try {
        _i.setDialogText(this.name, text, seconds);
      } catch (e) {
        console.error("Error calling _i.setDialogText for ".concat(this.name, " with ").concat(this.text, " seconds=").concat(this.seconds));
        console.error(e);
      }
    }
  }, {
    key: "addButton",
    value: function addButton(text, position, size, script) {
      try {
        _i.addButtonToDialog(this.name, text, position, size, script);
      } catch (e) {
        console.error("Error calling _i.addButtonToDialog with ".concat(text, " ").concat(JSON.stringify(position), " ").concat(JSON.stringify(size), " ").concat(script));
        console.error(e);
      }
    }
  }]);

  return Dialog;
}();


window.Dialog = Dialog;

/***/ }),

/***/ "./src/lib/HighlightGroup.js":
/*!***********************************!*\
  !*** ./src/lib/HighlightGroup.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HighlightGroup)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HighlightGroup = /*#__PURE__*/function () {
  function HighlightGroup() {
    _classCallCheck(this, HighlightGroup);

    this.voxels = [];
  }

  _createClass(HighlightGroup, [{
    key: "highlightFaces",
    value: function highlightFaces(voxelPosition, faces) {
      this.voxels.push([voxelPosition, faces]);
    }
  }, {
    key: "highlightMultiple",
    value: function highlightMultiple(coordinateList) {
      var faces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      try {
        if (!coordinateList) coordinateList = [];
        if (!faces) faces = [0, 1, 2, 3, 4];

        var _iterator = _createForOfIteratorHelper(coordinateList),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var coords = _step.value;
            this.highlightFaces(coords, faces);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } catch (e) {
        console.error("Error calling HighlightGroup.highlightMultpile with ".concat(JSON.stringify(coordinateList), " and ").concat(JSON.stringify(faces)));
        console.error(e);
      }
    }
  }, {
    key: "showHighlights",
    value: function showHighlights() {
      var positions = [];
      var faces = [];

      var _iterator2 = _createForOfIteratorHelper(this.voxels),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var positionFaces = _step2.value;
          positions.push(positionFaces[0]);
          faces.push(positionFaces[1]);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      try {
        _i.highlightFaces(positions, faces);
      } catch (e) {
        console.error("Error calling _i.highlightFaces for positions ".concat(JSON.stringify(positions), " and faces ").concat(JSON.stringify(faces)));
        console.error(e);
      }
    }
  }, {
    key: "clearHighlights",
    value: function clearHighlights() {
      var positions = [];
      var faces = [];

      var _iterator3 = _createForOfIteratorHelper(this.voxels),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var positionFaces = _step3.value;
          positions.push(positionFaces[0]);
          faces.push(positionFaces[1]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      try {
        _i.clearHighlights(positions, faces);

        this.voxels = [];
      } catch (e) {
        console.error("Error calling _i.clearHighlights for positions ".concat(JSON.stringify(positions), " and faces ").concat(JSON.stringify(faces)));
        console.error(e);
      }
    }
  }]);

  return HighlightGroup;
}();


window.HighlightGroup = HighlightGroup;

/***/ }),

/***/ "./src/lib/Light.js":
/*!**************************!*\
  !*** ./src/lib/Light.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Light)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Light = /*#__PURE__*/function () {
  function Light(name) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var rotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var intensity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var range = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var angle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var color = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, Light);

    this.name = name;
    var _type = "point";
    if (type == "directional") _type = "directional";
    if (type == "spot") _type = "spot";
    if (position === null) position = [0, 0, 0];
    if (rotation === null) rotation = [90, 0, 0];
    if (intensity === null) intensity = 1.0;
    if (range === null) range = 10.0;
    if (angle === null) angle = 20.0;
    if (color === null) color = [255, 255, 255, 255];
    this.type = type;
    this.position = position;
    this.rotation = rotation;
    this.intensity = intensity;
    this.range = range;
    this.angle = angle;
    this.color = color;
    this.createObject();
  }

  _createClass(Light, [{
    key: "createObject",
    value: function createObject() {
      if (this.type === "point") {
        try {
          _i.createPointLight(this.name, this.position, this.intensity, this.range, this.color);
        } catch (e) {
          console.error("Error calling _i.createPointLight from {this.toString()}.");
          console.error(e);
        }
      } else if (this.type === "directional") {
        try {
          _i.createDirectionalLight(this.name, this.rotation, this.intensity, this.color);
        } catch (e) {
          console.error("Error calling _i.createDirectionalLight from {this.toString()}.");
          console.error(e);
        }
      } else if (this.type === "spot") {
        try {
          _i.createSpotLight(this.name, this.position, this.rotation, this.intensity, this.range, this.angle, this.color);
        } catch (e) {
          console.error("Error calling _i.createDirectionalLight from {this.toString()}.");
          console.error(e);
        }
      } else {
        console.error('Invalid type on ' + this.toString());
      }
    }
  }, {
    key: "off",
    value: function off() {
      _i.setLightActive(this.name, false);
    }
  }, {
    key: "on",
    value: function on() {
      _i.setLightActive(this.name, true);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Light({this.name}, {this.type}, {JSON.stringify(this.position)}, {JSON.stringify(this.rotation)}, {this.intensity}, {this.range}, {this.angle}, {JSON.stringify(this.color)})";
    }
  }]);

  return Light;
}();


window.Light = Light;

/***/ }),

/***/ "./src/lib/Map.js":
/*!************************!*\
  !*** ./src/lib/Map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var strToCoords = function strToCoords(str) {
  var split = str.split(',');
  var nums = split.map(function (intStr) {
    return parseInt(intStr);
  });
  return nums;
};

var Map = /*#__PURE__*/function () {
  function Map(dimensions) {
    var _this = this;

    _classCallCheck(this, Map);

    this.rendered = false;
    this.dimensions = dimensions;
    this.lights = [];

    this._createFreshGrid();

    window.faceClick = function (coords, face) {
      return _this.receiveClick(coords, face);
    };
  }

  _createClass(Map, [{
    key: "attachState",
    value: function attachState(gameState) {
      gameState.map = this;
    }
  }, {
    key: "receiveClick",
    value: function receiveClick(coords, face) {
      console.log(JSON.stringify(coords) + ': ' + face);
    }
  }, {
    key: "addLight",
    value: function addLight(light) {
      this.lights.push(light);
    }
  }, {
    key: "lightsOff",
    value: function lightsOff() {
      var _iterator = _createForOfIteratorHelper(this.lights),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var light = _step.value;
          light.off();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "removeAllLights",
    value: function removeAllLights() {// TODO
    }
  }, {
    key: "_createFreshGrid",
    value: function _createFreshGrid() {
      this.blocks = [];
      this.surfaces = [];

      for (var x = 0; x < this.dimensions[0]; x++) {
        var xSheet = [];
        var sxSheet = [];

        for (var y = 0; y < this.dimensions[1]; y++) {
          var yRow = [];
          var syRow = [];

          for (var z = 0; z < this.dimensions[2]; z++) {
            yRow.push(null);
            syRow.push(null);
          }

          xSheet.push(yRow);
          sxSheet.push(yRow);
        }

        this.blocks.push(xSheet);
        this.surfaces.push(sxSheet);
      }
    }
  }, {
    key: "clearance",
    value: function clearance(coords) {
      for (var y = coords[1] + 1; y < this.dimensions[1]; y++) {
        if (this.blocks[coords[0]][y][coords[2]] != null) {
          return y - coords[1] - 1;
        }

        ;
      }

      return Infinity;
    }
  }, {
    key: "subClearance",
    value: function subClearance(coords) {
      for (var y = coords[1] - 1; y >= 0; y--) {
        if (this.blocks[coords[0]][y][coords[2]] != null) {
          return coords[1] - y - 1;
        }

        ;
      }

      return Infinity;
    } // TODO: For now, maps can only be added to prior to rendering

  }, {
    key: "addVoxel",
    value: function addVoxel(blockCoordinates, voxelDef) {
      if (this.rendered) return;

      if (blockCoordinates[0] < 0 || blockCoordinates[0] >= this.dimensions[0] || blockCoordinates[1] < -1 || blockCoordinates[1] >= this.dimensions[1] || blockCoordinates[2] < 0 || blockCoordinates[2] >= this.dimensions[2]) {
        console.error("Coordinates ".concat(blockCoordinates[0], ", ").concat(blockCoordinates[1], ", ").concat(blockCoordinates[2], " are outside of map dimension"));
        return;
      } //_i.placeVoxel(blockCoordinates, voxelDef.name);


      this.blocks[blockCoordinates[0]][blockCoordinates[1]][blockCoordinates[2]] = voxelDef;
    }
  }, {
    key: "_genTextureToCoordsMap",
    value: function _genTextureToCoordsMap() {
      this.texMap = {};

      for (var x = 0; x < this.dimensions[0]; x++) {
        for (var y = 0; y < this.dimensions[1]; y++) {
          for (var z = 0; z < this.dimensions[2]; z++) {
            if (this.blocks[x][y][z] != null) {
              var voxelDef = this.blocks[x][y][z];

              if (voxelDef.name in this.texMap) {
                this.texMap[voxelDef.name].push([x, y, z]);
              } else {
                this.texMap[voxelDef.name] = [[x, y, z]];
              }
            }
          }
        }
      }
    }
  }, {
    key: "_getSurfaces",
    value: function _getSurfaces() {
      this.rawSurfaceData = _i.mapSurfaces();

      var _iterator2 = _createForOfIteratorHelper(this.rawSurfaceData),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var coords = _step2.value;
          this.surfaces[coords[0]][coords[1]][coords[2]] = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this._genTextureToCoordsMap();

      var sentinel = 0;

      for (var key in this.texMap) {
        if (sentinel > 10000) return;

        if (key == null || key == 'null') {
          //_i.placeVoxelsOfDefinition(null, this.texMap[key]);
          console.log("place ".concat(this.texMap[key].length, " null voxels"));
        } else {
          _i.placeVoxelsOfDefinition(key, this.texMap[key]);
        }
      }

      this.rendered = true;

      _i.genAllQuads();

      this._getSurfaces();
    } // unrender() {
    //     this.rendered = false;
    //     _i.clearQuads();
    // }

  }, {
    key: "clearGameObjects",
    value: function clearGameObjects() {
      this.rendered = false;

      _i.clearVoxels();
    }
  }, {
    key: "clearAndWipe",
    value: function clearAndWipe() {
      this.rendered = false;

      _i.clearVoxels();

      this._createFreshGrid();
    }
  }, {
    key: "H",
    value: function H(from, to) {
      return Math.abs(from[0] - to[0]) + Math.abs(from[2] - to[2]);
    }
  }, {
    key: "pathAdjacencies",
    value: function pathAdjacencies(square) {
      var clearance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var exploreNonSurfaces = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var stepUp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var stepDown = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      // if (square == null) return [];
      // if (square[0] < 0 || square[0] >= this.dimensions[0]) return [];
      // if (square[1] < 1 || square[1] >= this.dimensions[1]) return [];
      // if (square[2] < 2 || square[2] >= this.dimensions[2]) return [];
      if (!exploreNonSurfaces && this.surfaces[square[0]][square[1]][square[2]] !== true) return [];
      var _adjacencies = [];
      var possibilities = [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]];
      if (stepUp) possibilities.push([1, 1, 0]);
      if (stepUp) possibilities.push([0, 1, 1]);
      if (stepUp) possibilities.push([-1, 1, 0]);
      if (stepUp) possibilities.push([0, 1, -1]);
      if (stepDown) possibilities.push([1, -1, 0]);
      if (stepDown) possibilities.push([-1, -1, 0]);
      if (stepDown) possibilities.push([0, -1, 1]);
      if (stepDown) possibilities.push([0, -1, -1]);

      for (var _i2 = 0, _possibilities = possibilities; _i2 < _possibilities.length; _i2++) {
        var delta = _possibilities[_i2];
        var checkX = square[0] + delta[0];
        var checkY = square[1] + delta[1];
        var checkZ = square[2] + delta[2];
        if (checkX < 0 || checkX >= this.dimensions[0]) continue;
        if (checkY < 0 || checkY >= this.dimensions[1]) continue;
        if (checkZ < 0 || checkZ >= this.dimensions[2]) continue;

        if (this.clearance([checkX, checkY, checkZ]) < clearance) {
          //console.log('Insufficient clearance at ' + JSON.stringify([checkX, checkY, checkZ]));
          continue;
        }

        if (exploreNonSurfaces) {
          _adjacencies.push([checkX, checkY, checkZ]);
        } else {
          //console.log(`surfaces ${checkX} = ${JSON.stringify(this.surfaces[checkX])}`);
          if (this.surfaces[checkX][checkY][checkZ] == true) {
            _adjacencies.push([checkX, checkY, checkZ]);
          }
        }
      }

      return _adjacencies;
    }
  }, {
    key: "canPath",
    value: function canPath(from, to) {
      var fx = from[0];
      var fy = from[1];
      var fz = from[2];
      var tx = to[0];
      var ty = to[1];
      var tz = to[2];
      if (fx < 0 || fx >= this.dimensions[0] || tx < 0 || tx >= this.dimensions[0]) return false;
      if (fy < 0 || fy >= this.dimensions[1] || ty < 0 || ty >= this.dimensions[1]) return false;
      if (fz < 0 || fz >= this.dimensions[2] || tz < 0 || tz >= this.dimensions[2]) return false;
      if (this.surfaces[fx][fy][fz] != true) return false;
      if (this.surfaces[tx][ty][tz] != true) return false;
      return true;
    }
  }, {
    key: "reconstruct",
    value: function reconstruct(cameFrom, current) {
      var totalPath = [current];

      while (current in cameFrom) {
        current = cameFrom[current];
        totalPath.push(current);
      }

      var reversed = [];

      for (var i = totalPath.length - 1; i >= 0; i--) {
        reversed.push(totalPath[i]);
      }

      return reversed;
    }
  }, {
    key: "aStar",
    value: function aStar(from, to) {
      var clearance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      var exploreNonSurfaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var stepUp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var stepDown = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      if (exploreNonSurfaces !== true) exploreNonSurfaces = false;

      if (!exploreNonSurfaces) {
        if (!this.canPath(from, to)) return null;
      }

      var openHeap = new MinHeap();
      var cameFrom = {};
      var gScore = {};
      gScore[from] = 0;

      var gOf = function gOf(coord) {
        if (coord in gScore) return gScore[coord];
        return Infinity;
      };

      var fScore = {};
      fScore[from] = this.H(from, to);

      var fOf = function fOf(coord) {
        if (coord in fScore) return fScore[coord];
        return Infinity;
      };

      openHeap.insert([fScore[from], from]);

      while (openHeap.size > 0) {
        var current = openHeap.getMin();
        var coords = current[1]; // if at goal, return the path to this point

        if (coords[0] == to[0] && coords[1] == to[1] && coords[2] == to[2]) {
          return this.reconstruct(cameFrom, coords);
        }

        openHeap.remove();

        var _iterator3 = _createForOfIteratorHelper(this.pathAdjacencies(coords, clearance, exploreNonSurfaces, stepUp, stepDown)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var neighbor = _step3.value;
            // TODO: movement with cost other than 5feet
            var tentativeGScore = gOf(coords) + 5;

            if (tentativeGScore < gOf(neighbor)) {
              cameFrom[neighbor] = coords;
              gScore[neighbor] = tentativeGScore;
              fScore[neighbor] = tentativeGScore + this.H(neighbor, to);
              openHeap.insert([fScore[neighbor], neighbor]);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
    /**
     * All surface coordinates within d steps of an origin
     */

  }, {
    key: "closeSurfaces",
    value: function closeSurfaces(coords, d) {
      var selectedSquares = {};

      if (!this.surfaces[(coords[0], coords[1], coords[2])]) {
        return selectedSquares;
      }

      selectedSquares[coords] = 0; // creates string of the coords array to use as key

      for (var currentD = 0; currentD < d; currentD++) {
        var addCoords = [];

        for (var strCoords in selectedSquares) {
          var surfaceCoords = strToCoords(strCoords);

          if (selectedSquares[strCoords] == currentD) {
            var adjCoords;

            var _iterator4 = _createForOfIteratorHelper(this.pathAdjacencies(surfaceCoords, 2)),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                adjCoords = _step4.value;

                // TODO: make clearance variable
                if (!(adjCoords in selectedSquares)) {
                  addCoords.push(adjCoords);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }

        for (var _i3 = 0, _addCoords = addCoords; _i3 < _addCoords.length; _i3++) {
          var newCoords = _addCoords[_i3];
          selectedSquares[newCoords] = currentD + 1;
        }
      }

      var result = [];

      for (var strCoords in selectedSquares) {
        var intCoords = strToCoords(strCoords);
        result.push(intCoords);
      }

      return result;
    }
  }]);

  return Map;
}(); // copied and pasted from a blog where comments suggest there are bugs.
// but it seems to work
// TODO: investigate this




var MinHeap = /*#__PURE__*/function () {
  function MinHeap() {
    _classCallCheck(this, MinHeap);

    /* Initialing the array heap and adding a dummy element at index 0 */
    this.heap = [null];
  }

  _createClass(MinHeap, [{
    key: "size",
    get: function get() {
      return this.heap.length - 1;
    }
  }, {
    key: "getMin",
    value: function getMin() {
      /* Accessing the min element at index 1 in the heap array */
      return this.heap[1];
    } // node = [score, value]

  }, {
    key: "insert",
    value: function insert(node) {
      /* Inserting the new node at the end of the heap array */
      this.heap.push(node);
      /* Finding the correct position for the new node */

      if (this.heap.length > 1) {
        var current = this.heap.length - 1;
        /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/

        while (current > 1 && this.heap[Math.floor(current / 2)][0] > this.heap[current][0]) {
          /* Swapping the two nodes by using the ES6 destructuring syntax*/
          var _ref = [this.heap[current], this.heap[Math.floor(current / 2)]];
          this.heap[Math.floor(current / 2)] = _ref[0];
          this.heap[current] = _ref[1];
          current = Math.floor(current / 2);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      /* Smallest element is at the index 1 in the heap array */
      var smallest = this.heap[1];
      /* When there are more than two elements in the array, we put the right most element at the first position
          and start comparing nodes with the child nodes
      */

      if (this.heap.length > 2) {
        this.heap[1] = this.heap[this.heap.length - 1];
        this.heap.splice(this.heap.length - 1);

        if (this.heap.length === 3) {
          if (this.heap[1][0] > this.heap[2][0]) {
            var _ref2 = [this.heap[2], this.heap[1]];
            this.heap[1] = _ref2[0];
            this.heap[2] = _ref2[1];
          }

          return smallest;
        }

        var current = 1;
        var leftChildIndex = current * 2;
        var rightChildIndex = current * 2 + 1;

        while (this.heap[leftChildIndex] && this.heap[rightChildIndex] && (this.heap[current][0] > this.heap[leftChildIndex][0] || this.heap[current][0] > this.heap[rightChildIndex][0])) {
          if (this.heap[leftChildIndex][0] < this.heap[rightChildIndex][0]) {
            var _ref3 = [this.heap[leftChildIndex], this.heap[current]];
            this.heap[current] = _ref3[0];
            this.heap[leftChildIndex] = _ref3[1];
            current = leftChildIndex;
          } else {
            var _ref4 = [this.heap[rightChildIndex], this.heap[current]];
            this.heap[current] = _ref4[0];
            this.heap[rightChildIndex] = _ref4[1];
            current = rightChildIndex;
          }

          leftChildIndex = current * 2;
          rightChildIndex = current * 2 + 1;
        }
      } else if (this.heap.length === 2) {
        this.heap.splice(1, 1);
      } else {
        return null;
      }

      return smallest;
    }
  }]);

  return MinHeap;
}();

window.Map = Map;

/***/ }),

/***/ "./src/lib/PriorityQueue.js":
/*!**********************************!*\
  !*** ./src/lib/PriorityQueue.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriorityQueue)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PriorityQueue = /*#__PURE__*/function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    this.values = [];
  } //helper method that swaps the values and two indexes of an array


  _createClass(PriorityQueue, [{
    key: "swap",
    value: function swap(index1, index2) {
      var temp = this.values[index1];
      this.values[index1] = this.values[index2];
      this.values[index2] = temp;
      return this.values;
    } //helper methods that bubbles up values from end

  }, {
    key: "bubbleUp",
    value: function bubbleUp() {
      //get index of inserted element
      var index = this.values.length - 1; //loop while index is not 0 or element no loger needs to bubble

      while (index > 0) {
        //get parent index via formula
        var parentIndex = Math.floor((index - 1) / 2); //if values is less than parent, swap the two

        if (this.values[parentIndex].priority > this.values[index].priority) {
          //swap with helper method
          this.swap(index, parentIndex); //change current index to parent index

          index = parentIndex; // TODO: randomize ties
        } else {
          break;
        }
      }

      return 0;
    } // method that pushes new value onto the end and calls the bubble helper

  }, {
    key: "enqueue",
    value: function enqueue(priority, value) {
      this.values.push({
        priority: priority,
        value: value
      }); //calculate parent, if parent is greater swap
      //while loop or recurse

      this.bubbleUp();
      return this.values;
    }
  }, {
    key: "bubbleDown",
    value: function bubbleDown() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var left = 2 * index + 1,
          right = 2 * index + 2;
      var least = index,
          heapLength = this.values.length - 1;
      if (left <= heapLength && this.values[left].priority < this.values[least].priority) least = left;
      if (right <= heapLength && this.values[right].priority < this.values[least].priority) least = right;

      if (least !== index) {
        var _ref = [this.values[index], this.values[least]];
        this.values[least] = _ref[0];
        this.values[index] = _ref[1];
        this.bubbleDown(least);
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this.values.length;
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      //swap first and last element
      this.swap(0, this.values.length - 1); //pop max value off of values

      var poppedNode = this.values.pop(); //re-adjust heap if length is greater than 1

      if (this.values.length > 1) {
        this.bubbleDown();
      }

      return poppedNode.value;
    }
  }]);

  return PriorityQueue;
}();



/***/ }),

/***/ "./src/lib/Scene.js":
/*!**************************!*\
  !*** ./src/lib/Scene.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scene)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene = /*#__PURE__*/function () {
  function Scene(name, gameState) {
    var activate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var destroyOld = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Scene);

    try {
      _i.newScene(name, activate, destroyOld);
    } catch (e) {
      console.error("Error calling _i.newScene for ".concat(this.name, " with activate=").concat(activate, ", destroyOld=").concat(destroyOld));
      console.error(e);
      return;
    }

    this.gameState = gameState;
  }

  _createClass(Scene, [{
    key: "activate",
    value: function activate() {
      try {
        _i.changeScene(this.name);
      } catch (e) {
        console.error("Error calling _i.changeScene for ".concat(this.name));
        console.error(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      try {
        _i.destroyScene(this.name);

        if (window.currentScene == this) window.currentScene = null;
      } catch (e) {
        console.error("Error calling _i.changeScene for ".concat(this.name));
        console.error(e);
      }
    }
  }], [{
    key: "destroyAll",
    value: function destroyAll() {
      try {
        _i.destroyAllScenes();
      } catch (e) {
        console.error("Error calling _i.destroyAllScenes");
        console.error(e);
      }
    }
  }]);

  return Scene;
}();



/***/ }),

/***/ "./src/lib/SoundClip.js":
/*!******************************!*\
  !*** ./src/lib/SoundClip.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SoundClip)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundClip = function SoundClip(name, path) {
  _classCallCheck(this, SoundClip);

  this.name = name;

  var details = _i.getSoundDetails(name);

  if (details != null && details.length > 0) return;

  try {
    _i.loadSound(name, window.modPath, path);
  } catch (e) {
    console.error("Error calling _i.loadSound with ".concat(name, " and ").concat(path, ", window.modPath = ").concat(window.modPath));
    console.error(e);
  }
};


window.SoundCLip = SoundClip;

/***/ }),

/***/ "./src/lib/Sprite.js":
/*!***************************!*\
  !*** ./src/lib/Sprite.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sprite)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(name) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var pivot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var rect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Sprite);

  this.name = name;

  var details = _i.getSpriteDetails(this.name);

  if (details != null && details.length > 0) {
    return;
  }

  _i.loadSprite(this.name, window.modPath, path, pivot, rect);
};


window.Sprite = Sprite;

/***/ }),

/***/ "./src/lib/UIImage.js":
/*!****************************!*\
  !*** ./src/lib/UIImage.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UIImage)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UIImage = /*#__PURE__*/function () {
  function UIImage(name, sprite) {
    _classCallCheck(this, UIImage);

    this.name = name;

    try {
      _i.createUIImage(name, sprite.name);
    } catch (e) {
      console.error("Error calling _i.createUIImage with ".concat(name, " and ").concat(sprite.name));
      console.error(e);
    }
  }

  _createClass(UIImage, [{
    key: "place",
    value: function place(rect) {
      try {
        _i.placeUIImage(this.name, rect);
      } catch (e) {
        console.error("Error calling _i.placeUIImage with ".concat(this.name, " and ").concat(sprite.name, " and ").concat(JSON.stringify(rect)));
        console.error(e);
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      try {
        _i.destroyUIImage(this.name);
      } catch (e) {
        console.error("Error calling _i.deleteUIImage with ".concat(this.name));
        console.error(e);
      }
    }
  }]);

  return UIImage;
}();



/***/ }),

/***/ "./src/lib/UIManager.js":
/*!******************************!*\
  !*** ./src/lib/UIManager.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setOnScreenControls": () => (/* binding */ setOnScreenControls),
/* harmony export */   "default": () => (/* binding */ UIManager)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var setOnScreenControls = function setOnScreenControls() {
  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  try {
    _i.onScreenControls(active);
  } catch (e) {
    console.error("Error calling _i.onScreenControls with ".concat(active));
    console.error(e);
  }
};

var UIManager = /*#__PURE__*/function () {
  function UIManager() {
    _classCallCheck(this, UIManager);

    window.characterClick = this.receiveCharacterClick;
  }

  _createClass(UIManager, [{
    key: "clear",
    value: function clear() {
      this.setOnScreenControls(false);

      window.characterClick = function () {};

      window.backButton = function () {};
    }
  }, {
    key: "setOnScreenControls",
    value: function setOnScreenControls() {
      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      try {
        _i.onScreenControls(active);
      } catch (e) {
        console.error("Error calling _i.onScreenControls with ".concat(active));
        console.error(e);
      }
    }
  }, {
    key: "registerCharacterForClicks",
    value: function registerCharacterForClicks(character) {
      window._clickableCharacters[character.name] = character;
    }
  }, {
    key: "unregisterCharacterForClicks",
    value: function unregisterCharacterForClicks(character) {
      window._clickableCharacters[character.name] = undefined;
    }
  }, {
    key: "receiveCharacterClick",
    value: function receiveCharacterClick(name) {
      if (name in window._clickableCharacters[name]) {
        window._clickableCharacters[name].receiveClick();
      }
    }
  }, {
    key: "clearCharacterClicks",
    value: function clearCharacterClicks() {
      window._clickableCharacters = {};
    }
  }, {
    key: "setBackButton",
    value: function setBackButton(fn) {
      window.backButton = fn;
    }
  }], [{
    key: "width",
    get: function get() {
      return _i.screenWidth();
    }
  }, {
    key: "height",
    get: function get() {
      return _i.screenHeight();
    }
  }, {
    key: "widthOrMax",
    value: function widthOrMax(width) {
      return Math.min(width, this.width);
    }
  }, {
    key: "heightOrMax",
    value: function heightOrMax(height) {
      return Math.min(height, this.height);
    }
  }]);

  return UIManager;
}();



/***/ }),

/***/ "./src/lib/VoxelDefinition.js":
/*!************************************!*\
  !*** ./src/lib/VoxelDefinition.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VoxelDefinition)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VoxelDefinition = /*#__PURE__*/function () {
  // TODO: BORDER AND EBB
  function VoxelDefinition(name, textures) {
    _classCallCheck(this, VoxelDefinition);

    this.textures = textures;

    var _textures = textures.map(function (tex) {
      return tex.name;
    });

    this.name = name;

    _i.defineVoxel(this.name, _textures, null, 1.0);
  }

  _createClass(VoxelDefinition, [{
    key: "toString",
    value: function toString() {
      return "VoxelDefinition(".concat(this.name, ", ").concat(this.textures.map(function (tex) {
        return tex.name;
      }), ")");
    }
  }]);

  return VoxelDefinition;
}();


window.VoxelDefinition = VoxelDefinition;

/***/ }),

/***/ "./src/lib/VoxelMap.js":
/*!*****************************!*\
  !*** ./src/lib/VoxelMap.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VoxelMap)
/* harmony export */ });
/* harmony import */ var _PriorityQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PriorityQueue */ "./src/lib/PriorityQueue.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var strToCoords = function strToCoords(str) {
  var split = str.split(',');
  var nums = split.map(function (intStr) {
    return parseInt(intStr);
  });
  return nums;
};

var VoxelMap = /*#__PURE__*/function () {
  function VoxelMap() {
    var _this$settings$yMax;

    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VoxelMap);

    this.settings = settings;
    this.yMax = (_this$settings$yMax = this.settings.yMax) !== null && _this$settings$yMax !== void 0 ? _this$settings$yMax : 20;
    this.voxels = {};
    this.solids = {};
    this.clearances = {};
  }

  _createClass(VoxelMap, [{
    key: "setClickActive",
    value: function setClickActive() {
      var _this = this;

      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (active) {
        window.faceClick = function (coords, face) {
          return _this.receiveClick(coords, face);
        };
      } else {
        window.faceClick = function () {};
      }
    }
  }, {
    key: "receiveClick",
    value: function receiveClick(coords, face) {}
  }, {
    key: "genMapFromDelegateClass",
    value: function genMapFromDelegateClass(DelegateClass) {
      var delegate = new DelegateClass(this);
      delegate.generate();
    }
  }, {
    key: "addVoxel",
    value: function addVoxel(coords, voxelDef) {
      var solid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (voxelDef !== null) {
        if (voxelDef === undefined) delete this.voxels[coords];else if (coords[1] >= 0 && coords[1] < this.yMax) this.voxels[coords] = voxelDef;
      }

      if (solid !== null) {
        if (solid === undefined) delete this.solids[coords];else if (coords[1] >= -1 && coords[1] < this.yMax) this.solids[coords] = solid;
      }
    } // TODO: fill whole column  when seeking?

  }, {
    key: "getClearances",
    value: function getClearances(coords) {
      if (coords in this.clearances) {
        console.log('found');
        var clrs = this.clearances[coords];
        return {
          top: clrs.top,
          bottom: clrs.bottom
        };
      } else {
        console.log('not found');
        var bottom = 99999,
            top = 99999;

        var _coords = _slicedToArray(coords, 3),
            x = _coords[0],
            y = _coords[1],
            z = _coords[2];

        var seekBottom = 0;

        if (y > -1) {
          console.log('seeking bottom');

          for (; y - seekBottom >= -1; seekBottom++) {
            if (this.solids[[x, y - seekBottom, z]]) {
              console.log(seekBottom);
              bottom = seekBottom;
              break;
            }
          }
        }

        if (y < this.yMax) {
          console.log('seeking top');
          var seekTop = 1;

          for (; y + seekTop < this.yMax; seekTop++) {
            if (this.solids[[x, y + seekTop, z]]) {
              console.log(seekTop);
              top = seekTop - 1;
              break;
            }
          }
        }

        this.clearances[coords] = {
          top: top,
          bottom: bottom
        };
        return {
          top: top,
          bottom: bottom
        };
      }
    }
  }, {
    key: "forgetClearanceColumn",
    value: function forgetClearanceColumn(coords) {
      var _coords2 = _slicedToArray(coords, 3),
          x = _coords2[0],
          _ = _coords2[1],
          z = _coords2[2];

      for (var y = 0; y < this.yMax; y++) {
        delete this.clearances[[x, y, z]];
      }
    }
  }, {
    key: "voxDefToCoordsListDict",
    value: function voxDefToCoordsListDict() {
      var dict = {};

      for (var coordstr in this.voxels) {
        var coords = strToCoords(coordstr);
        var voxelDef = this.voxels[coordstr];

        if (voxelDef.name in dict) {
          dict[voxelDef.name].push(coords);
        } else {
          dict[voxelDef.name] = [coords];
        }
      }

      return dict;
    }
  }, {
    key: "render",
    value: function render() {
      var dict = this.voxDefToCoordsListDict();

      for (var key in dict) {
        try {
          _i.placeVoxelsOfDefinition(key, dict[key]);
        } catch (e) {
          console.error("Error calling _i.placeVoxelsOfDefinition for ".concat(this.key, " and ").concat(JSON.stringify(dict)));
          console.error(e);
        }
      }

      try {
        _i.genAllQuads();
      } catch (e) {
        console.error("Error calling _i.genAllQuads");
        console.error(e);
      }
    }
  }, {
    key: "adjacencies",
    value: function adjacencies(coords) {
      var _options$stepDown, _options$stepDown2, _options$headRoom, _options$footRoomMax, _options$footRoomMin;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var stepDown = (_options$stepDown = options.stepDown) !== null && _options$stepDown !== void 0 ? _options$stepDown : 1;
      var stepUp = (_options$stepDown2 = options.stepDown) !== null && _options$stepDown2 !== void 0 ? _options$stepDown2 : 1;
      var headRoomMin = (_options$headRoom = options.headRoom) !== null && _options$headRoom !== void 0 ? _options$headRoom : 2;
      var footRoomMax = (_options$footRoomMax = options.footRoomMax) !== null && _options$footRoomMax !== void 0 ? _options$footRoomMax : 0;
      var footRoomMin = (_options$footRoomMin = options.footRoomMin) !== null && _options$footRoomMin !== void 0 ? _options$footRoomMin : 0;

      var _coords3 = _slicedToArray(coords, 3),
          x = _coords3[0],
          y = _coords3[1],
          z = _coords3[2];

      var tryCoords = [];

      for (var dy = 0 - stepDown; dy <= 0 + stepUp; dy++) {
        if (y + dy >= -1 && y + dy < this.yMax) {
          tryCoords.push([x, y + dy, z + 1]);
          tryCoords.push([x + 1, y + dy, z]);
          tryCoords.push([x, y + dy, z - 1]);
          tryCoords.push([x - 1, y + dy, z]);
        }
      }

      var adjacentCoords = [];

      for (var _i2 = 0, _tryCoords = tryCoords; _i2 < _tryCoords.length; _i2++) {
        var tCoords = _tryCoords[_i2];
        if (footRoomMax == 0 && !this.solids[tCoords]) continue;
        if (headRoomMin > 0 && this.solids[[tCoords[0], tCoords[1] + 1, tCoords[2]]]) continue;
        if (footRoomMin > 0 && this.solids[tCoords]) continue;
        var clrs = this.getClearances(tCoords);

        if (clrs.top >= headRoomMin && clrs.bottom <= footRoomMax) {
          adjacentCoords.push(tCoords);
        }
      }

      return adjacentCoords;
    }
  }, {
    key: "surfacesNear",
    value: function surfacesNear(coords, d) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var distanceSquares = {};
      var resultSurfaces = options.excludeStart ? [] : [coords];
      distanceSquares[coords] = 0;
      var newSquares = [coords]; // while(newSquares.length > 0) {
      //     var square = newSquares.pop();
      //     var sd = distanceSquares[square];
      //     if (sd >= d) continue;
      //     for (var adjSquare of this.adjacencies(square, options)) {
      //         if (!(adjSquare in distanceSquares)) {
      //             distanceSquares[adjSquare] = sd + 1;
      //             if (sd + 1 < d) newSquares.push(adjSquare);
      //             resultSurfaces.push(adjSquare);
      //         }
      //     }
      // }

      for (var cd = 0; cd < d; cd++) {
        var newNewSquares = [];

        var _iterator = _createForOfIteratorHelper(newSquares),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var square = _step.value;
            var adjacencies = this.adjacencies(square, options);

            var _iterator2 = _createForOfIteratorHelper(adjacencies),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var adjSquare = _step2.value;

                if (!(adjSquare in distanceSquares)) {
                  newNewSquares.push(adjSquare);
                  distanceSquares[adjSquare] = cd + 1;
                  resultSurfaces.push(adjSquare);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        newSquares = newNewSquares;
      }

      return resultSurfaces;
    }
  }, {
    key: "flatDistance",
    value: function flatDistance(from, to) {
      return Math.abs(from[0] - to[0]) + Math.abs(from[2] - to[2]);
    } // TODO: diagonals and difficult terrain

  }, {
    key: "aStarPath",
    value: function aStarPath(from, to) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var queue = new _PriorityQueue__WEBPACK_IMPORTED_MODULE_0__.default();
      var cameFrom = {};
      var gScore = {};
      gScore[from] = 0;

      var gOf = function gOf(coord) {
        if (coord in gScore) return gScore[coord];
        return Infinity;
      };

      var fScore = {};
      fScore[from] = this.flatDistance(from, to);

      var fOf = function fOf(coord) {
        if (coord in fScore) return fScore[coord];
        return Infinity;
      };

      var reconstruct = function reconstruct(cameFrom, current) {
        var totalPath = [current];

        while (current in cameFrom) {
          current = cameFrom[current];
          totalPath.push(current);
        }

        var reversed = [];

        for (var i = totalPath.length - 1; i >= 0; i--) {
          reversed.push(totalPath[i]);
        }

        return reversed;
      };

      queue.enqueue(fScore[from], from);

      while (queue.length > 0) {
        var current = queue.dequeue();

        if (current[0] == to[0] && current[1] == to[1] && current[2] == to[2]) {
          return reconstruct(cameFrom, current);
        }

        var _iterator3 = _createForOfIteratorHelper(this.adjacencies(current, options)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var neighbor = _step3.value;
            var tentativeGScore = gOf(current) + 5;

            if (tentativeGScore < gOf(neighbor)) {
              cameFrom[neighbor] = current;
              gScore[neighbor] = tentativeGScore;
              fScore[neighbor] = tentativeGScore + this.flatDistance(neighbor, to);
              queue.enqueue(fScore[neighbor], neighbor);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  }]);

  return VoxelMap;
}();



/***/ }),

/***/ "./src/lib/VoxelTexture.js":
/*!*********************************!*\
  !*** ./src/lib/VoxelTexture.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VoxelTexture)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VoxelTexture = function VoxelTexture(name, path) {
  _classCallCheck(this, VoxelTexture);

  this.name = name;

  var details = _i.getTextureDetails(name);

  if (details != null && details.length > 0) return;

  _i.loadBlockTexture(this.name, window.modPath, path);
};


window.VoxelTexture = VoxelTexture;

/***/ }),

/***/ "./src/lib/util.js":
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toMapCoords": () => (/* binding */ toMapCoords),
/* harmony export */   "toSpaceCoords": () => (/* binding */ toSpaceCoords)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function toMapCoords(coords) {
  return [Math.round(coords[0]), Math.round(coords[1] * 2), Math.round(coords[2])];
}
function toSpaceCoords(coords) {
  return [coords[0], coords[1] / 2, coords[2]];
}

function coordsInList(coords, list) {
  console.log('coords In List');

  var _iterator = _createForOfIteratorHelper(list),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var checkCoords = _step.value;
      console.log('' + checkCoords + ' vs ' + coords);
      if (checkCoords == null) continue;
      if (coords.length != checkCoords.length) continue;
      var match = true;

      for (var i = 0; i < coords.length; i++) {
        if (coords[i] != checkCoords[i]) {
          match = false;
        }
      }

      if (match) return true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}

window.coordsInList = coordsInList;
window.toMapCoords = toMapCoords;
window.toSpaceCoords = toSpaceCoords;

/***/ }),

/***/ "./src/modules/DistanceDemo.js":
/*!*************************************!*\
  !*** ./src/modules/DistanceDemo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DistanceDemo)
/* harmony export */ });
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/HighlightGroup */ "./src/lib/HighlightGroup.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _lib_VoxelMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/VoxelMap */ "./src/lib/VoxelMap.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Light */ "./src/lib/Light.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MainMenu */ "./src/modules/MainMenu.js");
/* harmony import */ var _gameRules_GameState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gameRules/GameState */ "./src/gameRules/GameState.js");
/* harmony import */ var _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../gameRules/GameLoop */ "./src/gameRules/GameLoop.js");
/* harmony import */ var _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../gameRules/SceneState */ "./src/gameRules/SceneState.js");
/* harmony import */ var _characterPrefabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./characterPrefabs */ "./src/modules/characterPrefabs.js");
var _window$game;












window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {}; // TODO: bug when clicking on x=0 tiles

function DistanceDemo() {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_2__.setOnScreenControls)(true);
  var map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.grassPlain)();
  (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.standardLights)(map);
  map.render();
  var gState = new _gameRules_GameState__WEBPACK_IMPORTED_MODULE_7__.default();
  var gLoop = new _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_8__.default(gState);
  var scene = new _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_9__.default();
  scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_10__.characterPrefabs.cleric, 'Sal', [1, 0, 1]);
  scene.map = map;
  gState.loadScene(scene);
  gLoop.go();
  var _x = 0;

  map.receiveClick = function (coords, face) {
    var highlightCoords = map.surfacesNear(coords, _x);
    hg.clearHighlights();
    hg.highlightMultiple(highlightCoords, null);
    hg.showHighlights();
    _x++;
  };

  map.setClickActive();

  window.backButton = function () {
    (0,_MainMenu__WEBPACK_IMPORTED_MODULE_6__.default)();
  }; // window.game._map = grassPlain();
  // standardLights(window.game._map);
  // window.game._map.render();
  // window.game.sx = null;
  // window.game.sy = null;
  // window.game.hg = new HighlightGroup();
  // window.game._map.receiveClick = (coords, face) => {
  //     var highlightCoords = window.game._map.closeSurfaces(coords, 4)
  //     window.game.hg.clearHighlights();
  //     window.game.hg.highlightMultiple(highlightCoords, null);
  //     window.game.hg.showHighlights();
  // }
  // var map = new VoxelMap({yMax: 3});
  // for (var x = 0; x < 20; x++) {
  //     for (var z = 0; z < 20; z++) {
  //         var y = Math.floor(Math.random() * 1);
  //         for (var i = 0; i <= y; i++) {
  //             map.addVoxel([x,i,z], VoxelDefinitions.grassDirt);
  //         }
  //     }
  // }
  // var l = new Light('1', 'directional', [-5,5,-5], [22.5, 60, 0], 1.2);
  // l.on();
  // map.render();
  // var hg = new HighlightGroup();
  // var _x = 0;
  // map.receiveClick = (coords, face) => {
  //     var highlightCoords = map.surfacesNear(coords, _x);
  //     hg.clearHighlights();
  //     hg.highlightMultiple(highlightCoords, null);
  //     hg.showHighlights();
  //     _x++;
  // }
  // map.setClickActive();
  // window.backButton = () => {
  //     MainMenu();
  // };

}

/***/ }),

/***/ "./src/modules/GameRulesDemo.js":
/*!**************************************!*\
  !*** ./src/modules/GameRulesDemo.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameRules)
/* harmony export */ });
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gameRules/GameLoop */ "./src/gameRules/GameLoop.js");
/* harmony import */ var _gameRules_GameState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gameRules/GameState */ "./src/gameRules/GameState.js");
/* harmony import */ var _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gameRules/SceneState */ "./src/gameRules/SceneState.js");
/* harmony import */ var _characterPrefabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./characterPrefabs */ "./src/modules/characterPrefabs.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MainMenu */ "./src/modules/MainMenu.js");
/* harmony import */ var _lib_AudioSource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/AudioSource */ "./src/lib/AudioSource.js");
var _window$game;










window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {};
function GameRules() {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_1__.setOnScreenControls)(true);
  var map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.walkObstacle)(22, 22);
  window._music = new _lib_AudioSource__WEBPACK_IMPORTED_MODULE_8__.default('window._music');

  window._music.playSound(_assetLoaders__WEBPACK_IMPORTED_MODULE_6__.Sounds.necrophage);

  (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.standardLights)(map);
  map.render();
  var gState = new _gameRules_GameState__WEBPACK_IMPORTED_MODULE_3__.default();
  var gLoop = new _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_2__.default(gState);
  var scene = new _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_4__.default();
  scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_5__.characterPrefabs.cleric, 'Sal', [1, 0, 1], null, true);
  scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_5__.characterPrefabs.rogue, 'Sam', [21, 0, 1], null, false);
  scene.map = map;
  gState.loadScene(scene);
  gLoop.go();

  window.backButton = function () {
    (0,_MainMenu__WEBPACK_IMPORTED_MODULE_7__.default)();
  };
}

/***/ }),

/***/ "./src/modules/MainMenu.js":
/*!*********************************!*\
  !*** ./src/modules/MainMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Dialog */ "./src/lib/Dialog.js");
/* harmony import */ var _lib_Scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Scene */ "./src/lib/Scene.js");
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _WalkDemo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WalkDemo */ "./src/modules/WalkDemo.js");
/* harmony import */ var _DistanceDemo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DistanceDemo */ "./src/modules/DistanceDemo.js");
/* harmony import */ var _MoveActionDemo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MoveActionDemo */ "./src/modules/MoveActionDemo.js");
/* harmony import */ var _MapGenDemo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MapGenDemo */ "./src/modules/MapGenDemo.js");
/* harmony import */ var _lib_UIImage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/UIImage */ "./src/lib/UIImage.js");
/* harmony import */ var _GameRulesDemo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GameRulesDemo */ "./src/modules/GameRulesDemo.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _SpriteAnimation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SpriteAnimation */ "./src/modules/SpriteAnimation.js");
/* harmony import */ var _lib_Callback__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/Callback */ "./src/lib/Callback.js");
/* harmony import */ var _NewMapDemo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./NewMapDemo */ "./src/modules/NewMapDemo.js");
var _window$game;















window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainMenu = function MainMenu() {
  window.backButton = function () {};

  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_10__.setOnScreenControls)(false);
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('mainMenu', null, true, true);
  window.game._logo = new _lib_UIImage__WEBPACK_IMPORTED_MODULE_8__.default('mainLogo', _assetLoaders__WEBPACK_IMPORTED_MODULE_3__.Sprites.logo);
  console.log(_lib_UIManager__WEBPACK_IMPORTED_MODULE_10__.default.width + ' x ' + _lib_UIManager__WEBPACK_IMPORTED_MODULE_10__.default.height);
  var logoWidth = 800;
  var logoHeight = logoWidth * 4 / 10;
  var logoBottom = _lib_UIManager__WEBPACK_IMPORTED_MODULE_10__.default.height - logoHeight;
  var logoLeft = 0;
  var centerLogoLeft = (1920 - logoWidth) / 2;

  window.game._logo.place([centerLogoLeft, logoBottom, logoWidth, logoHeight]);

  window.game._dialog = new _lib_Dialog__WEBPACK_IMPORTED_MODULE_0__.default('mainMenu', 'D20 Tactics');

  window.game._dialog.place([(1920 - 600) / 2, 32], [500, 600]);

  window.game._dialog.setText("");

  window.game._dialog.addButton("Path-Walk", [32, 500], [400, 64], "window.game._walkDemo()"); //window.game._dialog.addButton("Sprite and Animation", [16, 200], [200,28], "window.game._spriteAnim()");
  //window.game._dialog.addButton("Map Gen", [16, 300], [300,28], "window.game._mapGenDemo()");


  window.game._dialog.addButton("Fight Overworld", [32, 350], [400, 64], "window.game._gameRules()");

  window.game._dialog.addButton("Fight Dungeon", [32, 200], [400, 64], _lib_Callback__WEBPACK_IMPORTED_MODULE_12__.default.call(function () {
    window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('newMap', null, true, true);
    (0,_NewMapDemo__WEBPACK_IMPORTED_MODULE_13__.default)();
  }));
});

window.game._walkDemo = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('walkDemo', null, true, true); // TODO: Progress bars for mapgen etc. also, test JS Engine speeds

  (0,_WalkDemo__WEBPACK_IMPORTED_MODULE_4__.default)(40, 40);
};

window.game._distanceDemo = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('distanceDemo', null, true, true);
  (0,_DistanceDemo__WEBPACK_IMPORTED_MODULE_5__.default)();
};

window.game._moveAction = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('moveAction', null, true, true);
  (0,_MoveActionDemo__WEBPACK_IMPORTED_MODULE_6__.default)();
};

window.game._mapGenDemo = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('mapGen', null, true, true);
  (0,_MapGenDemo__WEBPACK_IMPORTED_MODULE_7__.default)();
};

window.game._gameRules = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('gameRules', null, true, true);
  (0,_GameRulesDemo__WEBPACK_IMPORTED_MODULE_9__.default)();
};

window.game._spriteAnim = function () {
  window.game.scene = new _lib_Scene__WEBPACK_IMPORTED_MODULE_1__.default('spriteAnimation', null, true, true);
  new _SpriteAnimation__WEBPACK_IMPORTED_MODULE_11__.default();
};

/***/ }),

/***/ "./src/modules/MapGenDemo.js":
/*!***********************************!*\
  !*** ./src/modules/MapGenDemo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _lib_Character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/Character */ "./src/lib/Character.js");
/* harmony import */ var _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/HighlightGroup */ "./src/lib/HighlightGroup.js");
/* harmony import */ var _lib_Callback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Callback */ "./src/lib/Callback.js");
/* harmony import */ var _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gameRules/SceneState */ "./src/gameRules/SceneState.js");
/* harmony import */ var _gameRules_SceneLoop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gameRules/SceneLoop */ "./src/gameRules/SceneLoop.js");
/* harmony import */ var _gameRules_GameState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../gameRules/GameState */ "./src/gameRules/GameState.js");
/* harmony import */ var _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../gameRules/GameLoop */ "./src/gameRules/GameLoop.js");
/* harmony import */ var _characterPrefabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./characterPrefabs */ "./src/modules/characterPrefabs.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MainMenu */ "./src/modules/MainMenu.js");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/Light */ "./src/lib/Light.js");
var _window$game;














window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapGenDemo = function MapGenDemo() {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_0__.setOnScreenControls)(true);
  var xD = 20;
  var yD = 5;
  var zD = 20;
  var map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_1__.voxDungeon)([20, 3, 40]);
  var light = new _lib_Light__WEBPACK_IMPORTED_MODULE_12__.default(Math.random(), 'directional', null, [22.5, 60, 0], 1.0);
  map.render();
  var gState = new _gameRules_GameState__WEBPACK_IMPORTED_MODULE_8__.default();
  var gLoop = new _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_9__.default(gState);
  var scene = new _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_6__.default();
  scene.map = map;
  gState.loadScene(scene); // var search = true;
  // var x = 0;
  // var y = 0;
  // var z = 0;
  // for (z = 0; search && z < zD; z++) {
  //     for (x = 0; search && x < xD; x++) {
  //         var greatest = -1;
  //         for (y = 0; search && y < yD; y++) {
  //             if (map.surfaces[x][y][z]) {
  //                 greatest = y;
  //             }
  //         }
  //         if (greatest != -1) {
  //             y = greatest;
  //             search = false;
  //             break;
  //         }
  //     }
  //     if (!search) break;
  // }
  // scene.addCharacterPrefab(characterPrefabs.cleric, 'Sal', [x, y, z]);
  // var search = true;
  // x = y = z = 0;
  // for (z = zD - 1; search && z >= 0; z--) {
  //     for (x = 0; search && x < xD; x++) {
  //         var greatest = -1;
  //         for (y = 0; search && y < yD; y++) {
  //             if (map.surfaces[x][y][z]) {
  //                 greatest = y;
  //             }
  //         }
  //         if (greatest != -1) {
  //             y = greatest;
  //             search = false;
  //             break;
  //         }
  //     }
  //     if (!search) break;
  // }
  // scene.addCharacterPrefab(characterPrefabs.rogue, 'Sam', [x, y, z]);
  // scene.gameCharacters['Sam'].place([x,y,z]);
  // gState.loadScene(scene);

  window.backButton = function () {
    (0,_MainMenu__WEBPACK_IMPORTED_MODULE_11__.default)();
  };
});

/***/ }),

/***/ "./src/modules/MapGenerators.js":
/*!**************************************!*\
  !*** ./src/modules/MapGenerators.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "standardLights": () => (/* binding */ standardLights),
/* harmony export */   "grassPlain": () => (/* binding */ grassPlain),
/* harmony export */   "walkObstacle": () => (/* binding */ walkObstacle),
/* harmony export */   "voxDungeon": () => (/* binding */ voxDungeon),
/* harmony export */   "fourRooms": () => (/* binding */ fourRooms)
/* harmony export */ });
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _lib_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Map */ "./src/lib/Map.js");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Light */ "./src/lib/Light.js");
/* harmony import */ var _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/VoxelDefinition */ "./src/lib/VoxelDefinition.js");
/* harmony import */ var _lib_VoxelMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/VoxelMap */ "./src/lib/VoxelMap.js");
/* harmony import */ var _lib_Decal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/Decal */ "./src/lib/Decal.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var standardLights = function standardLights(map) {
  map.addLight(new _lib_Light__WEBPACK_IMPORTED_MODULE_2__.default('std1', 'directional', null, [22.5, 0, 0], 0.8));
  map.addLight(new _lib_Light__WEBPACK_IMPORTED_MODULE_2__.default('std2', 'directional', null, [22.5, 290, 0], 0.8));
};
var grassPlain = function grassPlain() {
  var _map = new _lib_Map__WEBPACK_IMPORTED_MODULE_1__.default([20, 1, 20]);

  for (var x = 0; x < 20; x++) {
    for (var z = 0; z < 20; z++) {
      _map.addVoxel([x, 0, z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.grassDirt);

      if (z == 10 && x % 2 == 0) {
        placeWall([x, 0, z], 3, 1);
      }
    }
  }

  return _map;
};
var walls = {};

function placeWall(pos, height, side) {
  var _pos = _slicedToArray(pos, 3),
      x = _pos[0],
      y = _pos[1],
      z = _pos[2];

  var _pos2 = _slicedToArray(pos, 3),
      px = _pos2[0],
      py = _pos2[1],
      pz = _pos2[2];

  y = y / 2;
  height = height / 2;
  y = y + height / 2;
  var r = 0;

  if (side == 1) {
    z = z + .5;
  } else if (side == 2) {
    x = x + .5;
    r = 90;
  } else if (side == 3) {
    z = z - .5;
    r = 180;
  } else if (side == 4) {
    x = x - .5;
    r = 270;
  }

  var wallDecal = new _lib_Decal__WEBPACK_IMPORTED_MODULE_5__.default(Math.random() + '', null, false);
  wallDecal.place([x, y, z], [0, r, 0], [1, height, 0]);
  walls[[px, py, pz, side]] = wallDecal;
}

var walkObstacle = function walkObstacle(xDim, zDim) {
  var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var _map = new _lib_Map__WEBPACK_IMPORTED_MODULE_1__.default([xDim, 5, zDim]);

  for (var _x = 0; _x < xDim; _x++) {
    for (var _z = 0; _z < zDim; _z++) {
      var x = _x % 20;
      var z = _z % 20;

      if (x == 10 || z == 10 || x == 0 || z == 0) {
        if (x == 1 || x == 2 || x == 9 || x == 11 || x == 17 || x == 18 || z == 1 || z == 2 || z == 9 || z == 11 || z == 17 || z == 18) {
          if (Math.random() > .3) {
            _map.addVoxel([_x, 0, _z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.stone);
          }
        }
      } else if ((x == 4 || x == 14) && (z > 2 && z < 8 || z > 12 && z < 18)) {
        for (var y = 1; y < 3; y++) {
          _map.addVoxel([_x, y, _z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.dirt);
        }
      } else if ((x == 3 || x == 5 || x == 13 || x == 15) && (z == 13 || z == 17 || z == 7 || z == 3)) {
        if (Math.random() > .3) _map.addVoxel([_x, 1, _z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.stone);
      } else {
        _map.addVoxel([_x, 0, _z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.grassDirt);
      }
    } // for (var i = 1; i < 4; i++) {
    //     _map.addVoxel([4, 4, 9], null);
    //     _map.addVoxel([5, 4, 9], null);
    //     _map.addVoxel([6, 4, 9], null);
    //     _map.addVoxel([7, 4, 9], null);
    //     _map.addVoxel([8, 4, 9], null);
    //     _map.addVoxel([9, 4, 9], null);
    // }

  }

  return _map;
};

function randomDoorLocation(room, xDim, zDim) {
  var y = room.y;
  var zSide1 = room.z + room.h + 1;
  if (zSide1 >= zDim) zSide1 = null;
  var xSide2 = room.x + room.w + 1;
  if (xSide2 >= xDim) xSide2 = null;
  var zSide3 = room.z - 1;
  if (zSide3 < 0) zSide3 = null;
  var xSide4 = room.x - 1;
  if (xSide4 < 0) xSide4 = null;
  var tries = 0;
  var res;

  while (tries < 20) {
    tries++;
    var r = Math.floor(Math.random() * (2 * room.w + 2 * room.h));

    if (r < room.w) {
      if (zSide1 == null) continue;
      res = [r + room.x, y, zSide1];
    } else if (r < room.w + room.h) {
      r -= room.w;
      if (xSide2 == null) continue;
      res = [xSide2, y, r + room.z];
    } else if (r < room.w + room.h + room.w) {
      r = r - room.w - room.h;
      if (zSide3 == null) continue;
      res = [r + room.x, y, zSide3];
    } else {
      r = r - room.w - room.h - room.w;
      if (xSide4 == null) continue;
      res = [xSide4, y, r + room.z];
    }
  }

  return res;
}

function doorOnSide(map, room, facing) {
  var r;
  if (facing == 1 || facing == 3) r = Math.floor(Math.random() * room.w);else r = Math.floor(Math.random() * room.h);

  if (facing == 1) {
    return [room.x + r, room.y, room.z + room.h];
  } else if (facing == 2) {
    return [room.x];
  }
}

function fillRoom(map, room, voxelDef) {
  var raised = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  for (var x = room.x; x < room.x + room.w; x++) {
    for (var z = room.z; z < room.z + room.h; z++) {
      if (!raised) {
        map.addVoxel([x, room.y, z], voxelDef);
      } else {
        for (var y = 0; y <= room.y; y++) {
          map.addVoxel([x, y, z], voxelDef);
        }
      }
    }
  }
}

function fillCorridor(map, corridor, voxelDef, raised) {
  console.log('fillCorridor');

  var _iterator = _createForOfIteratorHelper(corridor),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var coords = _step.value;

      if (raised) {
        for (var y = 0; y <= coords[1]; y++) {
          map.addVoxel([coords[0], y, coords[2]], voxelDef);
        }
      } else {
        map.addVoxel(coords, voxelDef);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function voxDungeon(dimensions) {
  var lights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _dimensions = _slicedToArray(dimensions, 3),
      xDim = _dimensions[0],
      yDim = _dimensions[1],
      zDim = _dimensions[2];

  var xSlice = Math.max(Math.floor(xDim / 10), 1);
  var zSlice = Math.max(Math.floor(Math.floor(zDim / 10), 2));
  var xMax = Math.min(8, xDim);
  var zMax = Math.min(8, zDim);
  var xMin = Math.min(3, xDim);
  var zMin = Math.min(3, zDim);
  var rooms = [];
  var roomConnected = [];

  for (var rowNum = 0; rowNum < xSlice; rowNum++) {
    var row = [];
    var connectRow = [];

    for (var colNum = 0; colNum < zSlice; colNum++) {
      var w = Math.floor(Math.random() * (xMax - xMin) + xMin);
      var h = Math.floor(Math.random() * (zMax - zMin) + zMin);
      row.append({
        x: 10 * colNum + Math.floor(Math.random() * (8 - w)) + 1,
        z: 10 * rowNum + Math.floor(Math.random() * (8 - w)) + 1,
        w: w,
        h: h,
        y: Math.floor(Math.random() * yDim)
      });
      fillRoom(map, row[row.length - 1], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.stone);
      connectRow.append(false);
    }

    rooms.append(row);
    roomConnected.append(connectRow);
  }

  while (1) {
    var any = false;

    for (var rowNum = 0; rowNum < xSlice; rowNum++) {//for (var colNum = 0; colNum < )
    }
  }
}
function fourRooms() {
  var map = new _lib_Map__WEBPACK_IMPORTED_MODULE_1__.default([20, 1, 20]);

  for (var x = 0; x < 20; x++) {
    for (var z = 0; z < 20; z++) {
      if (x == 10 && (z == 5 || z == 15)) {
        map.addVoxel([x, 0, z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.dirt);
        placeWall([x, 0, z], 3, 1);
        placeWall([x, 0, z], 3, 3);
      } else if (z == 10 && (x == 5 || x == 15)) {
        map.addVoxel([x, 0, z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.dirt);
        placeWall([x, 0, z], 3, 2);
        placeWall([x, 0, z], 3, 4);
      } else if (z == 10 || x == 10) {//
      } else {
        map.addVoxel([x, 0, z], _assetLoaders__WEBPACK_IMPORTED_MODULE_0__.VoxelDefinitions.stone);

        if (x == 0) {
          placeWall([x, 0, z], 3, 4);
        }

        if (x == 19) {
          placeWall([x, 0, z], 3, 2);
        }

        if (z == 0) {
          placeWall([x, 0, z], 3, 3);
        }

        if (z == 19) {
          placeWall([x, 0, z], 3, 1);
        }

        if (x == 9) {
          if (z != 5 && z != 15) {
            placeWall([x, 0, z], 3, 2);
          }
        }

        if (x == 11) {
          if (z != 5 && z != 15) {
            placeWall([x, 0, z], 3, 4);
          }
        }

        if (z == 9) {
          if (x != 5 && x != 15) {
            placeWall([x, 0, z], 3, 1);
          }
        }

        if (z == 11) {
          if (x != 5 && x != 15) {
            placeWall([x, 0, z], 3, 3);
          }
        }
      }
    }
  }

  for (var _i2 = 0, _arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]; _i2 < _arr2.length; _i2++) {
    x = _arr2[_i2];

    for (var _i3 = 0, _arr3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]; _i3 < _arr3.length; _i3++) {
      z = _arr3[_i3];

      if (Math.random() < .3) {
        var _ = new _lib_Light__WEBPACK_IMPORTED_MODULE_2__.default("".concat(Math.random()), 'point', [x, 1.5, z], null, 1.5, 10, null, [255, 128, 0]);
      }
    }
  }

  return map;
}

/***/ }),

/***/ "./src/modules/MoveActionDemo.js":
/*!***************************************!*\
  !*** ./src/modules/MoveActionDemo.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _lib_Character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Character */ "./src/lib/Character.js");
/* harmony import */ var _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/HighlightGroup */ "./src/lib/HighlightGroup.js");
/* harmony import */ var _lib_AudioSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/AudioSource */ "./src/lib/AudioSource.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
var _window$game;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {}; // TODO: bugged on rogue turn

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoveActionDemo = function MoveActionDemo() {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_5__.setOnScreenControls)(true);
  window._music = new _lib_AudioSource__WEBPACK_IMPORTED_MODULE_4__.default('window._music');

  window._music.playSound(_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sounds.necrophage);

  window._map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.walkObstacle)(22, 22);

  window._map.render();

  (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.standardLights)(window._map);
  window.game._cleric = new _lib_Character__WEBPACK_IMPORTED_MODULE_2__.default('game.cleric', _assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sprites.cleric0, [1, 0, 1]);

  window.game._cleric.unfollowWithCamera();

  window.game._cleric.place([1, 0, 1]);

  window.game._rogue = new _lib_Character__WEBPACK_IMPORTED_MODULE_2__.default('game.rogue', _assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sprites.rogueURWalk3, [21, 0, 0]);

  window.game._rogue.place([21, 0, 1]); //registerCharacterForClicks(window.game._cleric);
  //registerCharacterForClicks(window.game._rogue);
  // states = "clericTurn, rogueTurn, animating"


  window.game.state = 'clericTurn';
  window.game._hg = new _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__.default();
  window.game._clickableSquares = [];

  function coordsInList(coords, list) {
    var _iterator = _createForOfIteratorHelper(list),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var checkCoords = _step.value;
        if (checkCoords == null) continue;
        if (coords.length != checkCoords.length) continue;
        var match = true;

        for (var i = 0; i < coords.length; i++) {
          if (coords[i] != checkCoords[i]) {
            match = false;
          }
        }

        if (match) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  window.game._clickableSquares = [];

  characterMoveSelect = function characterMoveSelect(character, animationGroup, nextTurn) {
    character.centerInCamera();

    window.game._hg.clearHighlights();

    var range = window._map.closeSurfaces(character.position, 6);

    window.game._clickableSquares = range;

    window.game._hg.highlightMultiple(range, [0]);

    window.game._hg.showHighlights();

    window._map.receiveClick = function (coords, face) {
      if (coordsInList(coords, range)) {
        var aStarPath = window._map.aStar(character.position, coords);

        window.game._cleric.complete = function () {
          character.unfollowWithCamera();
          character.position = coords;
          window.game.state = nextTurn;

          _i.delayedEval(0.5, 'window.game.setState()');
        };

        character.setPathFromSequence(aStarPath, animationGroup, 15, 'window.game._cleric.complete()');
        character.followWithCamera();
        window.game.state = 'animate';
        window.game.setState();
      }
    };
  };

  window.game.setState = function () {
    window.game._clickableSquares = [];

    window._map.receiveClick = function () {};

    if (window.game.state == 'clericTurn') {
      characterMoveSelect(window.game._cleric, _assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.clericWalkGroup, 'rogueTurn');
    }

    if (window.game.state == 'rogueTurn') {
      characterMoveSelect(window.game._rogue, _assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.rogueWalkGroup, 'clericTurn');
    }

    if (window.game.state == 'animate') {}
  };

  window.backButton = function () {
    MainMenu();
  };

  window.game.setState();
});

/***/ }),

/***/ "./src/modules/NewMapDemo.js":
/*!***********************************!*\
  !*** ./src/modules/NewMapDemo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_VoxelMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/VoxelMap */ "./src/lib/VoxelMap.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Light */ "./src/lib/Light.js");
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _gameRules_GameState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../gameRules/GameState */ "./src/gameRules/GameState.js");
/* harmony import */ var _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gameRules/GameLoop */ "./src/gameRules/GameLoop.js");
/* harmony import */ var _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../gameRules/SceneState */ "./src/gameRules/SceneState.js");
/* harmony import */ var _characterPrefabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./characterPrefabs */ "./src/modules/characterPrefabs.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MainMenu */ "./src/modules/MainMenu.js");
/* harmony import */ var _lib_AudioSource__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/AudioSource */ "./src/lib/AudioSource.js");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewMap = function NewMap() {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_4__.setOnScreenControls)(true);
  window.game._map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_3__.fourRooms)(); //standardLights(window.game._map);

  window.game._map.render();

  var gState = new _gameRules_GameState__WEBPACK_IMPORTED_MODULE_5__.default();
  var gLoop = new _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_6__.default(gState);
  var scene = new _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_7__.default();
  window._music = new _lib_AudioSource__WEBPACK_IMPORTED_MODULE_10__.default('window._music');

  window._music.playSound(_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sounds.necrophage);

  scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_8__.characterPrefabs.cleric, 'Sal', [1, 0, 1]);
  scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_8__.characterPrefabs.rogue, 'Sam', [18, 0, 18], null, false);
  scene.map = window.game._map;
  gState.loadScene(scene);
  gLoop.go();

  window.backButton = function () {
    (0,_MainMenu__WEBPACK_IMPORTED_MODULE_9__.default)();
  };
});

/***/ }),

/***/ "./src/modules/SpriteAnimation.js":
/*!****************************************!*\
  !*** ./src/modules/SpriteAnimation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpriteAnimation)
/* harmony export */ });
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameRules/SceneState */ "./src/gameRules/SceneState.js");
/* harmony import */ var _gameRules_GameState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gameRules/GameState */ "./src/gameRules/GameState.js");
/* harmony import */ var _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gameRules/GameLoop */ "./src/gameRules/GameLoop.js");
/* harmony import */ var _gameRules_SceneLoop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gameRules/SceneLoop */ "./src/gameRules/SceneLoop.js");
/* harmony import */ var _characterPrefabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./characterPrefabs */ "./src/modules/characterPrefabs.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var SpriteAnimation = function SpriteAnimation() {
  _classCallCheck(this, SpriteAnimation);

  var scene = new _gameRules_SceneState__WEBPACK_IMPORTED_MODULE_1__.default('spriteAnimation');
  var game = new _gameRules_GameState__WEBPACK_IMPORTED_MODULE_2__.default();
  game.loop = new _gameRules_GameLoop__WEBPACK_IMPORTED_MODULE_3__.default(game);
  scene.map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.grassPlain)();
  scene.map.render();
  var rogue = scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_5__.characterPrefabs.deadRogue, 'rogue', [2, 0, 2]);
  var cleric = scene.addCharacterPrefab(_characterPrefabs__WEBPACK_IMPORTED_MODULE_5__.characterPrefabs.cleric, 'cleric', [6, 0, 2]);
  rogue.place(null, 0);
  (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_0__.standardLights)(scene.map);
  game.loadScene(scene);
};



/***/ }),

/***/ "./src/modules/WalkDemo.js":
/*!*********************************!*\
  !*** ./src/modules/WalkDemo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Map */ "./src/lib/Map.js");
/* harmony import */ var _lib_Light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/Light */ "./src/lib/Light.js");
/* harmony import */ var _lib_Character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/Character */ "./src/lib/Character.js");
/* harmony import */ var _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/HighlightGroup */ "./src/lib/HighlightGroup.js");
/* harmony import */ var _lib_AnimationPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/AnimationPath */ "./src/lib/AnimationPath.js");
/* harmony import */ var _assetLoaders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assetLoaders */ "./src/modules/assetLoaders.js");
/* harmony import */ var _MapGenerators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MapGenerators */ "./src/modules/MapGenerators.js");
/* harmony import */ var _lib_UIManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/UIManager */ "./src/lib/UIManager.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MainMenu */ "./src/modules/MainMenu.js");
var _window$game, _window$game$_walkDem;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





 //import AnimationPath from '../lib/AnimationPath';





window.game = (_window$game = window.game) !== null && _window$game !== void 0 ? _window$game : {};
window.game._walkDemo = (_window$game$_walkDem = window.game._walkDemo) !== null && _window$game$_walkDem !== void 0 ? _window$game$_walkDem : {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WalkDemo = function WalkDemo(xDim, zDim) {
  (0,_lib_UIManager__WEBPACK_IMPORTED_MODULE_7__.setOnScreenControls)(true);
  window.game._map = (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_6__.walkObstacle)(xDim, zDim);
  (0,_MapGenerators__WEBPACK_IMPORTED_MODULE_6__.standardLights)(window.game._map);

  window.game._walkDemo["continue"] = function () {
    window.game._map.render();

    window.game._cleric = new _lib_Character__WEBPACK_IMPORTED_MODULE_2__.default('game.cleric', _assetLoaders__WEBPACK_IMPORTED_MODULE_5__.Sprites.cleric0, [1, 0, 1]); //registerCharacterForClicks(window.game._cleric);

    window.game._cleric.place([1, 0, 1]);

    window.game._cleric.x = 1;
    window.game._cleric.y = 0;
    window.game._cleric.z = 1;
    window.game._cleric.dx = undefined;
    window.game.pathHighlight = new _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__.default();

    window.game._newWalkPath = function () {
      if (window.game._cleric.dx !== undefined) {
        window.game._cleric.x = window.game._cleric.dx;
        window.game._cleric.y = window.game._cleric.dy;
        window.game._cleric.z = window.game._cleric.dz;
      }

      var aStarPath = null;

      while (aStarPath == null) {
        window.game.pathHighlight.clearHighlights();
        var found = false;
        var x, y, z;

        while (!found) {
          y = 0;
          z = Math.floor(Math.random() * zDim);
          x = Math.floor(Math.random() * xDim);

          for (; y < 5; y++) {
            if (window.game._map.surfaces[x][y][z]) {
              found = true;
              break;
            }
          }
        }

        window.game._cleric.dx = x;
        window.game._cleric.dy = y;
        window.game._cleric.dz = z;
        aStarPath = window.game._map.aStar([window.game._cleric.x, window.game._cleric.y, window.game._cleric.z], [window.game._cleric.dx, window.game._cleric.dy, window.game._cleric.dz], 2, false, true, true);
      }

      window.game.pathHighlight.clearHighlights();

      var _iterator = _createForOfIteratorHelper(aStarPath),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var coords = _step.value;
          window.game.pathHighlight.highlightFaces(coords, [0]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      window.game.pathHighlight.showHighlights();
      var walkPath = _lib_AnimationPath__WEBPACK_IMPORTED_MODULE_4__.default.fromSequence('__default__', _assetLoaders__WEBPACK_IMPORTED_MODULE_5__.AnimationGroups.clericWalkGroup, aStarPath, 25, 'window.game._newWalkPath()');

      window.game._cleric.setPath(walkPath);

      window.game._cleric.followWithCamera();
    };

    _i.delayedEval(.1, 'window.game._newWalkPath()');

    window.backButton = function () {
      (0,_MainMenu__WEBPACK_IMPORTED_MODULE_8__.default)();
    };
  };

  window.game._walkDemo["continue"] = function () {
    return WPContinue(xDim, zDim);
  };

  _i.delayedEval(.1, "window.game._walkDemo.continue()");
});

function WPContinue(xDim, zDim) {
  window.game._map.render();

  window.game._cleric = new _lib_Character__WEBPACK_IMPORTED_MODULE_2__.default('game.cleric', _assetLoaders__WEBPACK_IMPORTED_MODULE_5__.Sprites.cleric0, [1, 0, 1]); //registerCharacterForClicks(window.game._cleric);

  window.game._cleric.place([1, 0, 1]);

  window.game._cleric.x = 1;
  window.game._cleric.y = 0;
  window.game._cleric.z = 1;
  window.game._cleric.dx = undefined;
  window.game.pathHighlight = new _lib_HighlightGroup__WEBPACK_IMPORTED_MODULE_3__.default();

  window.game._newWalkPath = function () {
    if (window.game._cleric.dx !== undefined) {
      window.game._cleric.x = window.game._cleric.dx;
      window.game._cleric.y = window.game._cleric.dy;
      window.game._cleric.z = window.game._cleric.dz;
    }

    var aStarPath = null;

    while (aStarPath == null) {
      window.game.pathHighlight.clearHighlights();
      var found = false;
      var x, y, z;

      while (!found) {
        y = 0;
        z = Math.floor(Math.random() * zDim);
        x = Math.floor(Math.random() * xDim);

        for (; y < 5; y++) {
          if (window.game._map.surfaces[x][y][z]) {
            found = true;
            break;
          }
        }
      }

      window.game._cleric.dx = x;
      window.game._cleric.dy = y;
      window.game._cleric.dz = z;
      aStarPath = window.game._map.aStar([window.game._cleric.x, window.game._cleric.y, window.game._cleric.z], [window.game._cleric.dx, window.game._cleric.dy, window.game._cleric.dz], 2, false, true, true);
    }

    window.game.pathHighlight.clearHighlights();

    var _iterator2 = _createForOfIteratorHelper(aStarPath),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var coords = _step2.value;
        window.game.pathHighlight.highlightFaces(coords, [0]);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    window.game.pathHighlight.showHighlights();
    var walkPath = _lib_AnimationPath__WEBPACK_IMPORTED_MODULE_4__.default.fromSequence('__default__', _assetLoaders__WEBPACK_IMPORTED_MODULE_5__.AnimationGroups.clericWalkGroup, aStarPath, 25, 'window.game._newWalkPath()');

    window.game._cleric.setPath(walkPath);

    window.game._cleric.followWithCamera();
  };

  _i.delayedEval(.1, 'window.game._newWalkPath()');

  window.backButton = function () {
    (0,_MainMenu__WEBPACK_IMPORTED_MODULE_8__.default)();
  };
}

/***/ }),

/***/ "./src/modules/assetLoaders.js":
/*!*************************************!*\
  !*** ./src/modules/assetLoaders.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sprites": () => (/* binding */ Sprites),
/* harmony export */   "VoxelTextures": () => (/* binding */ VoxelTextures),
/* harmony export */   "DecalTextures": () => (/* binding */ DecalTextures),
/* harmony export */   "Sounds": () => (/* binding */ Sounds),
/* harmony export */   "Animations": () => (/* binding */ Animations),
/* harmony export */   "AnimationGroups": () => (/* binding */ AnimationGroups),
/* harmony export */   "VoxelDefinitions": () => (/* binding */ VoxelDefinitions)
/* harmony export */ });
/* harmony import */ var _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/Sprite */ "./src/lib/Sprite.js");
/* harmony import */ var _lib_VoxelTexture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/VoxelTexture */ "./src/lib/VoxelTexture.js");
/* harmony import */ var _lib_SoundClip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/SoundClip */ "./src/lib/SoundClip.js");
/* harmony import */ var _lib_Animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/Animation */ "./src/lib/Animation.js");
/* harmony import */ var _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/AnimationGroup */ "./src/lib/AnimationGroup.js");
/* harmony import */ var _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/VoxelDefinition */ "./src/lib/VoxelDefinition.js");
/* harmony import */ var _lib_DecalTexture__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/DecalTexture */ "./src/lib/DecalTexture.js");






 // TODO: offset doesn't work

var Sprites = {
  cleric0: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric0', 'assets/Cleric.png', null, [22, 15, 18, 37]),
  cleric1: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric1', 'assets/Cleric.png', null, [86, 15, 20, 37]),
  cleric2: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric2', 'assets/Cleric.png', null, [213, 15, 18, 36]),
  cleric3: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric3', 'assets/Cleric.png', null, [277, 15, 20, 36]),
  cleric4: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric4', 'assets/Cleric.png', null, [150, 15, 18, 37]),
  clericURKneel: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric5', 'assets/Cleric.png', null, [403, 11, 25, 28]),
  clericURDie: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric6', 'assets/Cleric.png', null, [531, 11, 29, 28]),
  clericDRKneel: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric7', 'assets/Cleric.png', null, [467, 11, 28, 24]),
  clericDRDie: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/cleric8', 'assets/Cleric.png', null, [595, 7, 34, 19]),
  rogueDRWalk1: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue0', 'assets/Rog.png', null, [22, 15, 18, 34]),
  rogueDRWalk2: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue1', 'assets/Rog.png', null, [84, 15, 21, 37]),
  rogueDRWalk3: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue2', 'assets/Rog.png', null, [150, 15, 18, 34]),
  rogueURWalk1: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue3', 'assets/Rog.png', null, [213, 16, 21, 35]),
  rogueURWalk2: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue4', 'assets/Rog.png', null, [278, 16, 19, 35]),
  rogueURWalk3: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue5', 'assets/Rog.png', null, [341, 16, 23, 35]),
  rogueURKneel: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue6', 'assets/Rog.png', null, [403, 11, 26, 28]),
  rogueURDie: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue7', 'assets/Rog.png', null, [531, 11, 34, 29]),
  // what the hell is up with selecting shorter sprites from the sheet?
  // A: the y coordinate is from the bottom of the sheet
  rogueDRKneel: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue8', 'assets/Rog.png', null, [467, 11, 26, 25]),
  // TODO: pivot doesn't work
  rogueDRDie: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/rogue9', 'assets/Rog.png', null, [595, 9, 38, 19]),
  logo: new _lib_Sprite__WEBPACK_IMPORTED_MODULE_0__.default('game/sprites/logo', 'assets/Logo.png')
};
var VoxelTextures = {
  grass: new _lib_VoxelTexture__WEBPACK_IMPORTED_MODULE_1__.default('game/textures/grass', 'assets/Grass.png'),
  dirt: new _lib_VoxelTexture__WEBPACK_IMPORTED_MODULE_1__.default('game/textures/dirt', 'assets/Brown Stony.png'),
  stone: new _lib_VoxelTexture__WEBPACK_IMPORTED_MODULE_1__.default('game/textures/stone', 'assets/Grey Stones.png'),
  water: new _lib_VoxelTexture__WEBPACK_IMPORTED_MODULE_1__.default('game/textures/water', 'assets/Water Deep Blue.png')
};
var DecalTextures = {
  pentagram: new _lib_DecalTexture__WEBPACK_IMPORTED_MODULE_6__.default('game/textures/pentagram', 'assets/Penta.png')
};
var Sounds = {
  necrophage: new _lib_SoundClip__WEBPACK_IMPORTED_MODULE_2__.default('game/sounds/necrophage', 'assets/Necrophage.wav')
};
var Animations = {
  clericWalkDR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericWalkDR', [{
    sprite: Sprites.cleric0,
    ticks: 25
  }, {
    sprite: Sprites.cleric1,
    ticks: 50
  }]),
  clericWalkDL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericWalkDL', [{
    sprite: Sprites.cleric0,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.cleric1,
    ticks: 50,
    flip: true
  }]),
  clericWalkUR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericWalkUR', [{
    sprite: Sprites.cleric2,
    ticks: 25
  }, {
    sprite: Sprites.cleric3,
    ticks: 50
  }]),
  clericWalkUL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericWalkUL', [{
    sprite: Sprites.cleric2,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.cleric3,
    ticks: 50,
    flip: true
  }]),
  clericDieDR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericDieDR', [{
    sprite: Sprites.clericDRKneel,
    ticks: 25
  }, {
    sprite: Sprites.clericDRDie,
    ticks: 50
  }], false),
  clericDieUR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericDieUR', [{
    sprite: Sprites.clericURKneel,
    ticks: 25
  }, {
    sprite: Sprites.clericURDie,
    ticks: 50
  }], false),
  clericDieDL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericDieDR', [{
    sprite: Sprites.clericDRKneel,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.clericDRDie,
    ticks: 50,
    flip: true
  }], false),
  clericDieUL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/clericDieUR', [{
    sprite: Sprites.clericURKneel,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.clericURDie,
    ticks: 50,
    flip: true
  }], false),
  rogueWalkDR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueWalkDR', [{
    sprite: Sprites.rogueDRWalk1,
    ticks: 15
  }, {
    sprite: Sprites.rogueDRWalk2,
    ticks: 30
  }, {
    sprite: Sprites.rogueDRWalk3,
    ticks: 45
  }]),
  rogueWalkDL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueWalkDL', [{
    sprite: Sprites.rogueDRWalk1,
    ticks: 15,
    flip: true
  }, {
    sprite: Sprites.rogueDRWalk2,
    ticks: 30,
    flip: true
  }, {
    sprite: Sprites.rogueDRWalk3,
    ticks: 45,
    flip: true
  }]),
  rogueWalkUR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueWalkUR', [{
    sprite: Sprites.rogueURWalk1,
    ticks: 15
  }, {
    sprite: Sprites.rogueURWalk2,
    ticks: 30
  }, {
    sprite: Sprites.rogueURWalk3,
    ticks: 45
  }]),
  rogueWalkUL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueWalkUL', [{
    sprite: Sprites.rogueURWalk1,
    ticks: 15,
    flip: true
  }, {
    sprite: Sprites.rogueURWalk2,
    ticks: 30,
    flip: true
  }, {
    sprite: Sprites.rogueURWalk3,
    ticks: 45,
    flip: true
  }]),
  rogueDieDR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueDieDR', [{
    sprite: Sprites.rogueDRKneel,
    ticks: 25
  }, {
    sprite: Sprites.rogueDRDie,
    ticks: 50
  }], false),
  rogueDieUR: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueDieUR', [{
    sprite: Sprites.rogueURKneel,
    ticks: 25
  }, {
    sprite: Sprites.rogueURDie,
    ticks: 50
  }], false),
  rogueDieDL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueDieDR', [{
    sprite: Sprites.rogueDRKneel,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.rogueDRDie,
    ticks: 50,
    flip: true
  }], false),
  rogueDieUL: new _lib_Animation__WEBPACK_IMPORTED_MODULE_3__.default('game/animations/rogueDieUR', [{
    sprite: Sprites.rogueURKneel,
    ticks: 25,
    flip: true
  }, {
    sprite: Sprites.rogueURDie,
    ticks: 50,
    flip: true
  }], false)
};
var AnimationGroups = {
  clericWalkGroup: new _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_4__.default('game/animationGroups/clericWalkGroup', [Animations.clericWalkUL, Animations.clericWalkUR, Animations.clericWalkDR, Animations.clericWalkDL]),
  clericDieGroup: new _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_4__.default('game/animationGroups/clericDieGroup', [Animations.clericDieUL, Animations.clericDieUR, Animations.clericDieDR, Animations.clericDieDL]),
  rogueWalkGroup: new _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_4__.default('game/animationGroups/rogueWalkGroup', [Animations.rogueWalkUL, Animations.rogueWalkUR, Animations.rogueWalkDR, Animations.rogueWalkDL]),
  rogueDieGroup: new _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_4__.default('game/animationGroups/rogueDieGroup', [Animations.rogueDieUL, Animations.rogueDieUR, Animations.rogueDieDR, Animations.rogueDieDL])
};
var VoxelDefinitions = {
  grassDirt: new _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_5__.default('game/voxelDefinitions/grassDirt', [VoxelTextures.grass, VoxelTextures.dirt]),
  stone: new _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_5__.default('game/voxelDefinitions/stone', [VoxelTextures.stone]),
  water: new _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_5__.default('game/voxelDefinitions/water', [VoxelTextures.water]),
  dirt: new _lib_VoxelDefinition__WEBPACK_IMPORTED_MODULE_5__.default('game/voxelDefinitions/dirt', [VoxelTextures.dirt])
};

/***/ }),

/***/ "./src/modules/characterPrefabs.js":
/*!*****************************************!*\
  !*** ./src/modules/characterPrefabs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "characterPrefabs": () => (/* binding */ characterPrefabs)
/* harmony export */ });
/* harmony import */ var _lib_AnimationGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/AnimationGroup */ "./src/lib/AnimationGroup.js");
/* harmony import */ var _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/assetLoaders */ "./src/modules/assetLoaders.js");


var characterPrefabs = {
  cleric: {
    defaultSprite: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sprites.cleric0,
    scale: 2,
    animations: {
      walk: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.clericWalkGroup,
      idle: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.clericWalkGroup,
      die: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.clericDieGroup
    },
    sheet: {
      HP: 8,
      walk: 6.5,
      dex: 12
    }
  },
  rogue: {
    defaultSprite: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sprites.rogueDRWalk1,
    scale: 2,
    animations: {
      walk: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.rogueWalkGroup,
      idle: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.rogueWalkGroup,
      die: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.rogueDieGroup
    },
    sheet: {
      HP: 8,
      walk: 6.5,
      dex: 16
    }
  },
  deadRogue: {
    defaultSprite: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.Sprites.rogueDRKneel,
    scale: 2,
    animations: {
      idle: _modules_assetLoaders__WEBPACK_IMPORTED_MODULE_1__.AnimationGroups.rogueDieGroup
    }
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_MainMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MainMenu */ "./src/modules/MainMenu.js");

(0,_modules_MainMenu__WEBPACK_IMPORTED_MODULE_0__.default)();
})();

/******/ })()
;