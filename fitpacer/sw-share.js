// Share target (Android share sheet › FitPacer), loaded by the service worker (vite.config.ts, importScripts).
// The manifest sends shares as a POST (multipart) to ./?share-target: title, text, url and files (a .txt/.md
// file shared from a file manager or a download). The page cannot read a POST body, so the worker keeps what
// was received in the Cache API (key ./__shared, per app: stable and dev share the origin), then sends the
// page to ./?shared=1, which reads it and deletes it (src/main.ts).
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "POST") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.searchParams.has("share-target")) return;
  event.respondWith(
    (async () => {
      const got = { title: "", text: "", url: "", files: [], error: "" };
      try {
        const form = await req.formData();
        for (const k of ["title", "text", "url"]) got[k] = String(form.get(k) || "");
        for (const f of form.getAll("file")) {
          if (typeof f === "string") continue;
          got.files.push({ name: f.name, size: f.size, text: f.size <= 200000 ? await f.text() : "" });
        }
      } catch (e) {
        got.error = String(e);
      }
      const cache = await caches.open("fitpacer-share");
      await cache.put(new URL("./__shared", self.registration.scope).href, new Response(JSON.stringify(got), { headers: { "Content-Type": "application/json" } }));
      return Response.redirect(new URL("./?shared=1", self.registration.scope).href, 303);
    })(),
  );
});
