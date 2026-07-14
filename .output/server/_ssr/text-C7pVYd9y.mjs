//#region node_modules/.nitro/vite/services/ssr/assets/text-C7pVYd9y.js
function pickLang(field, lang, fallback = "pl") {
	if (!field) return "";
	if (typeof field === "string") return field;
	const obj = field;
	return obj[lang] || obj[fallback] || Object.values(obj).find((v) => v) || "";
}
//#endregion
export { pickLang as t };
