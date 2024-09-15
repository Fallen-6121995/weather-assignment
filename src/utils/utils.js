import { getLocalStorage, setLocalStorage } from "../helper";
export const getFavorites = () => {
    const storedFavorites = getLocalStorage('favorites');
    return storedFavorites ? storedFavorites : [];
};
export const addFavorite = (city) => {
    const currentFavorites = getFavorites();
    if (!currentFavorites.includes(city)) {
        const updatedFavorites = [...currentFavorites, city];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
};
export const removeFavorite = (city) => {
    const currentFavorites = getFavorites();
    const updatedFavorites = currentFavorites.filter(fav => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};