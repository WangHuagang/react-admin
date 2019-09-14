export const formateDate = (dateTime) => {
    if(!dateTime) return '';
    let date = new Date(dateTime)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}