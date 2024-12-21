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

/***/ "./src/client/chat.ts":
/*!****************************!*\
  !*** ./src/client/chat.ts ***!
  \****************************/
/***/ (function() {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const form = document.querySelector(\"#chat-form\");\n    const input = document.querySelector(\"#chat-input\");\n    const messageArea = document.querySelector(\"#chat-messages\");\n    if (!form || !input || !messageArea) {\n        console.error(\"Chat form elements not found.\");\n        return;\n    }\n    // Handle form submission to send messages\n    form.addEventListener(\"submit\", (event) => __awaiter(void 0, void 0, void 0, function* () {\n        event.preventDefault();\n        const message = input.value.trim();\n        input.value = \"\";\n        if (!message) {\n            console.error(\"Message cannot be empty.\");\n            return;\n        }\n        try {\n            const response = yield fetch(`/chat/${window.roomId}`, {\n                method: \"POST\",\n                headers: { \"Content-Type\": \"application/json\" },\n                body: JSON.stringify({ message }),\n            });\n            if (!response.ok) {\n                const error = yield response.json();\n                console.error(\"Error sending message:\", error.error || \"Unknown error\");\n            }\n        }\n        catch (error) {\n            console.error(\"Failed to send message:\", error);\n        }\n    }));\n    // Listen for incoming chat messages via WebSocket\n    window.socket.on(`message:${window.roomId}`, ({ message, sender, gravatar, timestamp, }) => {\n        const messageElement = document.createElement(\"div\");\n        messageElement.classList.add(\"chat-message\");\n        messageElement.innerHTML = `\n        <img src=\"https://www.gravatar.com/avatar/${gravatar}\" alt=\"${sender}\" class=\"chat-avatar\" />\n        <div class=\"chat-content\">\n          <strong>${sender}</strong>\n          <p>${message}</p>\n          <span class=\"chat-timestamp\">${new Date(timestamp).toLocaleTimeString()}</span>\n        </div>\n      `;\n        messageArea.appendChild(messageElement);\n        messageArea.scrollTo(0, messageArea.scrollHeight); // Scroll to the bottom\n    });\n});\n\n\n//# sourceURL=webpack://team-draw10/./src/client/chat.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/chat.ts"]();
/******/ 	
/******/ })()
;