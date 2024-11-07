if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker Registered 002'))
    .catch((error) => console.log('Service Worker Registration Failed', error));
}
