import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'static-resources';
const matchCallback = ({ request }) => {
    console.log(request);
    return (
        request.destination === 'style' ||
        request.destination === 'script'
    );
};

registerRoute(
    matchCallback,
    new StaleWhileRevalidate({
        cacheName,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'my-image-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);