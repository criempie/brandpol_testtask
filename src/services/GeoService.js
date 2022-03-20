import axios                              from "axios";
import * as Location                      from "expo-location";
import { getCurrentCityFromAsyncStorage } from "../utils";

export class GeoService {
    #coords;
    #coordsFormatted;
    #subscribedFunctions;

    static #urlAPI = "http://api.openweathermap.org/geo/1.0/reverse";
    static #keyAPI = "c620e70db8c6dd36dc1e728ce583d185";

    constructor() {
        this.#subscribedFunctions = [];
        getCurrentCityFromAsyncStorage(city => {
            if (city) {
                this.#coords = {
                    latitude: city.lat,
                    longitude: city.lon
                };
                this.#coordsFormatted = GeoService.#coordsFormat(this.#coords);
            } else {
                this.updateCurrentLocation();
            }
        })
    }

    set coords(coords) {
        this.#coords = coords;
        this.#coordsFormatted = GeoService.#coordsFormat(coords);
        this.sendUpdatesToSubscribes();
    }

    get coords() {
        return this.#coordsFormatted;
    }

    async updateCurrentLocation() {
        const { granted } = await Location.requestForegroundPermissionsAsync();

        if (granted) {
            this.#coords = (await Location.getCurrentPositionAsync()).coords;
            this.#coordsFormatted = GeoService.#coordsFormat(this.#coords);
            this.sendUpdatesToSubscribes();

        } else {
            console.warn("Не выданы разрешения для геолокации.");
        }
    }

    static coordsPattern = {
        latitude: null,
        longitude: null
    }

    static #coordsFormat(newCoords) {
        const coords = Object.assign({}, GeoService.coordsPattern);
        Object.keys(coords).forEach(item => {
            coords[item] = newCoords[item];
        })

        return coords;
    }

    static async getCityByCoords(coords) {
        return (await axios.get(this.#urlAPI, {
            params: {
                lat: coords.latitude,
                lon: coords.longitude,
                appid: this.#keyAPI,
                limit: 1
            }
        })).data;
    }

    subscribeToUpdates(func) {
        this.#subscribedFunctions.push(func);
    }

    unsubscribeUpdates(func) {
        this.#subscribedFunctions = this.#subscribedFunctions.filter(f => f !== func);
    }

    sendUpdatesToSubscribes() {
        this.#subscribedFunctions.map(func => {
            func(this.#coordsFormatted)
        });
    }
}
