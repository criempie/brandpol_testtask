import { Header } from "../components/Header";
import { Temperature } from "../components/Temperature";
import { Detail } from "../components/Detail/Detail";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { Loader } from "../components/Loader";

export const Main = () => {
    const [coords, setCoords] = useState();
    const [loader, setLoader] = useState(false);

    const [weather, setWeather] = useState({
        temp: null,
        weather: [{
            id: null,
            main: null,
            description: null,
            icon: null
        }]
    });
    const urlAPI = "https://api.openweathermap.org/data/2.5/onecall";
    const keyAPI = "c620e70db8c6dd36dc1e728ce583d185";

    useEffect(() => {
        setLoader(true);
        getGeoData()
            .then(coords => {
                setCoords(coords.coords);
                setLoader(false);
            })
            .catch(e => {
                console.warn("При получении данных о геолокации произошла ошибка: ", e);
                setLoader(false);
            })
    }, [])

    useEffect(() => {
        if (coords) {
            setLoader(true);
            getWeather(coords)
                .then(res => {
                    setWeather(res.data.current);
                    setLoader(false);
                })
                .catch(e => {
                    console.warn("Ошибка при получении погоды: ", e);
                    setLoader(false);
                })
        }
    }, [coords])

    /**
     * Получение данных геопозиции
     * @returns {Promise<boolean|LocationObject>}
     */
    async function getGeoData() {
        const {granted} = await Location.requestForegroundPermissionsAsync();

        if (granted) {
            return Location.getCurrentPositionAsync();
        } else {
            console.warn("Не выданы разрешения для геолокации.");
            return false
        }
    }

    /**
     * Получение погоды по данным координатам
     * @param coords
     * @returns {Promise<AxiosResponse<any>>}
     */
    async function getWeather(coords) {
        return axios.get(urlAPI, {
            params: {
                lat: coords.latitude,
                lon: coords.longitude,
                appid: keyAPI,
                lang: "ru",
                units: "metric",
                exclude: "minutely,hourly,daily,alerts"
            }
        })
    }

    return (
        <>
            <Header/>
            {/*исправить "|| !weather.temp" когда появится хранилище*/}
            {loader || !weather.temp
                ? <Loader/>
                : <><Temperature temperature={weather.temp} description={weather.weather[0]}/><Detail/></>}
        </>
    );
};
