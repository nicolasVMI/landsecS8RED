const cacheName = "landsecXR-v1"

const coreFiles = [
  "/",
  "/fonts/MainBold.otf",
  "/fonts/MainRegular.otf",
  "/fonts/FM-LightWEB.woff",
  "/fonts/FM-LightWEB.woff2",
  "/images/sites/labels/alpha.png",
  "/images/sites/labels/blackfriars.png",
  "/images/sites/labels/borough.png",
  "/images/sites/labels/bridge.png",
  "/images/sites/labels/cannon.png",
  "/images/sites/labels/cathedral.png",
  "/images/sites/labels/forge.png",
  "/images/sites/labels/globe.png",
  "/images/sites/labels/guys.png",
  "/images/sites/labels/iron.png",
  "/images/sites/labels/liberty.png",
  "/images/sites/labels/lion.png",
  "/images/sites/labels/londonBridge.png",
  "/images/sites/labels/mansion.png",
  "/images/sites/labels/monument.png",
  "/images/sites/labels/southwark.png",
  "/images/sites/labels/thomas.png",
  "/images/sites/labels/timber.png",
  "/images/sites/labels/vinegar.png",
  "/images/sites/labels/waterloo.png",
  "/images/headset.webp",
  "/images/tablet.webp",
  "/textures/culture/borough.webp",
  "/textures/culture/cathedral.webp",
  "/textures/culture/globe.webp",
  "/textures/culture/iron.webp",
  "/textures/culture/vinegar.webp",
  "/textures/landsec/mini/bridge_plaza.webp",
  "/textures/landsec/mini/bridge.webp",
  "/textures/landsec/mini/liberty.webp",
  "/textures/landsec/mini/lion_court.webp",
  "/textures/landsec/mini/lion_river.webp",
  "/textures/landsec/mini/lion_terrace.webp",
  "/textures/landsec/mini/timber_int.webp",
  "/textures/landsec/mini/timber.webp",
  "/textures/landsec/square/bridge_500x500.webp",
  "/textures/landsec/square/forge_500x500.webp",
  "/textures/landsec/square/liberty_500x500.webp",
  "/textures/landsec/square/lion_500x500.webp",
  "/textures/landsec/square/timber_500x500.webp",
  "/textures/landsec/bridge_plaza.webp",
  "/textures/landsec/bridge.webp",
  "/textures/landsec/liberty.webp",
  "/textures/landsec/lion_court.webp",
  "/textures/landsec/lion_river.webp",
  "/textures/landsec/lion_terrace.webp",
  "/textures/landsec/timber_int.webp",
  "/textures/landsec/timber.webp",
  "/textures/other/guys.webp",
  "/textures/other/thomas.webp",
  "/textures/transport/blackfriars.webp",
  "/textures/transport/cannon.webp",
  "/textures/transport/londonBridge.webp",
  "/textures/transport/mansion.webp",
  "/textures/transport/monument.webp",
  "/textures/transport/southwark.webp",
  "/textures/transport/waterloo.webp",
  "/192.png",
  "/512.png",
  "/icon.ico",
  "/index.html",
  "/manifest.json",
  "/maskable_icon_x192.png",
  "/maskable_icon_x512.png",
  "/serviceworker.js",
  "/plugin.css",
  "/plugin.js",
  "/plugin.js.map",
]

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(coreFiles)))
})

self.addEventListener("active", (e) => {})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(e.request)
    })
  )
})
