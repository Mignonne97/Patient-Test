/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE_NAME = `cache-${version}`;
const API_CACHE_NAME = `api-cache-${version}`;
const CHUNK_SIZE = 1000; // Adjust chunk size based on your needs
const MAX_CACHE_SIZE = 10000; // Adjust maximum cache size based on your needs
const MAX_API_CACHE_SIZE = 10; 

// Helper function to split assets into chunks
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Split assets into manageable chunks
const ASSETS = [
  ...build,
  ...files
];
const CHUNKED_ASSETS = chunkArray(ASSETS, CHUNK_SIZE);

self.addEventListener('install', (event) => {
 // console.log('install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const chunk of CHUNKED_ASSETS) {
        await cache.addAll(chunk);
      }
    })
  );
});

self.addEventListener('activate', (event) => {
 // console.log('Activate event fired');
  
  event.waitUntil(
    caches.keys().then((keys) => {
   //   console.log('Caches keys:', keys);
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== API_CACHE_NAME) {
       //     console.log('Deleting cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
     // console.log('Cache cleanup completed');
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.keys().then((keys) => {
        //  console.log('Current cache keys:', keys);
          if (keys.length > MAX_CACHE_SIZE) {
            const oldestKey = keys[0];
          //  console.log('Deleting oldest cache key:', oldestKey.url);
            return cache.delete(oldestKey);
          }
        });
      });
    }).catch((error) => {
   //   console.error('Error during activation:', error);
    })
  );
});


self.addEventListener('fetch', (event) => {
  //console.log('fetch event');
  if (event.request.method === 'GET') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(event.request);
          // Cache the response if it's valid
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          if (event.request.url.includes('/api/')) {
            const apiCache = await caches.open(API_CACHE_NAME);
            return apiCache.match(event.request) || new Response('No data available offline', { status: 503 });
          }
          return new Response('Network error', { status: 500 });
        }
      })()
    );
  }
});