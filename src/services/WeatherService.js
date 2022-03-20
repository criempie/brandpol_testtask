import axios                              from "axios";
import { getCurrentCityFromAsyncStorage } from "../utils";
import { geoService }                     from "./global";

export class WeatherService {
    #coords;
    #weatherFormatted;
    #weather;
    #subscribedFunctions;

    constructor() {
        this.#subscribedFunctions = [];

        geoService.subscribeToUpdates(this.#setCoords.bind(this));
        getCurrentCityFromAsyncStorage(city => {
            if (city) {
                this.#coords = {
                    latitude: city.lat,
                    longitude: city.lon
                };
            } else {
                this.#coords = geoService.coords;
            }

            this.updateWeather();
        });
    };

    static #urlAPI = "https://api.openweathermap.org/data/2.5/weather";
    static #keyAPI = "c620e70db8c6dd36dc1e728ce583d185";

    static weatherPattern = {
        weather: [ {
            id: null,
            main: null,        // Описание на английском
            description: null, // Описание погоды на русском
            icon: null         // Название иконки
        } ],
        main: {
            temp: null,        // Температура
            feels_like: null,  // Ощущение
            pressure: null,    // Давление
            humidity: null     // Влажность
        },
        wind: {
            speed: null,       // Скорость
            deg: null,         // Угол
        },
        name: null             // Название города
    };

    get weather() {
        return this.#weatherFormatted;
    }

    static #weatherFormat(newWeather) {
        const weather = Object.assign({}, WeatherService.weatherPattern);
        Object.keys(weather).forEach(item => {
            weather[item] = newWeather[item];
        })

        return weather;
    }

    /**
     * Получение погоды по данным координатам
     */
    updateWeather() {
        return new Promise((resolve, reject) => {
            axios.get(WeatherService.#urlAPI, {
                params: {
                    lat: this.#coords.latitude,
                    lon: this.#coords.longitude,
                    appid: WeatherService.#keyAPI,
                    lang: "ru",
                    units: "metric",
                    // exclude: "minutely,hourly,daily,alerts"
                }
            })
                 .then(res => {
                     this.#weather = res.data;
                     this.#weatherFormatted = WeatherService.#weatherFormat(this.#weather);
                     this.sendUpdatesToSubscribes();
                     resolve();
                 })
                 .catch(e => {
                     console.warn("Ошибка при получении погоды: ", e);
                     reject(e);
                 })
        })
    }

    #setCoords(coords) {
        this.#coords = coords;
        this.updateWeather();
    }

    subscribeToUpdates(func) {
        this.#subscribedFunctions.push(func);
    }

    unsubscribeUpdates(func) {
        this.#subscribedFunctions = this.#subscribedFunctions.filter(f => f !== func);
    }

    sendUpdatesToSubscribes() {
        this.#subscribedFunctions.map(func => {
            func(this.#weatherFormatted);
        });
    }
}
