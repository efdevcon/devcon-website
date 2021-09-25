import React from 'react'

const getSchedule = async () => {
  return fetch('https://pretalx.com/api/events/democon/talks/').then(res => res.json().then(data => data.results));
}

export const useSyncSchedule = () => {
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', async (event) => {
        // Optional: ensure the message came from workbox-broadcast-update
        if (event.data.meta === 'workbox-broadcast-update') {
          const {cacheName, updatedUrl} = event.data.payload;

          if (cacheName === 'schedule') {
            const cache = await caches.open(cacheName);
            const updatedResponse = await cache.match(updatedUrl);
            const updatedSchedule = await updatedResponse.json();

            console.log(updatedSchedule, 'CACHE UPDATE')

            setData(updatedSchedule.results);
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