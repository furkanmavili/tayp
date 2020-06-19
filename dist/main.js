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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _words__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./words */ \"./src/words.js\");\n/* harmony import */ var _keyMaps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyMaps */ \"./src/keyMaps.js\");\n\n\nlet wordArea = document.querySelector(\".words\");\n\nlet words = \"\";\nlet swords = [];\nlet alleters;\ndraw();\n\nlet current = 0;\nalleters[current].classList.add(\"cursor\");\n\nwindow.addEventListener(\"click\", isFocused);\n\n// curtime end finTime for calculate wpm speed\nlet curTime;\nlet finTime;\n\nlet activate = document.querySelector(\".activate\");\n// checks wordArea is focused or not, if so start keyboard event.\nfunction isFocused(e) {\n  if (Array.from(e.target.classList).includes(\"words\")) {\n    curTime = \"\";\n    finTime = \"\";\n    activate.style.display = \"none\";\n    wordArea.classList.remove(\"words-off\");\n    alleters[current].classList.add(\"cursor\");\n    curTime = new Date();\n    show();\n    window.addEventListener(\"keypress\", start);\n  } else {\n    curTime = \"\";\n    finTime = \"\";\n    current = 0;\n    activate.style.display = \"block\";\n    wordArea.classList.add(\"words-off\");\n    reset();\n    window.removeEventListener(\"keypress\", start);\n  }\n}\n\n// compares e.keyCode with expected letter\nfunction start(e) {\n  console.log(e.keyCode);\n  if (_keyMaps__WEBPACK_IMPORTED_MODULE_1__[\"default\"][words.charAt(current)] == e.keyCode) {\n    alleters[current].classList.remove(\"cursor\");\n    alleters[current].classList.add(\"correct\");\n    current++;\n    if (current == words.length) {\n      finTime = new Date();\n      calculate();\n      clear();\n      draw();\n      reset();\n      window.removeEventListener(\"keyup\", start);\n    }\n    alleters[current].classList.add(\"cursor\");\n  } else {\n    alleters[current].classList.add(\"wrong\");\n  }\n}\n\nfunction generate() {\n  swords = [];\n  for (let i = 0; i < 5; i++) {\n    let random = Math.round(Math.random() * 999);\n    swords.push(_words__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mostCommon[random]);\n    swords.push(\" \");\n  }\n  swords.pop();\n  words = swords.join(\"\");\n  console.log(words);\n}\n// loop through swords array and creates span elements to wordArea\nfunction draw() {\n  generate();\n  console.log(swords);\n  swords.forEach((e) => {\n    let wrapper = document.createElement(\"div\");\n    for (let i = 0; i < e.length; i++) {\n      let span = document.createElement(\"span\");\n      span.classList.add(\"letter\");\n      if (e[i].match(/[a-z]/i)) {\n        span.textContent = e[i];\n        wrapper.appendChild(span);\n      } else {\n        span.innerHTML = \"␣\";\n        span.classList.add(\"space\");\n        wrapper.appendChild(span);\n      }\n    }\n    wordArea.appendChild(wrapper);\n  });\n  alleters = document.querySelectorAll(\".letter\");\n}\n\n// when typing is end, clear the screen\nfunction clear() {\n  current = 0;\n  while (wordArea.firstChild) {\n    wordArea.lastChild.remove();\n  }\n}\n\n// if wordArea focused, opacity = 1\nfunction show() {\n  alleters.forEach((el) => {\n    el.style.opacity = \"1\";\n  });\n}\n// if wordArea not focused, opacity = 0.5\nfunction reset() {\n  alleters.forEach((el) => {\n    el.style.opacity = \"0.5\";\n    el.classList.remove(\"correct\", \"wrong\", \"cursor\");\n  });\n}\n\nconst speed = document.querySelector(\"#speed\");\nconst errors = document.querySelector(\"#errors\");\n// calculates wpm speed. words/min\nfunction calculate() {\n  let diff = finTime.getTime() - curTime.getTime();\n  let min = diff / 1000 / 60;\n  let wpm = words.split(\" \").length / min;\n  wpm = Math.floor(wpm);\n  const wrong = totalError();\n  console.log(wrong);\n  speed.innerHTML = `Speed: ${wpm}`;\n  errors.innerHTML = `Errors: ${wrong}`;\n}\n\n// loop through all letters and count \"wrong\" class in classList\nfunction totalError() {\n  let error = 0;\n  alleters.forEach((el) => {\n    if ([...el.classList].includes(\"wrong\")) {\n      error++;\n    }\n  });\n  return error;\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/keyMaps.js":
/*!************************!*\
  !*** ./src/keyMaps.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst keyMaps = {\n  A: 65,\n  B: 66,\n  C: 67,\n  D: 68,\n  E: 69,\n  F: 70,\n  G: 71,\n  H: 72,\n  I: 73,\n  J: 74,\n  K: 75,\n  L: 76,\n  M: 77,\n  N: 78,\n  O: 79,\n  P: 80,\n  Q: 81,\n  R: 82,\n  S: 83,\n  T: 84,\n  U: 85,\n  V: 86,\n  W: 87,\n  X: 88,\n  Y: 89,\n  Z: 90,\n  a: 97,\n  b: 98,\n  c: 99,\n  d: 100,\n  e: 101,\n  f: 102,\n  g: 103,\n  h: 104,\n  i: 105,\n  j: 106,\n  k: 107,\n  l: 108,\n  m: 109,\n  n: 110,\n  o: 111,\n  p: 112,\n  q: 113,\n  r: 114,\n  s: 115,\n  t: 116,\n  u: 117,\n  v: 118,\n  w: 119,\n  x: 120,\n  y: 121,\n  z: 122,\n  \" \": 32,\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (keyMaps);\n\n\n//# sourceURL=webpack:///./src/keyMaps.js?");

/***/ }),

/***/ "./src/words.js":
/*!**********************!*\
  !*** ./src/words.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst mostCommon = [\n  \"a\",\n  \"ability\",\n  \"able\",\n  \"about\",\n  \"above\",\n  \"accept\",\n  \"according\",\n  \"account\",\n  \"across\",\n  \"act\",\n  \"action\",\n  \"activity\",\n  \"actually\",\n  \"add\",\n  \"address\",\n  \"administration\",\n  \"admit\",\n  \"adult\",\n  \"affect\",\n  \"after\",\n  \"again\",\n  \"against\",\n  \"age\",\n  \"agency\",\n  \"agent\",\n  \"ago\",\n  \"agree\",\n  \"agreement\",\n  \"ahead\",\n  \"air\",\n  \"all\",\n  \"allow\",\n  \"almost\",\n  \"alone\",\n  \"along\",\n  \"already\",\n  \"also\",\n  \"although\",\n  \"always\",\n  \"American\",\n  \"among\",\n  \"amount\",\n  \"analysis\",\n  \"and\",\n  \"animal\",\n  \"another\",\n  \"answer\",\n  \"any\",\n  \"anyone\",\n  \"anything\",\n  \"appear\",\n  \"apply\",\n  \"approach\",\n  \"area\",\n  \"argue\",\n  \"arm\",\n  \"around\",\n  \"arrive\",\n  \"art\",\n  \"article\",\n  \"artist\",\n  \"as\",\n  \"ask\",\n  \"assume\",\n  \"at\",\n  \"attack\",\n  \"attention\",\n  \"attorney\",\n  \"audience\",\n  \"author\",\n  \"authority\",\n  \"available\",\n  \"avoid\",\n  \"away\",\n  \"baby\",\n  \"back\",\n  \"bad\",\n  \"bag\",\n  \"ball\",\n  \"bank\",\n  \"bar\",\n  \"base\",\n  \"be\",\n  \"beat\",\n  \"beautiful\",\n  \"because\",\n  \"become\",\n  \"bed\",\n  \"before\",\n  \"begin\",\n  \"behavior\",\n  \"behind\",\n  \"believe\",\n  \"benefit\",\n  \"best\",\n  \"better\",\n  \"between\",\n  \"beyond\",\n  \"big\",\n  \"bill\",\n  \"billion\",\n  \"bit\",\n  \"black\",\n  \"blood\",\n  \"blue\",\n  \"board\",\n  \"body\",\n  \"book\",\n  \"born\",\n  \"both\",\n  \"box\",\n  \"boy\",\n  \"break\",\n  \"bring\",\n  \"brother\",\n  \"budget\",\n  \"build\",\n  \"building\",\n  \"business\",\n  \"but\",\n  \"buy\",\n  \"by\",\n  \"call\",\n  \"camera\",\n  \"campaign\",\n  \"can\",\n  \"cancer\",\n  \"candidate\",\n  \"capital\",\n  \"car\",\n  \"card\",\n  \"care\",\n  \"career\",\n  \"carry\",\n  \"case\",\n  \"catch\",\n  \"cause\",\n  \"cell\",\n  \"center\",\n  \"central\",\n  \"century\",\n  \"certain\",\n  \"certainly\",\n  \"chair\",\n  \"challenge\",\n  \"chance\",\n  \"change\",\n  \"character\",\n  \"charge\",\n  \"check\",\n  \"child\",\n  \"choice\",\n  \"choose\",\n  \"church\",\n  \"citizen\",\n  \"city\",\n  \"civil\",\n  \"claim\",\n  \"class\",\n  \"clear\",\n  \"clearly\",\n  \"close\",\n  \"coach\",\n  \"cold\",\n  \"collection\",\n  \"college\",\n  \"color\",\n  \"come\",\n  \"commercial\",\n  \"common\",\n  \"community\",\n  \"company\",\n  \"compare\",\n  \"computer\",\n  \"concern\",\n  \"condition\",\n  \"conference\",\n  \"Congress\",\n  \"consider\",\n  \"consumer\",\n  \"contain\",\n  \"continue\",\n  \"control\",\n  \"cost\",\n  \"could\",\n  \"country\",\n  \"couple\",\n  \"course\",\n  \"court\",\n  \"cover\",\n  \"create\",\n  \"crime\",\n  \"cultural\",\n  \"culture\",\n  \"cup\",\n  \"current\",\n  \"customer\",\n  \"cut\",\n  \"dark\",\n  \"data\",\n  \"daughter\",\n  \"day\",\n  \"dead\",\n  \"deal\",\n  \"death\",\n  \"debate\",\n  \"decade\",\n  \"decide\",\n  \"decision\",\n  \"deep\",\n  \"defense\",\n  \"degree\",\n  \"Democrat\",\n  \"democratic\",\n  \"describe\",\n  \"design\",\n  \"despite\",\n  \"detail\",\n  \"determine\",\n  \"develop\",\n  \"development\",\n  \"die\",\n  \"difference\",\n  \"different\",\n  \"difficult\",\n  \"dinner\",\n  \"direction\",\n  \"director\",\n  \"discover\",\n  \"discuss\",\n  \"discussion\",\n  \"disease\",\n  \"do\",\n  \"doctor\",\n  \"dog\",\n  \"door\",\n  \"down\",\n  \"draw\",\n  \"dream\",\n  \"drive\",\n  \"drop\",\n  \"drug\",\n  \"during\",\n  \"each\",\n  \"early\",\n  \"east\",\n  \"easy\",\n  \"eat\",\n  \"economic\",\n  \"economy\",\n  \"edge\",\n  \"education\",\n  \"effect\",\n  \"effort\",\n  \"eight\",\n  \"either\",\n  \"election\",\n  \"else\",\n  \"employee\",\n  \"end\",\n  \"energy\",\n  \"enjoy\",\n  \"enough\",\n  \"enter\",\n  \"entire\",\n  \"environment\",\n  \"environmental\",\n  \"especially\",\n  \"establish\",\n  \"even\",\n  \"evening\",\n  \"event\",\n  \"ever\",\n  \"every\",\n  \"everybody\",\n  \"everyone\",\n  \"everything\",\n  \"evidence\",\n  \"exactly\",\n  \"example\",\n  \"executive\",\n  \"exist\",\n  \"expect\",\n  \"experience\",\n  \"expert\",\n  \"explain\",\n  \"eye\",\n  \"face\",\n  \"fact\",\n  \"factor\",\n  \"fail\",\n  \"fall\",\n  \"family\",\n  \"far\",\n  \"fast\",\n  \"father\",\n  \"fear\",\n  \"federal\",\n  \"feel\",\n  \"feeling\",\n  \"few\",\n  \"field\",\n  \"fight\",\n  \"figure\",\n  \"fill\",\n  \"film\",\n  \"final\",\n  \"finally\",\n  \"financial\",\n  \"find\",\n  \"fine\",\n  \"finger\",\n  \"finish\",\n  \"fire\",\n  \"firm\",\n  \"first\",\n  \"fish\",\n  \"five\",\n  \"floor\",\n  \"fly\",\n  \"focus\",\n  \"follow\",\n  \"food\",\n  \"foot\",\n  \"for\",\n  \"force\",\n  \"foreign\",\n  \"forget\",\n  \"form\",\n  \"former\",\n  \"forward\",\n  \"four\",\n  \"free\",\n  \"friend\",\n  \"from\",\n  \"front\",\n  \"full\",\n  \"fund\",\n  \"future\",\n  \"game\",\n  \"garden\",\n  \"gas\",\n  \"general\",\n  \"generation\",\n  \"get\",\n  \"girl\",\n  \"give\",\n  \"glass\",\n  \"go\",\n  \"goal\",\n  \"good\",\n  \"government\",\n  \"great\",\n  \"green\",\n  \"ground\",\n  \"group\",\n  \"grow\",\n  \"growth\",\n  \"guess\",\n  \"gun\",\n  \"guy\",\n  \"hair\",\n  \"half\",\n  \"hand\",\n  \"hang\",\n  \"happen\",\n  \"happy\",\n  \"hard\",\n  \"have\",\n  \"he\",\n  \"head\",\n  \"health\",\n  \"hear\",\n  \"heart\",\n  \"heat\",\n  \"heavy\",\n  \"help\",\n  \"her\",\n  \"here\",\n  \"herself\",\n  \"high\",\n  \"him\",\n  \"himself\",\n  \"his\",\n  \"history\",\n  \"hit\",\n  \"hold\",\n  \"home\",\n  \"hope\",\n  \"hospital\",\n  \"hot\",\n  \"hotel\",\n  \"hour\",\n  \"house\",\n  \"how\",\n  \"however\",\n  \"huge\",\n  \"human\",\n  \"hundred\",\n  \"husband\",\n  \"I\",\n  \"idea\",\n  \"identify\",\n  \"if\",\n  \"image\",\n  \"imagine\",\n  \"impact\",\n  \"important\",\n  \"improve\",\n  \"in\",\n  \"include\",\n  \"including\",\n  \"increase\",\n  \"indeed\",\n  \"indicate\",\n  \"individual\",\n  \"industry\",\n  \"information\",\n  \"inside\",\n  \"instead\",\n  \"institution\",\n  \"interest\",\n  \"interesting\",\n  \"international\",\n  \"interview\",\n  \"into\",\n  \"investment\",\n  \"involve\",\n  \"issue\",\n  \"it\",\n  \"item\",\n  \"its\",\n  \"itself\",\n  \"job\",\n  \"join\",\n  \"just\",\n  \"keep\",\n  \"key\",\n  \"kid\",\n  \"kill\",\n  \"kind\",\n  \"kitchen\",\n  \"know\",\n  \"knowledge\",\n  \"land\",\n  \"language\",\n  \"large\",\n  \"last\",\n  \"late\",\n  \"later\",\n  \"laugh\",\n  \"law\",\n  \"lawyer\",\n  \"lay\",\n  \"lead\",\n  \"leader\",\n  \"learn\",\n  \"least\",\n  \"leave\",\n  \"left\",\n  \"leg\",\n  \"legal\",\n  \"less\",\n  \"let\",\n  \"letter\",\n  \"level\",\n  \"lie\",\n  \"life\",\n  \"light\",\n  \"like\",\n  \"likely\",\n  \"line\",\n  \"list\",\n  \"listen\",\n  \"little\",\n  \"live\",\n  \"local\",\n  \"long\",\n  \"look\",\n  \"lose\",\n  \"loss\",\n  \"lot\",\n  \"love\",\n  \"low\",\n  \"machine\",\n  \"magazine\",\n  \"main\",\n  \"maintain\",\n  \"major\",\n  \"majority\",\n  \"make\",\n  \"man\",\n  \"manage\",\n  \"management\",\n  \"manager\",\n  \"many\",\n  \"market\",\n  \"marriage\",\n  \"material\",\n  \"matter\",\n  \"may\",\n  \"maybe\",\n  \"me\",\n  \"mean\",\n  \"measure\",\n  \"media\",\n  \"medical\",\n  \"meet\",\n  \"meeting\",\n  \"member\",\n  \"memory\",\n  \"mention\",\n  \"message\",\n  \"method\",\n  \"middle\",\n  \"might\",\n  \"military\",\n  \"million\",\n  \"mind\",\n  \"minute\",\n  \"miss\",\n  \"mission\",\n  \"model\",\n  \"modern\",\n  \"moment\",\n  \"money\",\n  \"month\",\n  \"more\",\n  \"morning\",\n  \"most\",\n  \"mother\",\n  \"mouth\",\n  \"move\",\n  \"movement\",\n  \"movie\",\n  \"Mr\",\n  \"Mrs\",\n  \"much\",\n  \"music\",\n  \"must\",\n  \"my\",\n  \"myself\",\n  \"name\",\n  \"nation\",\n  \"national\",\n  \"natural\",\n  \"nature\",\n  \"near\",\n  \"nearly\",\n  \"necessary\",\n  \"need\",\n  \"network\",\n  \"never\",\n  \"new\",\n  \"news\",\n  \"newspaper\",\n  \"next\",\n  \"nice\",\n  \"night\",\n  \"no\",\n  \"none\",\n  \"nor\",\n  \"north\",\n  \"not\",\n  \"note\",\n  \"nothing\",\n  \"notice\",\n  \"now\",\n  \"number\",\n  \"occur\",\n  \"of\",\n  \"off\",\n  \"offer\",\n  \"office\",\n  \"officer\",\n  \"official\",\n  \"often\",\n  \"oh\",\n  \"oil\",\n  \"ok\",\n  \"old\",\n  \"on\",\n  \"once\",\n  \"one\",\n  \"only\",\n  \"onto\",\n  \"open\",\n  \"operation\",\n  \"opportunity\",\n  \"option\",\n  \"or\",\n  \"order\",\n  \"organization\",\n  \"other\",\n  \"others\",\n  \"our\",\n  \"out\",\n  \"outside\",\n  \"over\",\n  \"own\",\n  \"owner\",\n  \"page\",\n  \"pain\",\n  \"painting\",\n  \"paper\",\n  \"parent\",\n  \"part\",\n  \"participant\",\n  \"particular\",\n  \"particularly\",\n  \"partner\",\n  \"party\",\n  \"pass\",\n  \"past\",\n  \"patient\",\n  \"pattern\",\n  \"pay\",\n  \"peace\",\n  \"people\",\n  \"per\",\n  \"perform\",\n  \"performance\",\n  \"perhaps\",\n  \"period\",\n  \"person\",\n  \"personal\",\n  \"phone\",\n  \"physical\",\n  \"pick\",\n  \"picture\",\n  \"piece\",\n  \"place\",\n  \"plan\",\n  \"plant\",\n  \"play\",\n  \"player\",\n  \"PM\",\n  \"point\",\n  \"police\",\n  \"policy\",\n  \"political\",\n  \"politics\",\n  \"poor\",\n  \"popular\",\n  \"population\",\n  \"position\",\n  \"positive\",\n  \"possible\",\n  \"power\",\n  \"practice\",\n  \"prepare\",\n  \"present\",\n  \"president\",\n  \"pressure\",\n  \"pretty\",\n  \"prevent\",\n  \"price\",\n  \"private\",\n  \"probably\",\n  \"problem\",\n  \"process\",\n  \"produce\",\n  \"product\",\n  \"production\",\n  \"professional\",\n  \"professor\",\n  \"program\",\n  \"project\",\n  \"property\",\n  \"protect\",\n  \"prove\",\n  \"provide\",\n  \"public\",\n  \"pull\",\n  \"purpose\",\n  \"push\",\n  \"put\",\n  \"quality\",\n  \"question\",\n  \"quickly\",\n  \"quite\",\n  \"race\",\n  \"radio\",\n  \"raise\",\n  \"range\",\n  \"rate\",\n  \"rather\",\n  \"reach\",\n  \"read\",\n  \"ready\",\n  \"real\",\n  \"reality\",\n  \"realize\",\n  \"really\",\n  \"reason\",\n  \"receive\",\n  \"recent\",\n  \"recently\",\n  \"recognize\",\n  \"record\",\n  \"red\",\n  \"reduce\",\n  \"reflect\",\n  \"region\",\n  \"relate\",\n  \"relationship\",\n  \"religious\",\n  \"remain\",\n  \"remember\",\n  \"remove\",\n  \"report\",\n  \"represent\",\n  \"Republican\",\n  \"require\",\n  \"research\",\n  \"resource\",\n  \"respond\",\n  \"response\",\n  \"responsibility\",\n  \"rest\",\n  \"result\",\n  \"return\",\n  \"reveal\",\n  \"rich\",\n  \"right\",\n  \"rise\",\n  \"risk\",\n  \"road\",\n  \"rock\",\n  \"role\",\n  \"room\",\n  \"rule\",\n  \"run\",\n  \"safe\",\n  \"same\",\n  \"save\",\n  \"say\",\n  \"scene\",\n  \"school\",\n  \"science\",\n  \"scientist\",\n  \"score\",\n  \"sea\",\n  \"season\",\n  \"seat\",\n  \"second\",\n  \"section\",\n  \"security\",\n  \"see\",\n  \"seek\",\n  \"seem\",\n  \"sell\",\n  \"send\",\n  \"senior\",\n  \"sense\",\n  \"series\",\n  \"serious\",\n  \"serve\",\n  \"service\",\n  \"set\",\n  \"seven\",\n  \"several\",\n  \"sex\",\n  \"sexual\",\n  \"shake\",\n  \"share\",\n  \"she\",\n  \"shoot\",\n  \"short\",\n  \"shot\",\n  \"should\",\n  \"shoulder\",\n  \"show\",\n  \"side\",\n  \"sign\",\n  \"significant\",\n  \"similar\",\n  \"simple\",\n  \"simply\",\n  \"since\",\n  \"sing\",\n  \"single\",\n  \"sister\",\n  \"sit\",\n  \"site\",\n  \"situation\",\n  \"six\",\n  \"size\",\n  \"skill\",\n  \"skin\",\n  \"small\",\n  \"smile\",\n  \"so\",\n  \"social\",\n  \"society\",\n  \"soldier\",\n  \"some\",\n  \"somebody\",\n  \"someone\",\n  \"something\",\n  \"sometimes\",\n  \"son\",\n  \"song\",\n  \"soon\",\n  \"sort\",\n  \"sound\",\n  \"source\",\n  \"south\",\n  \"southern\",\n  \"space\",\n  \"speak\",\n  \"special\",\n  \"specific\",\n  \"speech\",\n  \"spend\",\n  \"sport\",\n  \"spring\",\n  \"staff\",\n  \"stage\",\n  \"stand\",\n  \"standard\",\n  \"star\",\n  \"start\",\n  \"state\",\n  \"statement\",\n  \"station\",\n  \"stay\",\n  \"step\",\n  \"still\",\n  \"stock\",\n  \"stop\",\n  \"store\",\n  \"story\",\n  \"strategy\",\n  \"street\",\n  \"strong\",\n  \"structure\",\n  \"student\",\n  \"study\",\n  \"stuff\",\n  \"style\",\n  \"subject\",\n  \"success\",\n  \"successful\",\n  \"such\",\n  \"suddenly\",\n  \"suffer\",\n  \"suggest\",\n  \"summer\",\n  \"support\",\n  \"sure\",\n  \"surface\",\n  \"system\",\n  \"table\",\n  \"take\",\n  \"talk\",\n  \"task\",\n  \"tax\",\n  \"teach\",\n  \"teacher\",\n  \"team\",\n  \"technology\",\n  \"television\",\n  \"tell\",\n  \"ten\",\n  \"tend\",\n  \"term\",\n  \"test\",\n  \"than\",\n  \"thank\",\n  \"that\",\n  \"the\",\n  \"their\",\n  \"them\",\n  \"themselves\",\n  \"then\",\n  \"theory\",\n  \"there\",\n  \"these\",\n  \"they\",\n  \"thing\",\n  \"think\",\n  \"third\",\n  \"this\",\n  \"those\",\n  \"though\",\n  \"thought\",\n  \"thousand\",\n  \"threat\",\n  \"three\",\n  \"through\",\n  \"throughout\",\n  \"throw\",\n  \"thus\",\n  \"time\",\n  \"to\",\n  \"today\",\n  \"together\",\n  \"tonight\",\n  \"too\",\n  \"top\",\n  \"total\",\n  \"tough\",\n  \"toward\",\n  \"town\",\n  \"trade\",\n  \"traditional\",\n  \"training\",\n  \"travel\",\n  \"treat\",\n  \"treatment\",\n  \"tree\",\n  \"trial\",\n  \"trip\",\n  \"trouble\",\n  \"true\",\n  \"truth\",\n  \"try\",\n  \"turn\",\n  \"TV\",\n  \"two\",\n  \"type\",\n  \"under\",\n  \"understand\",\n  \"unit\",\n  \"until\",\n  \"up\",\n  \"upon\",\n  \"us\",\n  \"use\",\n  \"usually\",\n  \"value\",\n  \"various\",\n  \"very\",\n  \"victim\",\n  \"view\",\n  \"violence\",\n  \"visit\",\n  \"voice\",\n  \"vote\",\n  \"wait\",\n  \"walk\",\n  \"wall\",\n  \"want\",\n  \"war\",\n  \"watch\",\n  \"water\",\n  \"way\",\n  \"we\",\n  \"weapon\",\n  \"wear\",\n  \"week\",\n  \"weight\",\n  \"well\",\n  \"west\",\n  \"western\",\n  \"what\",\n  \"whatever\",\n  \"when\",\n  \"where\",\n  \"whether\",\n  \"which\",\n  \"while\",\n  \"white\",\n  \"who\",\n  \"whole\",\n  \"whom\",\n  \"whose\",\n  \"why\",\n  \"wide\",\n  \"wife\",\n  \"will\",\n  \"win\",\n  \"wind\",\n  \"window\",\n  \"wish\",\n  \"with\",\n  \"within\",\n  \"without\",\n  \"woman\",\n  \"wonder\",\n  \"word\",\n  \"work\",\n  \"worker\",\n  \"world\",\n  \"worry\",\n  \"would\",\n  \"write\",\n  \"writer\",\n  \"wrong\",\n  \"yard\",\n  \"yeah\",\n  \"year\",\n  \"yes\",\n  \"yet\",\n  \"you\",\n  \"young\",\n  \"your\",\n  \"yourself\",\n];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ mostCommon });\n\n\n//# sourceURL=webpack:///./src/words.js?");

/***/ })

/******/ });