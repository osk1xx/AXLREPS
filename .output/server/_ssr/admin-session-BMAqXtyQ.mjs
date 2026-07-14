import { n as __toESM } from "../_runtime.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BfDQLD5K.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CZG2SmZM.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as recordType, i as objectType, n as enumType, o as stringType, r as numberType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-session-BMAqXtyQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var adminLogin = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ pin: stringType() }).parse(d)).handler(createSsrRpc("6dd6d12753780ea85661fe4a62bcc18127ff613adab92d7b95a1918d7b368474"));
var adminCheck = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ token: stringType() }).parse(d)).handler(createSsrRpc("1f905922289d3294b9272d86822811841cef2a7bbd770d5d1cb05174e3bbc9a3"));
createServerFn({ method: "POST" }).inputValidator((d) => objectType({ link: stringType() }).parse(d)).handler(createSsrRpc("8d334d35bed0729ea6b5bfffb9c8a47f0be775520d75d592d27a29302e244365"));
var AdminHeader = objectType({ token: stringType() });
var adminUpsertProduct = createServerFn({ method: "POST" }).inputValidator((d) => AdminHeader.extend({ product: objectType({
	id: stringType().uuid().optional(),
	name: stringType().min(1),
	link: stringType().min(1),
	price_cny: numberType().nullable().optional(),
	image_url: stringType().nullable().optional(),
	category: stringType().nullable().optional()
}) }).parse(d)).handler(createSsrRpc("5260b32302f2abb8ca914d577cdd453040bedd778a1fb3097269b749e16ed5ca"));
var adminDelete = createServerFn({ method: "POST" }).inputValidator((d) => AdminHeader.extend({
	table: enumType([
		"products",
		"tutorials",
		"tutorial_steps",
		"sellers"
	]),
	id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("1524f235d394817299c5e116757b627c36e499226d4969504214c8475b496eb2"));
var adminUpsertGeneric = createServerFn({ method: "POST" }).inputValidator((d) => AdminHeader.extend({
	table: enumType([
		"sellers",
		"tutorials",
		"tutorial_steps"
	]),
	row: recordType(stringType(), anyType())
}).parse(d)).handler(createSsrRpc("4058a1f4bce725df20e899585217c33ea453f432f3e4be12b6b2aff955f2d0e5"));
var adminSetConfig = createServerFn({ method: "POST" }).inputValidator((d) => AdminHeader.extend({
	key: stringType(),
	value: anyType()
}).parse(d)).handler(createSsrRpc("3b99fd5d73f39e3419b845b450e346e392ec5705ecd2c4e2cb3dca38dca8e4d7"));
var KEY = "osk_admin_token";
function getAdminToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(KEY);
}
function setAdminToken(t) {
	localStorage.setItem(KEY, t);
}
function clearAdminToken() {
	localStorage.removeItem(KEY);
}
//#endregion
export { adminUpsertGeneric as a, getAdminToken as c, adminSetConfig as i, setAdminToken as l, adminDelete as n, adminUpsertProduct as o, adminLogin as r, clearAdminToken as s, adminCheck as t, useServerFn as u };
