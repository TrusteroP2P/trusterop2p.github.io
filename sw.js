var cacheAll = true;
var CACHE_NAME = 'webapk-cache';
var urlsToCache = [
    // Add any URLs that need to be cached initially
	//'./index.html',
	//'./mainSW.js',
	//'./jquery.min.js',
	//'./logo.png',
	//'./favicon.png',
	//'./Pidgeon.png',
	//'./manifest.json',	
	//'./ellipticcurve.js',
	//'./crypto-sha256.js',
	//'./jsbn.js',
	//'./aes.js',
	//'./crypto-js.js',
	//'./cryptico.min.js',
	//'./purify.js',
	//'./ipfs.js',
	//'./index.js',
	//'./firebase.js',
	//'./peerjs.min.js',
	//'./torrent.js',
	//'./room.js',
	//'./crypto.js',
	//'./simplepeer.js',
	//'./simplepeer.min.js',
	//'./utils.js',
	//'./rsa.js',
	//'./random.js',
	//'./hash.js',
	//'./api.js',
	//'./sw.js',
];

var urlsNotToCache = [
    // Explicit URLs that you don't want to cache
];

// Install Event
self.addEventListener('install', function(event) {
    console.log("[SW] install event: ", event);
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[SW] Opened cache: ', cache);
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Event
self.addEventListener('fetch', function(event) {
    //console.log("[SW] Fetch event: ", event.request.url);
    // Just pass through the request without caching
    //event.respondWith(fetch(event.request));
});

// Push Event - Triggered when a push notification is received
self.addEventListener('push', function(event) {
    var data = event.data ? event.data.json() : { title: 'Notification', body: 'Trustero notification.' };

    var options = {
        body: data.body,
        icon: '/logo.png', // Optional icon for notification
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification Click Event - Handle click on the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        //clients.openWindow('') // URL to open on click
    );
});