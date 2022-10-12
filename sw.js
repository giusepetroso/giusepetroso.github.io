self.importScripts('./swFiles.js');

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install", filesList);
});
