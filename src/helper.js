export const getLocalStorage = (item) => {
    const data = localStorage.getItem(item);
    return JSON.parse(data);
}

export const setLocalStorage = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value));
}