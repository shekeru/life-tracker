export function TimeAgo(time: number) {
    let span = Math.round(time / 1000)
    if (span <= 90) 
        return `${span} seconds`
    if (span <= 7200)
        return `${Math.round(span / 60)} minutes`
    if (span <= 259200)
        return `${Math.round(span / 3600)} hours`
    return `${Math.round(span / 86400)} days`
}

export function TimeOut(time: number) {
    if (time <= 90000)
        return 100
    return 1000
}