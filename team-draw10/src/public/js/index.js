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

/***/ "./src/client/games/create-player-elements.ts":
/*!****************************************************!*\
  !*** ./src/client/games/create-player-elements.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createPlayerElement = void 0;\nconst get_card_value_1 = __webpack_require__(/*! ./get-card-value */ \"./src/client/games/get-card-value.ts\");\nconst update_pile_1 = __webpack_require__(/*! ./update-pile */ \"./src/client/games/update-pile.ts\");\nconst playerTemplate = document.querySelector(\"#player-template\");\nconst cardTemplate = document.querySelector(\"#card-template\");\nconst createPlayerElement = ({ username, gravatar, \n// is_current,\nhand, play_pile_top, play_pile_top_id, play_pile_count, pile_1, pile_2, pile_3, pile_4, }) => {\n    const playerElement = playerTemplate.content.cloneNode(true);\n    // if (is_current) {\n    //   playerElement.firstElementChild?.classList.add(\"current-player\");\n    // }\n    // Update gravatar\n    const gravatarElement = playerElement.querySelector(\"h4 img\");\n    gravatarElement.src = `https://www.gravatar.com/avatar/${gravatar}`;\n    gravatarElement.alt = username;\n    // Update username\n    playerElement.querySelector(\"h4 span.username\").textContent = username;\n    playerElement.querySelector(\"h4 span.card-count\").textContent =\n        `${play_pile_count} cards`;\n    // Update hand\n    const handElement = playerElement.querySelector(\".hand\");\n    hand === null || hand === void 0 ? void 0 : hand.forEach((card) => {\n        const cardElement = cardTemplate.content.cloneNode(true);\n        const cardDiv = cardElement.querySelector(\"div.card\");\n        cardDiv.classList.add(`value-${card.value}`, \"source-card\");\n        cardDiv.dataset.cardId = card.id.toString();\n        cardElement.querySelector(\"span\").textContent = (0, get_card_value_1.getCardValue)(card.value);\n        handElement.appendChild(cardElement);\n    });\n    const topCard = cardTemplate.content.cloneNode(true);\n    const topCardDiv = topCard.querySelector(\"div.card\");\n    topCardDiv.classList.add(`value-${play_pile_top}`, \"source-card\");\n    topCardDiv.dataset.cardId = play_pile_top_id.toString();\n    topCard.querySelector(\"span\").textContent = (0, get_card_value_1.getCardValue)(play_pile_top);\n    playerElement\n        .querySelector(\".player-pile-0\")\n        .replaceChildren(topCard);\n    (0, update_pile_1.updatePile)(pile_1, \".player-pile-1\", playerElement);\n    (0, update_pile_1.updatePile)(pile_2, \".player-pile-2\", playerElement);\n    (0, update_pile_1.updatePile)(pile_3, \".player-pile-3\", playerElement);\n    (0, update_pile_1.updatePile)(pile_4, \".player-pile-4\", playerElement);\n    return playerElement;\n};\nexports.createPlayerElement = createPlayerElement;\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/create-player-elements.ts?");

/***/ }),

/***/ "./src/client/games/get-card-value.ts":
/*!********************************************!*\
  !*** ./src/client/games/get-card-value.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getCardValue = void 0;\nconst getCardValue = (value) => {\n    if (value === 0) {\n        return \"error\";\n    }\n    else {\n        return value.toString();\n    }\n};\nexports.getCardValue = getCardValue;\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/get-card-value.ts?");

/***/ }),

/***/ "./src/client/games/index.ts":
/*!***********************************!*\
  !*** ./src/client/games/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateGame = void 0;\nvar update_game_1 = __webpack_require__(/*! ./update-game */ \"./src/client/games/update-game.ts\");\nObject.defineProperty(exports, \"updateGame\", ({ enumerable: true, get: function () { return update_game_1.updateGame; } }));\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/index.ts?");

/***/ }),

/***/ "./src/client/games/update-game.ts":
/*!*****************************************!*\
  !*** ./src/client/games/update-game.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateGame = void 0;\nconst create_player_elements_1 = __webpack_require__(/*! ./create-player-elements */ \"./src/client/games/create-player-elements.ts\");\nconst playerArea = document.querySelector(\"#player-area\");\nconst opponentArea = document.querySelector(\"#opponent-area\");\nconst updateGame = (game) => {\n    console.log(game);\n    playerArea.replaceChildren((0, create_player_elements_1.createPlayerElement)(game.player));\n    opponentArea.replaceChildren(...game.players.map((player) => {\n        return (0, create_player_elements_1.createPlayerElement)(player);\n    }));\n};\nexports.updateGame = updateGame;\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/update-game.ts?");

/***/ }),

/***/ "./src/client/games/update-pile.ts":
/*!*****************************************!*\
  !*** ./src/client/games/update-pile.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updatePile = void 0;\nconst get_card_value_1 = __webpack_require__(/*! ./get-card-value */ \"./src/client/games/get-card-value.ts\");\nconst cardTemplate = document.querySelector(\"#card-template\");\nconst BLANK_CARD = cardTemplate.content.cloneNode(true);\nBLANK_CARD.querySelector(\"div.card\").classList.add(\"blank\", \"destination-card\");\nconst updatePile = (pile, selector, element) => {\n    const pileElement = element.querySelector(selector);\n    if (pile.length === 0) {\n        pileElement.replaceChildren(BLANK_CARD.cloneNode(true));\n    }\n    else {\n        pileElement.replaceChildren(...pile.map((value) => {\n            const cardElement = cardTemplate.content.cloneNode(true);\n            cardElement\n                .querySelector(\"div.card\")\n                .classList.add(`value-${value}`, \"destination-card\");\n            cardElement.querySelector(\"span\").textContent = (0, get_card_value_1.getCardValue)(value);\n            return cardElement;\n        }));\n    }\n};\nexports.updatePile = updatePile;\n\n\n//# sourceURL=webpack://team-draw10/./src/client/games/update-pile.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/games/index.ts");
/******/ 	
/******/ })()
;