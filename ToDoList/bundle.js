/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! exports provided: Logger, LoggerWithHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Logger\", function() { return Logger; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoggerWithHistory\", function() { return LoggerWithHistory; });\nclass AbstractLogger {\r\n  constructor(config) {\r\n    this._logLevel = config.level;\r\n  }\r\n\r\n  log(message) {\r\n    throw new Error(\"Not implemented\");\r\n  }\r\n}\r\n\r\nclass Logger extends AbstractLogger {\r\n  constructor(config) {\r\n    super(config);\r\n  }\r\n\r\n  log(message) {\r\n    switch (this._logLevel) {\r\n      case \"debug\":\r\n        console.log(message);\r\n        break;\r\n\r\n      case \"production\":\r\n        break;\r\n    }\r\n  }\r\n}\r\n\r\nclass LoggerWithHistory extends AbstractLogger {\r\n  constructor(config) {\r\n    super(config);\r\n    this._id = 0;\r\n    this._headers = {\r\n      Accept: \"application/json\",\r\n      \"Content-Type\": \"application/json\",\r\n      \"Access-Control-Allow-Method\": \"GET, POST, PUT, DELETE, PATCH\"\r\n    };\r\n  }\r\n\r\n  async getLogs() {\r\n    let response = await fetch(\"http://localhost:3000/logs\");\r\n    return await response.json();\r\n  }\r\n\r\n  checkId(id) {\r\n    if (id === 99) {\r\n      this._id = 0;\r\n    } else {\r\n      this._id = id;\r\n    }\r\n  }\r\n\r\n  async log(message, headers = this._headers, logId = this._id) {\r\n    switch (this._logLevel) {\r\n      case \"debug\": {\r\n        let logObj = {\r\n          id: logId,\r\n          event: message,\r\n          time: new Date()\r\n        };\r\n        let response = await fetch(\"http://localhost:3000/logs\", {\r\n          headers,\r\n          method: \"POST\",\r\n          body: JSON.stringify(logObj)\r\n        });\r\n        if (this._id === 99) this._id = 0;\r\n        else this._id++;\r\n      }\r\n\r\n      case \"production\":\r\n        break;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/logger.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./taskManager */ \"./src/taskManager.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass ToDoApplication {\r\n  constructor() {}\r\n\r\n  execute() {\r\n    let taskContainer = document.querySelector(\".todo-app__tasks\");\r\n\r\n    const store = new _store__WEBPACK_IMPORTED_MODULE_1__[\"Store\"]();\r\n    const render = new _render__WEBPACK_IMPORTED_MODULE_0__[\"RealRender\"](taskContainer);\r\n    const taskManager = new _taskManager__WEBPACK_IMPORTED_MODULE_4__[\"TaskManager\"](store);\r\n    const toDo = new _todo__WEBPACK_IMPORTED_MODULE_5__[\"ToDo\"](taskManager, render);\r\n\r\n    render.deleteTaskFunction = toDo.deleteTask.bind(toDo);\r\n    render.toggleTaskFunction = toDo.toggleTask.bind(toDo);\r\n\r\n    let titleInputRef = document.querySelector(\".todo-app__input\");\r\n    let createTaskBtnRef = document.querySelector(\r\n      \".todo-app__input-content .button\"\r\n    );\r\n\r\n    createTaskBtnRef.addEventListener(\"click\", () => {\r\n      toDo.addTask(titleInputRef.value);\r\n      titleInputRef.value = \"\";\r\n    });\r\n\r\n    document.addEventListener(\"keyup\", event => {\r\n      if (event.keyCode == 13) {\r\n        createTaskBtnRef.click();\r\n      }\r\n    });\r\n\r\n    $(\"#button1\").click(function() {\r\n      alert(\"Button works!\");\r\n    });\r\n\r\n    toDo.init();\r\n  }\r\n}\r\n\r\nlet app = new ToDoApplication();\r\napp.execute();\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! exports provided: Render, RealRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Render\", function() { return Render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RealRender\", function() { return RealRender; });\nclass AbstractRender {\r\n  renderTask(task) {\r\n    throw new Error(\"not implemented\");\r\n  }\r\n}\r\n\r\nclass Render extends AbstractRender {\r\n  constructor() {\r\n    super();\r\n  }\r\n  renderTask(task) {\r\n    console.log(task);\r\n  }\r\n}\r\n\r\nclass RealRender extends AbstractRender {\r\n  constructor(taskContainer) {\r\n    super();\r\n    this._taskContainer = taskContainer;\r\n  }\r\n\r\n  set deleteTaskFunction(func) {\r\n    this._deleteTaskFunction = func;\r\n  }\r\n\r\n  set toggleTaskFunction(func) {\r\n    this._toggleTaskFunction = func;\r\n  }\r\n\r\n  deleteTask(id) {\r\n    let div = this._taskContainer.querySelector(`#${id}`);\r\n    div.remove();\r\n  }\r\n\r\n  toggleTask(id) {\r\n    let task = this._taskContainer.querySelector(`#${id}`);\r\n\r\n    if (task.getAttribute(\"class\") === \"task\") {\r\n      task.removeAttribute(\"class\");\r\n      task.setAttribute(\"class\", \"task task_toggled\");\r\n    } else if (task.getAttribute(\"class\") === \"task task_toggled\") {\r\n      task.setAttribute(\"class\", \"task\");\r\n    }\r\n  }\r\n\r\n  renderTask(task) {\r\n    let div = document.createElement(\"div\");\r\n    if (!task.completed) {\r\n      div.setAttribute(\"class\", \"task\");\r\n    } else {\r\n      div.setAttribute(\"class\", \"task task_toggled\");\r\n    }\r\n    div.setAttribute(\"id\", `${task.id}`);\r\n\r\n    let p = document.createElement(\"p\");\r\n    p.setAttribute(\"class\", \"task__title\");\r\n    p.innerText = task.title;\r\n\r\n    let toggleBtn = document.createElement(\"button\");\r\n    toggleBtn.setAttribute(\"class\", \"button\");\r\n    toggleBtn.innerText = \"Complete\";\r\n\r\n    let deleteBtn = document.createElement(\"button\");\r\n    deleteBtn.setAttribute(\"class\", \"button\");\r\n    deleteBtn.innerText = \"Delete\";\r\n\r\n    div.addEventListener(\"click\", event => {\r\n      let target = event.target;\r\n\r\n      if (\r\n        target.getAttribute(\"class\") === \"button\" &&\r\n        target.innerText === \"Delete\"\r\n      ) {\r\n        this._deleteTaskFunction(task.id);\r\n        this.deleteTask(task.id);\r\n      }\r\n\r\n      if (\r\n        target.getAttribute(\"class\") === \"button\" &&\r\n        target.innerText === \"Complete\"\r\n      ) {\r\n        this._toggleTaskFunction(task.id);\r\n        this.toggleTask(task.id);\r\n      }\r\n    });\r\n\r\n    div.append(p, toggleBtn, deleteBtn);\r\n    this._taskContainer.append(div);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/render.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: AbstractStore, StoreJS, StoreLS, Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractStore\", function() { return AbstractStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StoreJS\", function() { return StoreJS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StoreLS\", function() { return StoreLS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return Store; });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\r\n\r\nclass AbstractStore {\r\n  getTask(id) {\r\n    throw new Error(\"Not implemented\");\r\n  }\r\n\r\n  getTasks() {\r\n    throw new Error(\"Not implemented\");\r\n  }\r\n\r\n  saveTask(task) {\r\n    throw new Error(\"Not implemented\");\r\n  }\r\n}\r\n\r\nclass StoreJS extends AbstractStore {\r\n  constructor() {\r\n    super();\r\n    this._headers = {\r\n      Accept: \"application/json\",\r\n      \"Content-Type\": \"application/json\",\r\n      \"Access-Control-Allow-Method\": \"GET, POST, PUT, DELETE, PATCH\"\r\n    };\r\n  }\r\n\r\n  async getTask(id) {\r\n    let response = await fetch(`http://localhost:3000/tasks/${id}`);\r\n    let task = _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].fromJSON(JSON.stringify(await response.json()));\r\n    return Promise.resolve(task);\r\n  }\r\n\r\n  async getTasks() {\r\n    let response = await fetch(\"http://localhost:3000/tasks\");\r\n    return await response.json();\r\n  }\r\n\r\n  async saveTask(task, headers = this._headers) {\r\n    let response = await fetch(\"http://localhost:3000/tasks\", {\r\n      headers,\r\n      method: \"POST\",\r\n      body: _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].toJSON(task)\r\n    });\r\n    return await response.json();\r\n  }\r\n\r\n  async deleteTask(id, headers = this._headers) {\r\n    let response = await fetch(`http://localhost:3000/tasks/${id}`, {\r\n      headers,\r\n      method: \"DELETE\"\r\n    });\r\n    return await response.json();\r\n  }\r\n\r\n  async toggleTask(id, headers = this._headers) {\r\n    let task = await this.getTask(id);\r\n    task.toggle();\r\n    const response = await fetch(`http://localhost:3000/tasks/${id}`, {\r\n      headers,\r\n      method: \"PUT\",\r\n      body: _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].toJSON(task)\r\n    });\r\n    return await response.json();\r\n  }\r\n}\r\n\r\nclass StoreLS extends AbstractStore {\r\n  constructor() {\r\n    super();\r\n    this._prefix = \"strLS\";\r\n  }\r\n\r\n  getTask(id) {\r\n    let key = this._prefix + id;\r\n    const taskJson = localStorage.getItem(key);\r\n    if (!taskJson) {\r\n      throw new Error(`There is no task with id = ${id}`);\r\n    }\r\n\r\n    let task = null;\r\n    try {\r\n      task = _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].fromJSON(taskJson);\r\n    } catch (error) {\r\n      throw new Error(`impossible get task with id = ${id}`, error.message);\r\n    }\r\n\r\n    return Promise.resolve(task);\r\n  }\r\n\r\n  getTasks() {\r\n    const tasks = [];\r\n    for (let index = 0; index < localStorage.length; index++) {\r\n      const key = localStorage.key(index);\r\n\r\n      if (key.includes(this._prefix)) {\r\n        let task = null;\r\n        try {\r\n          task = _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].fromJSON(localStorage.getItem(key));\r\n        } catch (error) {\r\n          throw new Error(`impossible get task with id = ${id}`, error.message);\r\n        }\r\n        tasks.push(task);\r\n      }\r\n    }\r\n    return Promise.resolve(tasks);\r\n  }\r\n\r\n  saveTask(task) {\r\n    let key = this._prefix + task.id;\r\n    const json = _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].toJSON(task);\r\n    localStorage.setItem(key, json);\r\n    return Promise.resolve(task.copy());\r\n  }\r\n\r\n  deleteTask(id) {\r\n    let key = this._prefix + id;\r\n    localStorage.removeItem(key);\r\n    return Promise.resolve({});\r\n  }\r\n\r\n  async toggleTask(id) {\r\n    let key = this._prefix + id;\r\n    let taskPromise = this.getTask(id);\r\n    let task = await taskPromise.then();\r\n    localStorage.setItem(key, _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].toJSON(task.toggle()));\r\n    return Promise.resolve(task);\r\n  }\r\n}\r\n\r\nclass Store extends AbstractStore {\r\n  constructor() {\r\n    super();\r\n    this._storage = [];\r\n  }\r\n\r\n  saveTask(task) {\r\n    let copyTask = task.copy();\r\n    this._storage.push(task);\r\n    return Promise.resolve(copyTask);\r\n  }\r\n\r\n  getTasks() {\r\n    return Promise.resolve(\r\n      this._storage.map(task => {\r\n        let taskCopy = null;\r\n        try {\r\n          taskCopy = task.copy();\r\n        } catch (error) {\r\n          throw new Error(`impossible get task with id = ${id}`, error.message);\r\n        }\r\n        return taskCopy;\r\n      })\r\n    );\r\n  }\r\n\r\n  getTask(id) {\r\n    const task = this._storage.find(task => task.id === id);\r\n\r\n    if (!task) {\r\n      throw new Error(`There is no task with id = ${id}`);\r\n    }\r\n\r\n    let taskCopy = null;\r\n    try {\r\n      taskCopy = task.copy();\r\n    } catch (error) {\r\n      throw new Error(`impossible get task with id = ${id}`, error.message);\r\n    }\r\n\r\n    return Promise.resolve(taskCopy);\r\n  }\r\n\r\n  deleteTask(id) {\r\n    for (let index = 0; index < this._storage.length; index++) {\r\n      if (this._storage[index].id === id) {\r\n        this._storage.splice(index, 1);\r\n      }\r\n    }\r\n    return Promise.resolve({});\r\n  }\r\n\r\n  toggleTask(id) {\r\n    for (let index = 0; index < this._storage.length; index++) {\r\n      if (this._storage[index].id === id) {\r\n        this._storage[index].toggle();\r\n        return Promise.resolve(this._storage[index].copy());\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\nclass Task {\r\n  constructor(id, title, completed = false, creationMoment = Date.now()) {\r\n    this._id = id;\r\n    this._title = title;\r\n    this._completed = completed;\r\n    this._creationMoment = creationMoment;\r\n  }\r\n\r\n  get id() {\r\n    return this._id;\r\n  }\r\n\r\n  get title() {\r\n    return this._title;\r\n  }\r\n\r\n  get completed() {\r\n    return this._completed;\r\n  }\r\n\r\n  get creationMoment() {\r\n    return this._creationMoment;\r\n  }\r\n\r\n  isCompleted() {\r\n    return this._completed;\r\n  }\r\n\r\n  toggle() {\r\n    this._completed = !this._completed;\r\n    return this;\r\n  }\r\n\r\n  copy() {\r\n    return {\r\n      id: this.id,\r\n      title: this.title,\r\n      completed: this.completed,\r\n      creationMoment: this.creationMoment\r\n    };\r\n  }\r\n\r\n  static toJSON(task) {\r\n    return JSON.stringify({\r\n      id: task.id,\r\n      title: task.title,\r\n      completed: task.completed,\r\n      creationMoment: task.creationMoment\r\n    });\r\n  }\r\n\r\n  static fromJSON(json) {\r\n    let obj = null;\r\n    try {\r\n      obj = JSON.parse(json);\r\n    } catch (error) {\r\n      throw new Error(`invalid json: ${json}`, error.message);\r\n    }\r\n\r\n    return new Task(obj.id, obj.title, obj.completed, obj.creationMoment);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/task.js?");

/***/ }),

/***/ "./src/taskManager.js":
/*!****************************!*\
  !*** ./src/taskManager.js ***!
  \****************************/
/*! exports provided: TaskManager, LoggerableTaskManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TaskManager\", function() { return TaskManager; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoggerableTaskManager\", function() { return LoggerableTaskManager; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\r\n\r\n\r\nclass TaskManager {\r\n  constructor(store) {\r\n    if (!(store instanceof _store__WEBPACK_IMPORTED_MODULE_0__[\"AbstractStore\"])) {\r\n      throw new Error(\"Store should be implements AbstractStore interface\");\r\n    }\r\n    this._store = store;\r\n  }\r\n\r\n  createTask(title) {\r\n    let id =\r\n      \"task\" +\r\n      Math.random()\r\n        .toString(36)\r\n        .substring(2, 9);\r\n    let task = new _task__WEBPACK_IMPORTED_MODULE_1__[\"Task\"](id, title);\r\n    return this._store.saveTask(task);\r\n  }\r\n\r\n  getTasks() {\r\n    return this._store.getTasks();\r\n  }\r\n\r\n  deleteTask(id) {\r\n    return this._store.deleteTask(id);\r\n  }\r\n\r\n  toggleTask(id) {\r\n    return this._store.toggleTask(id);\r\n  }\r\n}\r\n\r\nclass LoggerableTaskManager extends TaskManager {\r\n  constructor(store, logger) {\r\n    super(...arguments);\r\n    this._logger = logger;\r\n  }\r\n\r\n  async createTask(title) {\r\n    let result = await super.createTask(title);\r\n    this._logger.log(`created task ${title}`);\r\n    return result;\r\n  }\r\n\r\n  getTasks() {\r\n    return super.getTasks();\r\n  }\r\n\r\n  async deleteTask(id) {\r\n    let result = await super.deleteTask(id);\r\n    this._logger.log(`deleted task id: ${id}`);\r\n    return result;\r\n  }\r\n\r\n  async toggleTask(id) {\r\n    let result = await super.toggleTask(id);\r\n    this._logger.log(`toggled task id: ${id}`);\r\n    return result;\r\n  }\r\n\r\n  getLogs() {\r\n    return this._logger.history;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/taskManager.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! exports provided: ToDo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ToDo\", function() { return ToDo; });\nclass ToDo {\r\n  constructor(taskManager, render) {\r\n    this._taskManager = taskManager;\r\n    this._render = render;\r\n  }\r\n\r\n  init() {\r\n    let tasksPromise = this._taskManager.getTasks();\r\n    tasksPromise.then(tasks =>\r\n      tasks.forEach(task => {\r\n        this._render.renderTask(task);\r\n      })\r\n    );\r\n  }\r\n\r\n  async addTask(title) {\r\n    let taskPromise = this._taskManager.createTask(title);\r\n    taskPromise.then(task => this._render.renderTask(task));\r\n  }\r\n\r\n  deleteTask(id) {\r\n    let promiseTask = this._taskManager.deleteTask(id);\r\n  }\r\n\r\n  toggleTask(id) {\r\n    let promiseTask = this._taskManager.toggleTask(id);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })

/******/ });