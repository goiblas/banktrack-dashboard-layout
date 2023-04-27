import { forwardRef } from "react"

const Grid = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="grid" ref={ref} {...props}>
      {children}
    </div>
  )
})

Grid.displayName = "Grid"

export default Grid
