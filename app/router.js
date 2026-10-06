// Hash routes: "#/" is the landing page, "#/<section>" is one of the sections (apply, learn, ...),
// "#/a/<id>" is an article. The section keys come from the curriculum config, so the caller passes them in.

export function currentRoute(sectionKeys) {
  const art = /^#\/a\/(.+)$/.exec(location.hash);
  if (art) return { name: "article", id: decodeURIComponent(art[1]) };
  const sec = /^#\/([a-z]+)$/.exec(location.hash);
  if (sec && (!sectionKeys || sectionKeys.includes(sec[1]))) {
    return { name: "section", key: sec[1] };
  }
  return { name: "landing" };
}

export function articleHref(id) {
  return "#/a/" + encodeURIComponent(id);
}

export function sectionHref(key) {
  return "#/" + key;
}

export function onRouteChange(fn) {
  window.addEventListener("hashchange", () => {
    fn();
    window.scrollTo(0, 0);
  });
}
