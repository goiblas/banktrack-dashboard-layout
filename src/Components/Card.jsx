import clsx from "clsx"
import { forwardRef } from "react"
import { MODULES } from "../config";

const Card = forwardRef((props, ref) => {
    const { overlay, active, insertPosition, attributes, listeners, id } = props;
    const module = MODULES.find((module) => module.id === id);

    return (
        <div
            ref={ref}
            // style={{
            //     width: overlay ? `calc(100% - ${2 * layoutOptions.padding}px)` : style.width,
            //     padding: style.padding,
            //     marginBottom: style.marginBottom,
            // }}
            className={clsx("card", `card-width-${module.width}`, `card-height-${module.height}`,{
                overlay: overlay,
                active: active,
                insertBefore: insertPosition === "before",
                insertAfter: insertPosition === "after",
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