import { useState, useLayoutEffect } from 'react'
// import throttle from 'src/utils/throttle';

const getElementHeight = (elementID: string) => {
  const element = document.getElementById(elementID)

  // NEED TO FIX: some pages load before the CSS arrives, while others don't - this causes miscalculations in components that rely on this utility but resize once loaded
  // console.log(element, 'element')
  // console.log(element?.clientHeight, 'client height')

  // debugger;

  return element?.clientHeight || 0
}

// Returns the height of an element by ID
// Assumes the target element is rendered
export default (elementID: string) => {
  const [elementHeight, setElementHeight] = useState(0)

  useLayoutEffect(() => {
    const determineHeight = () => {
      const nextElementHeight = getElementHeight(elementID)

      // console.log(nextElementHeight, elementID)

      if (nextElementHeight) setElementHeight(nextElementHeight)
    }

    // Set initial height (on component mount)
    determineHeight()

    // Keep height in sync when browser resizes
    window.addEventListener('resize', determineHeight)

    return () => {
      window.removeEventListener('resize', determineHeight)
    }
  }, [elementID])

  return elementHeight
}
