import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Сравнение объектов
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Вставка города в конец списка сохраненного в AsyncStorage.
 * @param item
 * @param callback
 */
export function setCityToAsyncStorage(item, callback?) {
    AsyncStorage.getItem("cities")
                .then(cities => {
                    if (!cities) {
                        AsyncStorage.setItem("cities", JSON.stringify([ item ]));
                    } else {
                        const citiesArray = JSON.parse(cities);
                        if (citiesArray.every(c => {
                            return !compareObjects(item, c);
                        })) {
                            citiesArray.push(item);
                            AsyncStorage.setItem("cities", JSON.stringify(citiesArray));
                            callback(citiesArray);
                        }
                    }
                })
                .catch(e => {
                    console.log("Произошла ошибка при сохранении города: ", e);
                })
}

export function deleteCityFromAsyncStorage(item, callback?) {
    AsyncStorage.getItem("cities")
                .then(cities => {
                    if (cities) {
                        getCurrentCityFromAsyncStorage(currentCity => {
                            if (currentCity.id === item.id) {
                                deleteCurrentCityFromAsyncStorage();
                            }

                            const citiesArray = JSON.parse(cities);
                            const newCitiesArray = citiesArray.filter(c => !compareObjects(c, item));
                            AsyncStorage.setItem("cities", JSON.stringify(newCitiesArray));
                            callback(newCitiesArray);
                        })
                    }
                })
                .catch(e => {
                    console.log("Произошла ошибка при сохранении города: ", e);
                })
}

export function setCurrentCityToAsyncStorage(city, callback?) {
    AsyncStorage.setItem("currentCity", JSON.stringify(city))
                .then(callback)
                .catch(e => {
                    console.warn("При установке текущего города произошла ошибка: ", e);
                    callback();
                });
}

export function getCurrentCityFromAsyncStorage(callback) {
    AsyncStorage.getItem("currentCity")
                .then(city => callback(JSON.parse(city)))
                .catch(e => console.warn("При получении текущего города произошла ошибка: ", e));
}

export function deleteCurrentCityFromAsyncStorage(callback?) {
    AsyncStorage.removeItem("currentCity")
                .then(callback)
                .catch(e => console.log("При удалении текущего города произошла ошибка: ", e));
}
