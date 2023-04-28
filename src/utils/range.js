export function range(...args) {
    let start, end, step;

    if (args.length === 1) {
        start = 0
        end = args[0]
        step = 1
    } else if (args.length === 2) {
        start = args[0]
        end = args[1]
        step = 1
    } else {
        start = args[0]
        end = args[1]
        step = args[2]
    }

    const result = []
    for (let i = start; i < end; i += step) {
        result.push(i)
    }

    return result
}