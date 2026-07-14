import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LitBuyLogo-D5ELNQH3.js
var import_jsx_runtime = require_jsx_runtime();
var KAKOBUY_LOGO_URL = { url: "/src/assets/kakobuy-logo.png" }.url;
function KakobuyLogo({ size = 22, className = "", invert = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: KAKOBUY_LOGO_URL,
		alt: "KakoBuy",
		width: size,
		height: size,
		className: `inline-block object-contain ${invert ? "invert" : ""} ${className}`,
		style: {
			height: size,
			width: "auto"
		}
	});
}
//#endregion
export { KakobuyLogo as t };
