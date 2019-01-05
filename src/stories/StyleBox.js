import React from 'react'

export default props => {
  const { children, style, ...shortcuts } = props
  const {
    w: width,
    h: height,
    p: padding,
    m: margin,
    bg: background,
    displ: display,
    justify: justifyContent,
    align: alignItems
  } = shortcuts
  return (
    <div style={{ width, height, padding, margin, background, display, justifyContent, alignItems,...style }}>
      {children}
    </div>
  )
}
