globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/admin-session-DslIhPv3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1661-NZZ7/vXDNIlz8x8aS+W+pqALKAg\"",
		"mtime": "2026-07-14T19:07:26.234Z",
		"size": 5729,
		"path": "../public/assets/admin-session-DslIhPv3.js"
	},
	"/assets/admin.index-DJs5OLHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bf1-biCJdeHR5+WyKXYrXccn4rB/k6w\"",
		"mtime": "2026-07-14T19:07:26.247Z",
		"size": 27633,
		"path": "../public/assets/admin.index-DJs5OLHR.js"
	},
	"/assets/admin.login-DfFWmLtM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d6-57s0rNOKE2Yss856xE63gENemxk\"",
		"mtime": "2026-07-14T19:07:26.257Z",
		"size": 1494,
		"path": "../public/assets/admin.login-DfFWmLtM.js"
	},
	"/assets/categories-Dnw0vCHH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c6-6qUabkKkQiIrnMt8WXfmittJVD4\"",
		"mtime": "2026-07-14T19:07:26.277Z",
		"size": 454,
		"path": "../public/assets/categories-Dnw0vCHH.js"
	},
	"/assets/createClientRpc-Bpi3rywN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bb3-Dpm5lswRIX/bGBs6OtzHp7futDE\"",
		"mtime": "2026-07-14T19:07:26.279Z",
		"size": 31667,
		"path": "../public/assets/createClientRpc-Bpi3rywN.js"
	},
	"/assets/index-DqIaiM0Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"79e52-xFwY+ygMqXKCi2xQxzWMP72jF0w\"",
		"mtime": "2026-07-14T19:07:26.210Z",
		"size": 499282,
		"path": "../public/assets/index-DqIaiM0Y.js"
	},
	"/assets/jsx-runtime-bzQ4Vb5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d8-vMfP+4a4ykIjbw4InHkj3E5HWt0\"",
		"mtime": "2026-07-14T19:07:26.284Z",
		"size": 8408,
		"path": "../public/assets/jsx-runtime-bzQ4Vb5N.js"
	},
	"/assets/legal-0ZP5FT6r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba-IeWZ1Gp9f5l2uZB5zYb3kQM5ABI\"",
		"mtime": "2026-07-14T19:07:26.303Z",
		"size": 442,
		"path": "../public/assets/legal-0ZP5FT6r.js"
	},
	"/assets/link-DAj9DqUe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65a3-d7UJU32BbHaIK0ffdkCEoEcmMZc\"",
		"mtime": "2026-07-14T19:07:26.304Z",
		"size": 26019,
		"path": "../public/assets/link-DAj9DqUe.js"
	},
	"/assets/ProductCard-9DNeA_0K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65c-+adGkgGVUXQ4+UMvHExMnSGpVEg\"",
		"mtime": "2026-07-14T19:07:26.217Z",
		"size": 1628,
		"path": "../public/assets/ProductCard-9DNeA_0K.js"
	},
	"/assets/products-Bi7BKI-R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111a-GUXimV5cG/zfjhBkgd+ykwvUdXU\"",
		"mtime": "2026-07-14T19:07:26.316Z",
		"size": 4378,
		"path": "../public/assets/products-Bi7BKI-R.js"
	},
	"/assets/qc-pOFBvIP6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4a-LK8CmKQ/lK+7A3ECCyRbpbAxEYE\"",
		"mtime": "2026-07-14T19:07:26.321Z",
		"size": 3914,
		"path": "../public/assets/qc-pOFBvIP6.js"
	},
	"/assets/routes-Bww5AyDR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f50-cTuvGZ52h7DfhqkF6EBaPadpKbU\"",
		"mtime": "2026-07-14T19:07:26.325Z",
		"size": 3920,
		"path": "../public/assets/routes-Bww5AyDR.js"
	},
	"/assets/styles-D0ncRG0g.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"94e6-zcpv5vS10a265qJf2krSYzRAncE\"",
		"mtime": "2026-07-14T19:07:26.379Z",
		"size": 38118,
		"path": "../public/assets/styles-D0ncRG0g.css"
	},
	"/assets/sellers.index-DzMkzTeI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"763-arfmy6MLKiWdGdM9Z2yAUxi2Syk\"",
		"mtime": "2026-07-14T19:07:26.334Z",
		"size": 1891,
		"path": "../public/assets/sellers.index-DzMkzTeI.js"
	},
	"/assets/sellers._slug-uYoXFAfb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c3-za+PF5M/DSMDNOpZE94cdnsGIB4\"",
		"mtime": "2026-07-14T19:07:26.330Z",
		"size": 1987,
		"path": "../public/assets/sellers._slug-uYoXFAfb.js"
	},
	"/assets/Skeleton-CvEpoX7G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15b-06tf0fXQs08QnYN3J6vv/s4I+7s\"",
		"mtime": "2026-07-14T19:07:26.231Z",
		"size": 347,
		"path": "../public/assets/Skeleton-CvEpoX7G.js"
	},
	"/assets/text-CjLc2j9h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-/syfdzqhna724Uclxm8xC8CIJzk\"",
		"mtime": "2026-07-14T19:07:26.338Z",
		"size": 143,
		"path": "../public/assets/text-CjLc2j9h.js"
	},
	"/assets/useNavigate-BRisgksT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2da-xDPnewipYYkXzKjNdm6pSuPazME\"",
		"mtime": "2026-07-14T19:07:26.357Z",
		"size": 730,
		"path": "../public/assets/useNavigate-BRisgksT.js"
	},
	"/assets/useRouter-CGK8is6s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb-1lrKKmXmIBjE6c6cpF30l46NtzY\"",
		"mtime": "2026-07-14T19:07:26.363Z",
		"size": 203,
		"path": "../public/assets/useRouter-CGK8is6s.js"
	},
	"/assets/useTranslation-BSHa8nyu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1448-cVvJX/r3u+eppq8XPiXfOnmCR4A\"",
		"mtime": "2026-07-14T19:07:26.364Z",
		"size": 5192,
		"path": "../public/assets/useTranslation-BSHa8nyu.js"
	},
	"/assets/wtyczka-CipKmGHL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c40-EPFeSotL/cueynxe0jxrW/8ZcgM\"",
		"mtime": "2026-07-14T19:07:26.373Z",
		"size": 7232,
		"path": "../public/assets/wtyczka-CipKmGHL.js"
	},
	"/assets/tracking-C82YfgO1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"740-b5zJBfIezu+t/YccMZfOVlQHiD0\"",
		"mtime": "2026-07-14T19:07:26.341Z",
		"size": 1856,
		"path": "../public/assets/tracking-C82YfgO1.js"
	},
	"/assets/tutorials.index-fHjZwlmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68d-uGgtaRAO6/9bTDa5Z0oV9BxgEgU\"",
		"mtime": "2026-07-14T19:07:26.351Z",
		"size": 1677,
		"path": "../public/assets/tutorials.index-fHjZwlmZ.js"
	},
	"/assets/tutorials._slug-CTPhbjZo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a65-wHXkTCGqB/FiLY+Kn3unNrygOAc\"",
		"mtime": "2026-07-14T19:07:26.345Z",
		"size": 2661,
		"path": "../public/assets/tutorials._slug-CTPhbjZo.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_choki_1f1b06430b106fb7bf1ae7986acfc40e/node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_bCc8Jq = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_bCc8Jq
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_choki_1f1b06430b106fb7bf1ae7986acfc40e/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_choki_1f1b06430b106fb7bf1ae7986acfc40e/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_choki_1f1b06430b106fb7bf1ae7986acfc40e/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_choki_1f1b06430b106fb7bf1ae7986acfc40e/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
