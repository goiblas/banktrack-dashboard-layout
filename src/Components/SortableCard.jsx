import { useSortable } from "@dnd-kit/sortable";
import Card from "./Card";

const SortableCard = (props) => {
        const { id, activeIndex } = props;
        const { attributes, listeners, isDragging, index, over, setNodeRef } = useSortable({ id });
    
        return (
            <Card
                ref={setNodeRef}
                active={isDragging}
                insertPosition={
                    activeIndex !== undefined && over?.id === id && !isDragging
                        ? index > activeIndex
                            ? "after"
                            : "before"
                        : undefined
                }
                attributes={attributes}
                listeners={listeners}
                id={id}
            />
        );
};

export default SortableCard;
