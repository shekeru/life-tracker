export function TimeAgo(time: number) {
    let span = Math.ceil(time / 1000)
    if (span <= 90) 
        return `${span} seconds`
    span = Math.floor(span / 60)
    if (span <= 120)
        return `${span} minutes`
    span = Math.floor(span / 60)
    if (span <= 72)
        return `${span} hours`
    span = Math.floor(span / 24)
    return `${span} days`
}