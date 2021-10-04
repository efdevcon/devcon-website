import React from 'react'

const endpoint = 'http://localhost:9000/api/cache-test'; // 'https://pretalx.com/api/events/democon/talks/';

const fetchSchedule = () => {
  return fetch(endpoint);
}

const parseResponse = (response: Response) => {
  return response.json();
}

export const useSyncSchedule = () => {
  const [data, setData] = React.useState('default');
  
  React.useEffect(() => {
    if (navigator.serviceWorker) {
      const updateChannel = new window.BroadcastChannel('schedule-updates');

      const handler = async (event: any) => {
        console.log(event, 'message received')
        if (event.data.meta === 'workbox-broadcast-update') {
          const {cacheName, updatedURL } = event.data.payload;

          console.log(cacheName, updatedURL, 'cache name')

          if (cacheName === 'schedule') {
            const cache = await caches.open(cacheName);
            const updatedResponse = await cache.match(updatedURL) as Response;
            
            // const updatedSchedule = await parseResponse(updatedResponse);

            console.log(updatedResponse, 'updated response');

            // console.log(updatedSchedule, 'CACHE UPDATE')

            parseResponse(updatedResponse).then(setData).catch(console.error);
          }
        }
      };

      // BroadcastChannel
      updateChannel.addEventListener('message', handler);

      // postMessage (fallback for broadcast channel not supported on safari - workbox falls back to this)
      navigator.serviceWorker.addEventListener('message', handler);

      return () => {
        updateChannel.removeEventListener('message', handler);

        // postMessage (fallback for broadcast channel not supported on safari - workbox falls back to this)
        navigator.serviceWorker.removeEventListener('message', handler);
      }
    }
  }, []);

  React.useEffect(() => {
    fetchSchedule().then(parseResponse).then(setData).catch(console.error);
  }, []);

  console.log(data, 'schedule data');

  return data;
}