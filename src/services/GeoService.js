import * as Location from "expo-location";

export class GeoService {
    #coords;
    #coordsFormatted;
    #subscribedFunctions;

    constructor() {
        this.#subscribedFunctions = [];
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
