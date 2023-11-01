export const outputDateSeconds = () => {
    const date = new Date()
    let output = String(
        date.getHours()
        + ':' + date.getMinutes()
        + ':' + date.getSeconds()
        + ':' + date.getMilliseconds()
    )
    output = output + ''
    return output
}
