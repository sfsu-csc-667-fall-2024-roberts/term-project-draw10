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

/***/ "./src/client/creategame.ts":
/*!**********************************!*\
  !*** ./src/client/creategame.ts ***!
  \**********************************/
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst createGame = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const response = yield fetch(\"/create\", {\n            method: \"POST\",\n            headers: { \"Content-Type\": \"application/json\" },\n        });\n        const data = yield response.json();\n        if (data.success) {\n            alert(\"Game created successfully!\");\n            window.location.href = `/game/${data.gameId}`;\n        }\n        else {\n            alert(`Error: ${data.error}`);\n        }\n    }\n    catch (error) {\n        console.error(\"Error creating game:\", error);\n        alert(\"An unexpected error occurred.\");\n    }\n});\n\n\n//# sourceURL=webpack://team-draw10/./src/client/creategame.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/creategame.ts"]();
/******/ 	
/******/ })()
;/*
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

/***/ "./src/client/creategame.ts":
/*!**********************************!*\
  !*** ./src/client/creategame.ts ***!
  \**********************************/
/***/ (() => {

eval("\nwindow.socket.on(\"game-created\", (game) => {\n    const gamesList = document.querySelector(\"#games-list\");\n    if (!gamesList)\n        return;\n    const gameItem = document.createElement(\"li\");\n    gameItem.textContent = `Game ID: ${game.id}, Players: ${game.players}/${game.player_count}`;\n    const joinButton = document.createElement(\"button\");\n    joinButton.textContent = \"Join Game\";\n    joinButton.onclick = () => (window.location.href = `/game/${game.id}`);\n    gameItem.appendChild(joinButton);\n    gamesList.appendChild(gameItem);\n});\n\n\n//# sourceURL=webpack://team-draw10/./src/client/creategame.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/creategame.ts"]();
/******/ 	
/******/ })()
;