/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/games/card-click-handler.ts":
/*!************************************************!*\
  !*** ./src/client/games/card-click-handler.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.cardClickHandler = void 0;\nconst cardClickHandler = (event) => {\n    const card = event.target;\n    if (card.classList.contains(\"card\") &&\n        card.classList.contains(\"source-card\")) {\n        event.preventDefault();\n        console.log(\"source card clicked\", { card });\n    }\n    else if (card.classList.contains(\"card\") &&\n        card.classList.contains(\"destination-card\")) {\n        event.preventDefault();\n    }\n};\nexports.cardClickHandler = cardClickHandler;\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/card-click-handler.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/games/card-click-handler.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;