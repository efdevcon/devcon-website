import { useState, useLayoutEffect } from 'react';
// import throttle from 'src/utils/throttle';

const getElementHeight = (elementID: string) => {
  const element = document && document.getElementById(elementID);

  return element?.clientHeight || 0;
}

// Returns the height of an element by ID
// Assumes the target element is rendered
export default (elementID: string) => {
  const [elementHeight, setElementHeight] = useState(getElementHeight(elementID));

  useLayoutEffect(() => {
    const determineHeight = () => {
      const nextElementHeight = getElementHeight(elementID);

      if (nextElementHeight) setElementHeight(nextElementHeight);
    };

    // Set initial height (on component mount)
    determineHeight();

    // Keep height in sync when browser resizes
    window.addEventListener('resize', determineHeight);

    return () => {
      window.removeEventListener('resize', determineHeight);
    }
  }, [elementID]);

  return elementHeight;
}