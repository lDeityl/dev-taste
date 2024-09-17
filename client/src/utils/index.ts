export function convertObjectToQueryString(obj: Record<string, number[]>) {
    return Object.entries(obj).reduce((queryString, [key, values], index) => {
        const keyValuePairs = values.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
        const prefix = index === 0 ? '' : '&';
        return queryString + prefix + keyValuePairs;
    }, '');
}