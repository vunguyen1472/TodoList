export const dateUniform = (date: Date, startTime: Date, endTime: Date) => {
    const newStartTime = new Date(date);
    newStartTime.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), startTime.getMilliseconds())

    const newEndTime = new Date(date);
    newEndTime.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), endTime.getMilliseconds())

    return { date, newStartTime, newEndTime }
}