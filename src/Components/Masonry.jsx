import { Fragment } from "react"
import { useSize } from "../hooks/useSize"
import { range } from "../utils/range"

export function Masonry({
  items,
  itemKey,
  columnWidth,
  gap,
  renderItem,
}) {
  const [sizeRef, size] = useSize()
  const columnCount = Math.floor(size.width / columnWidth)

  return (
    <div ref={sizeRef} className="flex" style={{ gap }}>
      {range(columnCount).map((columnIndex) => (
        <div key={columnIndex} className="flex flex-col flex-1" style={{ gap }}>
          {range(columnIndex, items.length, columnCount).map((itemIndex) => (
            <Fragment key={itemKey(items[itemIndex])}>
              {renderItem(items[itemIndex])}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
