// Start-up: load the config and index, then draw whichever page the address asks for.
import * as store from "./store.js";
import { makeCurriculum } from "./curriculum.js";
import { currentRoute, onRouteChange } from "./router.js";
import { initMode } from "./theme.js";
import { esc } from "./util.js";
import { renderAccount, initLogin } from "./components/chrome.js";
import { renderTeacherBar } from "./components/teacher.js";
import { renderHome } from "./components/home.js";
import { renderSectionNav, renderLanding, renderSoon } from "./components/sections.js";
import { renderArticle } from "./components/article.js";

const ctx = {
  store,
  cur: null,
  isTeacher: () => store.isTeacher(),
  render: () => render(),
  rerender: () => render(),
  renderTeacherBar: (art) => renderTeacherBar(ctx, art),
};

async function render() {
  const route = currentRoute(ctx.cur.sections.map((s) => s.key));
  document.body.dataset.colour = "";
  renderAccount(ctx);
  renderSectionNav(ctx, route.name === "article" ? "apply" : route.key);
  if (route.name === "article") await renderArticle(ctx, route.id);
  else if (route.name === "landing") renderLanding(ctx);
  else if (route.key === "apply") renderHome(ctx);
  else renderSoon(ctx, route.key);
}

async function start() {
  initMode();
  try {
    await store.init();
    ctx.cur = makeCurriculum(store.state.config);
  } catch (e) {
    document.getElementById("app").innerHTML =
      `<div class="dash"><p class="empty">${esc(e.message || "The articles could not be loaded. Please refresh the page.")}</p></div>`;
    return;
  }
  const site = ctx.cur.config.site;
  const [, first, second] = /^([A-Z][a-z]+)([A-Z].*)$/.exec(site.name) || [, site.name, ""];
  document.querySelector(".brand").innerHTML =
    `<span class="wordmark">${esc(first)}<b>${esc(second)}</b></span><span class="tag-line">${esc(site.tagline)}</span>`;
  initLogin(ctx);
  onRouteChange(render);
  render();
}

start();
