import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core"
  import {
    arraySwap,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
  } from "@dnd-kit/sortable"
  import { motion } from "framer-motion"
  import { useState } from "react"
  import { Masonry } from "./components/Masonry"
  import { range } from "./utils/range"
  
  const initialItems = range(15).map((id) => ({
    id: id + 1,
    height: 100 + Math.random() * 400,
}))
    
export default function App() {
    const [items, setItems] = useState(initialItems)
  
    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )
  
    return (
    <div className="container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={(event) => {
          const { active, over } = event
          if (over && active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id)
              const newIndex = items.findIndex((item) => item.id === over.id)
              return arraySwap(items, oldIndex, newIndex)
            })
          }
        }}
      >
        <motion.div layout>
          <SortableContext items={items} strategy={() => null}>
            <Masonry
              items={items}
              itemKey={(item) => item.id}
              columnWidth={300}
              gap={16}
              renderItem={(item) => (
                <SortableCell id={item.id}>
                  <ItemBox item={item} />
                </SortableCell>
              )}
            />
          </SortableContext>
        </motion.div>
      </DndContext>
      </div>
    )
  }
  
  function SortableCell({
    id,
    children,
  }) {
    const sortable = useSortable({ id })
  
    return (
      <motion.div
        layoutId={String(id)}
        ref={sortable.setNodeRef}
        animate={
          sortable.transform
            ? {
                x: sortable.transform.x,
                y: sortable.transform.y,
                zIndex: sortable.isDragging ? 1 : 0,
                "--border-color": sortable.isDragging ? 'blue' : '#fff',
            }
            : { x: 0, y: 0, opacity: sortable.isOver ? 1 : 1,
                "--border-color": sortable.isOver ? 'red' : '#fff',
             }
        }
        transition={sortable.isDragging ? { duration: 0 } : undefined}
        {...sortable.attributes}
        {...sortable.listeners}
      >
        {children}
      </motion.div>
    )
  }
  
  function ItemBox({ item }) {
    return (
      <div
        className="box"
        style={{
          height: item.height,
        }}
      >
        {item.id}
      </div>
    )
  }