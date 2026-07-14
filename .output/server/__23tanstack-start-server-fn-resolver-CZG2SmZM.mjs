//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CZG2SmZM.js
var manifest = {
	"1524f235d394817299c5e116757b627c36e499226d4969504214c8475b496eb2": {
		functionName: "adminDelete_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"1f905922289d3294b9272d86822811841cef2a7bbd770d5d1cb05174e3bbc9a3": {
		functionName: "adminCheck_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"3b99fd5d73f39e3419b845b450e346e392ec5705ecd2c4e2cb3dca38dca8e4d7": {
		functionName: "adminSetConfig_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"4058a1f4bce725df20e899585217c33ea453f432f3e4be12b6b2aff955f2d0e5": {
		functionName: "adminUpsertGeneric_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"5260b32302f2abb8ca914d577cdd453040bedd778a1fb3097269b749e16ed5ca": {
		functionName: "adminUpsertProduct_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"6dd6d12753780ea85661fe4a62bcc18127ff613adab92d7b95a1918d7b368474": {
		functionName: "adminLogin_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	},
	"8d334d35bed0729ea6b5bfffb9c8a47f0be775520d75d592d27a29302e244365": {
		functionName: "scrapeQC_createServerFn_handler",
		importer: () => import("./_ssr/server.functions-_fCmN7lp.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
