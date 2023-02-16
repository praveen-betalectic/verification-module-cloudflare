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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  async fetch(request, env, ctx) {\n    // const neptune = require(\"@teurons/neptune-nodejs\");\n    const { pathname } = new URL(request.url);\n    if (pathname == \"/set-verify\") {\n      let data = await request.json();\n\n      let existingData = await env.VERIFICATION_TOKENS.get(data.email);\n\n      if (existingData !== null) {\n        await env.VERIFICATION_TOKENS.delete(data.email);\n      }\n\n      let value = JSON.stringify({\n        token: data.token,\n        created_at: data.created_at,\n        expaires_at: data.expaires_at,\n      });\n\n      await env.VERIFICATION_TOKENS.put(data.email, value);\n\n      let eventType = \"send_verification_token\";\n\n      const payload = JSON.stringify({\n        event_type: eventType,\n        environment: \"dev\",\n        api_token:\n          \"eyJhbGciOiJFZERTQSJ9.eyJleHAiOjE3MDc4Mjg2MzcsInN1YiI6ImFkMmExMDg3LTY5ODktNGNkYi05ZDkwLTAzYWM1OGFkYTYyYiIsImlzcyI6InRlYW0iLCJqdGkiOiI3NWEwNWRiOC1kNjNiLTRlMTctYTk5NC05ZTFjNGJlODUyMGEifQ.iQVbJwb7y2RtZ0pY_xWUQGt6qLuzeml58aBXaR89RRc61-AWRw6UqCBz0fWHuaNQkDfhRYvBcnCdb0p1WhSjBQ\",\n        version: \"1\",\n        data: {\n          otp: data.token,\n        },\n        user_id: \"123-256-33456\",\n        contact_infos: [{ type: \"email\", value: data.email }],\n      });\n\n      var requestOptions = {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: payload,\n      };\n\n      await fetch(\n        \"https://edge.teurons.com/neptune/events/ingest\",\n        requestOptions\n      );\n\n      return new Response(\"verification added successfully\");\n      // return new Response(JSON.stringify(result), {\n      //   headers: {\n      //     \"Content-type\": \"application/json\",\n      //   },\n      // });\n    } else if (pathname == \"/do-verify\") {\n      const params = {};\n      const url = new URL(request.url);\n      const queryString = url.search.slice(1).split(\"&\");\n\n      const dateTime = new Date(\n        new Date().toLocaleString(\"en\", { timeZone: \"Asia/Kolkata\" })\n      );\n\n      queryString.forEach((item) => {\n        const kv = item.split(\"=\");\n        if (kv[0]) params[kv[0]] = kv[1] || true;\n      });\n\n      let data = await env.VERIFICATION_TOKENS.get(params.email);\n      let verificationToken = JSON.parse(data);\n\n      const expTime = new Date(verificationToken.expaires_at);\n\n      if (dateTime < expTime) {\n        if (params.token == verificationToken.token) {\n          return new Response(\"Verification Successfull\");\n        }\n        return new Response(\"Invalid Token\");\n      } else {\n        return new Response(\"Token expired\");\n      }\n    } else {\n      return new Response(\"Route Not Found\");\n    }\n  },\n});\n\n\n//# sourceURL=webpack://verfication_module/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;