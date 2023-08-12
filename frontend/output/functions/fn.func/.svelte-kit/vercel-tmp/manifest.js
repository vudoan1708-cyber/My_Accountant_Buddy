export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.af089409.js","app":"_app/immutable/entry/app.10e2c674.js","imports":["_app/immutable/entry/start.af089409.js","_app/immutable/chunks/scheduler.41cd6b98.js","_app/immutable/chunks/singletons.32e13568.js","_app/immutable/entry/app.10e2c674.js","_app/immutable/chunks/scheduler.41cd6b98.js","_app/immutable/chunks/index.7611e368.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
