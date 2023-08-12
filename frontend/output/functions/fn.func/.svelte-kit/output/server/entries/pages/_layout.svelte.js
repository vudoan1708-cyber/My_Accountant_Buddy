import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "header.svelte-17i5zuz.svelte-17i5zuz{display:flex;justify-content:center}nav.svelte-17i5zuz.svelte-17i5zuz{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-17i5zuz.svelte-17i5zuz{width:2em;height:3em;display:block}path.svelte-17i5zuz.svelte-17i5zuz{fill:var(--background)}ul.svelte-17i5zuz.svelte-17i5zuz{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-17i5zuz.svelte-17i5zuz{position:relative;height:100%}li[aria-current='page'].svelte-17i5zuz.svelte-17i5zuz::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--color-theme-1)}nav.svelte-17i5zuz a.svelte-17i5zuz{display:flex;height:100%;align-items:center;padding:0 0.5rem;color:var(--color-text);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-17i5zuz.svelte-17i5zuz:hover{color:var(--color-theme-1)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<header class="svelte-17i5zuz"><nav class="svelte-17i5zuz"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-17i5zuz"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-17i5zuz"></path></svg> <ul class="svelte-17i5zuz"><li${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} class="svelte-17i5zuz"><a href="/" class="svelte-17i5zuz" data-svelte-h="svelte-5a0zws">Home</a></li> <li${add_attribute(
    "aria-current",
    $page.url.pathname === "/calculation" ? "page" : void 0,
    0
  )} class="svelte-17i5zuz"><a href="/calculation" class="svelte-17i5zuz" data-svelte-h="svelte-13ntsfp">Calculation</a></li></ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-17i5zuz"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-17i5zuz"></path></svg></nav> </header>`;
});
const styles = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-8o1gnw.svelte-8o1gnw{display:flex;flex-direction:column;min-height:100vh}main.svelte-8o1gnw.svelte-8o1gnw{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}footer.svelte-8o1gnw.svelte-8o1gnw{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:12px}footer.svelte-8o1gnw a.svelte-8o1gnw{font-weight:bold}@media(min-width: 480px){footer.svelte-8o1gnw.svelte-8o1gnw{padding:12px 0}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app svelte-8o1gnw">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="svelte-8o1gnw">${slots.default ? slots.default({}) : ``}</main> <footer class="svelte-8o1gnw" data-svelte-h="svelte-18hcv4"><p>Visit <a href="https://github.com/vudoan1708-cyber/" target="_blank" class="svelte-8o1gnw">vudoan1708-cyber</a> to learn more about me</p></footer> </div>`;
});
export {
  Layout as default
};
