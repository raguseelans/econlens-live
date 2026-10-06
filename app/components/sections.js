// The section nav (shown on every page), the landing page, and the page for a section that is not built yet.
import { esc } from "../util.js";
import { sectionHref } from "../router.js";

export function renderSectionNav(ctx, current) {
  const nav = document.getElementById("sections");
  nav.setAttribute("aria-label", ctx.cur.label("sections_nav"));
  nav.innerHTML = ctx.cur.sections
    .map(
      (s) =>
        `<a href="${sectionHref(s.key)}"${s.key === current ? ' aria-current="page"' : ""}>${esc(s.label)}</a>`,
    )
    .join("");
}

export function renderLanding(ctx) {
  const site = ctx.cur.config.site;
  document.body.dataset.colour = "";
  ctx.renderTeacherBar(null);
  document.getElementById("app").innerHTML =
    `<div class="dash" style="padding-top:0"><div class="intro"><h1 class="landing-title">${esc(site.landing_title)}</h1><p>${esc(site.landing_intro)}</p></div>` +
    '<div class="picker sections-grid" style="margin-top:1.4rem">' +
    ctx.cur.sections
      .map(
        (s) =>
          `<article class="pick"><h2><a href="${sectionHref(s.key)}">${esc(s.label)}</a></h2><p>${esc(s.blurb)}</p></article>`,
      )
      .join("") +
    "</div></div>";
  document.title = `${site.name}: ${site.landing_title}`;
}

export function renderSoon(ctx, key) {
  const section = ctx.cur.section(key);
  document.body.dataset.colour = "";
  ctx.renderTeacherBar(null);
  document.getElementById("app").innerHTML =
    `<div class="dash" style="padding-top:0"><div class="intro"><h1>${esc(section.label)}</h1><p>${esc(section.blurb)}</p></div>` +
    `<p class="eyebrow" style="margin-top:2rem">${esc(ctx.cur.label("section_soon"))}</p>` +
    `<p class="empty">${esc(ctx.cur.label("section_soon_note"))}</p>` +
    `<p><a href="${sectionHref("")}">${esc(ctx.cur.label("back_to_sections"))}</a></p></div>`;
  document.title = `${section.label} | ${ctx.cur.config.site.name}`;
}
