export const getNormalDate = (date: Date) => {
    return new Date(date).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', });
}