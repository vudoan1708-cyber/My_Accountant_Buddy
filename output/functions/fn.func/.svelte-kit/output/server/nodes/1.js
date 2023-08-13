

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0e2977e7.js","_app/immutable/chunks/scheduler.41cd6b98.js","_app/immutable/chunks/index.7611e368.js","_app/immutable/chunks/stores.e18e8fee.js","_app/immutable/chunks/singletons.32e13568.js"];
export const stylesheets = [];
export const fonts = [];
