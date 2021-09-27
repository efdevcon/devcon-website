import React from 'react'

const endpoint = 'http://localhost:9000/api/cache-test'; // 'https://pretalx.com/api/events/democon/talks/';

const getSchedule = async () => {
  return fetch(endpoint).then(res => res.json()); //.then(data => data.results));
}

export const useSyncSchedule = () => {
  const [data, setData] = React.useState('default');
  
  React.useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        console.log('message');

        // Optional: ensure the message came from workbox-broadcast-update
        if (event.data.meta === 'workbox-broadcast-update') {
          const {cacheName, updatedUrl} = event.data.payload;

          console.log(cacheName, 'cache name')

          if (cacheName === 'schedule') {
            const cache = await caches.open(cacheName);
            const updatedResponse = await cache.match(updatedUrl);
            const updatedSchedule = await updatedResponse.json();

            console.log(updatedSchedule, 'CACHE UPDATE')

            setData(updatedSchedule);
          }
        }
      });
    }
  }, []);

  React.useEffect(() => {
    getSchedule().then(setData).catch(console.error);
  }, []);

  console.log(data, 'schedule data');

  return data;
}