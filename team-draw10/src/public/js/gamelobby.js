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

/***/ "./src/client/gamelobby.ts":
/*!*********************************!*\
  !*** ./src/client/gamelobby.ts ***!
  \*********************************/
/***/ (() => {

eval("\nwindow.socket.on(\"game-starting\", () => {\n    const roomId = window.roomId;\n    if (!roomId) {\n        console.error(\"Room ID is not available. Unable to redirect.\");\n        return;\n    }\n    window.location.href = `/games/${roomId}`;\n});\nwindow.socket.on(\"player-joined\", ({ username, email, gravatar }) => {\n    if (!username || !email || !gravatar) {\n        console.warn(\"Received incomplete player data:\", { username, email, gravatar });\n        return;\n    }\n    console.log(\"Player joined!\", { username, email, gravatar });\n    const playerList = document.querySelector(\"#player-list\");\n    if (playerList) {\n        const playerElement = document.createElement(\"li\");\n        playerElement.classList.add(\"player-item\");\n        playerElement.innerHTML = `\n        <img\n          src=\"https://www.gravatar.com/avatar/${gravatar}\"\n          alt=\"${username}'s avatar\"\n          class=\"player-avatar\"\n        />\n        <span class=\"player-username\">${username}</span>\n        <span class=\"player-email\">${email}</span>\n      `;\n        playerList.appendChild(playerElement);\n    }\n    else {\n        console.warn(\"Player list element not found. Unable to update the UI.\");\n    }\n});\n\n\n//# sourceURL=webpack://team-draw10/./src/client/gamelobby.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/gamelobby.ts"]();
/******/ 	
/******/ })()
;