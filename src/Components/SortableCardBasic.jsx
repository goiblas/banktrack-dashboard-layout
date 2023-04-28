import { useSortable } from "@dnd-kit/sortable";
import Card from "./BasicCard";

const SortableCard = (props) => {
        const { id } = props;
        const { attributes, listeners, isDragging, setNodeRef } = useSortable({ id });
    
        return (
            <Card
                ref={setNodeRef}
                active={isDragging}
                attributes={attributes}
                listeners={listeners}
                id={id}
            />
        );
};

export default SortableCard;
