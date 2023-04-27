
import SortableCard from "./Components/SortableCard"
import Card from "./Components/Card"
import Grid from "./Components/Grid"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { MODULES } from "./config";

function App() {
  const [items, setItems] = useState(() => MODULES.map((module) => module.id));
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event) => {
      setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
          setItems((items) => {
              const oldIndex = items.indexOf(active.id);
              const newIndex = items.indexOf(over.id);

              return arrayMove(items, oldIndex, newIndex);
          });
      }

      setActiveId(null);
  };

  const handleDragCancel = () => {
      setActiveId(null);
  };

  const activeIndex = items.indexOf(activeId);

  return (
      <div className="container">
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={() => null}>
                <Grid>
                    {items.map((id) => (
                        <SortableCard activeIndex={activeIndex} key={id} id={id} />
                    ))}
                </Grid>
            </SortableContext>

            <DragOverlay style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Card id={activeId} overlay /> : null}
            </DragOverlay>
        </DndContext>
      </div>
  )
}

export default App
