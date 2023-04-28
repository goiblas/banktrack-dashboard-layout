import clsx from "clsx"
import { forwardRef } from "react"
import { MODULES } from "../config";

const Card = forwardRef((props, ref) => {
    const { overlay, active, attributes, listeners, id } = props;
    const module = MODULES.find((module) => module.id === id);

    return (
        <div
            ref={ref}
            className={clsx("card", `card-width-${module.width}`, `card-height-${module.height}`,{
                overlay: overlay,
                active: active,
            })}
            {...attributes}
            {...listeners}
        >
            {module.title}
        </div>
    );
})

Card.displayName = "Card"

export default Card