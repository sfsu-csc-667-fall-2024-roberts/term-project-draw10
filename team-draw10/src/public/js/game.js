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

/***/ "./src/client/game.ts":
/*!****************************!*\
  !*** ./src/client/game.ts ***!
  \****************************/
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar _a;\nconst createGame = () => __awaiter(void 0, void 0, void 0, function* () {\n    const gameNameInput = document.querySelector(\"#game-name\");\n    const gamePasswordInput = document.querySelector(\"#game-password\");\n    const maxPlayersInput = document.querySelector(\"#max-players\");\n    if (!gameNameInput || !maxPlayersInput) {\n        console.error(\"Game form elements not found.\");\n        return;\n    }\n    const name = gameNameInput.value.trim();\n    const password = gamePasswordInput === null || gamePasswordInput === void 0 ? void 0 : gamePasswordInput.value.trim();\n    const maxPlayers = parseInt(maxPlayersInput.value, 10);\n    if (!name || !maxPlayers) {\n        alert(\"Game name and maximum players are required.\");\n        return;\n    }\n    try {\n        const response = yield fetch(\"/create\", {\n            method: \"POST\",\n            headers: { \"Content-Type\": \"application/json\" },\n            body: JSON.stringify({ name, password, maxPlayers }),\n        });\n        const data = yield response.json();\n        if (response.ok && data.success) {\n            alert(\"Game created successfully!\");\n            window.location.href = `/game/${data.gameId}`;\n        }\n        else {\n            console.error(\"Error creating game:\", data.error);\n            alert(`Error: ${data.error}`);\n        }\n    }\n    catch (error) {\n        console.error(\"Error creating game:\", error);\n        alert(\"An unexpected error occurred while creating the game.\");\n    }\n});\nconst joinGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const response = yield fetch(`/join/${gameId}`, {\n            method: \"POST\",\n            headers: { \"Content-Type\": \"application/json\" },\n        });\n        if (response.ok) {\n            alert(\"Successfully joined the game!\");\n            window.location.href = `/game/${gameId}`;\n        }\n        else {\n            const data = yield response.json();\n            console.error(\"Error joining game:\", data.error);\n            alert(`Error: ${data.error}`);\n        }\n    }\n    catch (error) {\n        console.error(\"Error joining game:\", error);\n        alert(\"An unexpected error occurred while joining the game.\");\n    }\n});\nwindow.socket.on(\"game-created\", (game) => {\n    const gamesList = document.querySelector(\"#games-list\");\n    if (!gamesList)\n        return;\n    const gameItem = document.createElement(\"li\");\n    gameItem.textContent = `Game ID: ${game.id}, Players: ${game.players}/${game.player_count}`;\n    const joinButton = document.createElement(\"button\");\n    joinButton.textContent = \"Join Game\";\n    joinButton.onclick = () => joinGame(game.id);\n    gameItem.appendChild(joinButton);\n    gamesList.appendChild(gameItem);\n});\nwindow.socket.on(\"player-joined\", ({ playerId, gameId }) => {\n    console.log(`Player ${playerId} joined game ${gameId}.`);\n});\nwindow.socket.on(\"player-draw\", ({ playerId, gameId }) => {\n    console.log(`Player ${playerId} drew a card in game ${gameId}.`);\n});\n(_a = document.querySelector(\"#create-game-form\")) === null || _a === void 0 ? void 0 : _a.addEventListener(\"submit\", (event) => {\n    event.preventDefault();\n    createGame();\n});\n\n\n//# sourceURL=webpack://team-draw10/./src/client/game.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/game.ts"]();
/******/ 	
/******/ })()
;