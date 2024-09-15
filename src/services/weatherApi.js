import axios from "axios";
const apikey = import.meta.env.VITE_WEATHER_API_KEY;

const API_KEY = apikey;
const BASE_URL = 'http://api.weatherapi.com/v1';


export const getCitySuggestions = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search.json`, {
            params: {
                key: API_KEY,
                q: query,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
        throw error;
    }
};

export const getWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city,
                aqi: 'no',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data', error);
        throw new Error('Failed to fetch weather data');
    }
};