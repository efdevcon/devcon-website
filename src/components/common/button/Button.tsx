import React from 'react'

export const Button = (props: any) => {
  const buttonRef = React.useRef<HTMLDivElement>()

  // React.useEffect(() => {
  //   buttonRef.current
  // }, [])

  const onMouseMove = (e: React.SyntheticEvent) => {
    if (buttonRef.current === undefined) return

    // const rect = buttonRef.current.getBoundingClientRect();

    // const x = rect.off

    // const cursorX = e.clientX
    // const buttonX = buttonRef.current.offsetLeft
    // const buttonWidth = buttonRef.current.clientWidth
    // const cursorY = e.clientY
    // const buttonY = buttonRef.current.offsetTop
    // const buttonHeight = buttonRef.current.clientHeight

    // // console.log(buttonRef.current)

    // const x = ((cursorX - buttonX) / buttonWidth) * 100
    // const y = ((cursorY - buttonY) / buttonHeight) * 100

    // const x = ((e.clientX - e.offsetLeft) / e.offsetWidth) * 100
    // const y = ((e.clientY - e.offsetTop) / e.offsetHeight) * 100

    // console.log(e.offsetX, e.offsetY)

    // var xCord = e.clientX
    // var yCord = e.clientY

    // e.persist()
    // console.log(e, 'e')

    // console.log(xCord, yCord, 'xy')

    // var xPercent = xCord / window.innerWidth
    // var yPercent = yCord / window.innerHeight
  }

  return (
    <button ref={buttonRef} onMouseMove={onMouseMove} {...props}>
      {props.children}
    </button>
  )
}
