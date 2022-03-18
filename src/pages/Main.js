import { Header }                                          from "../components/Header";
import { Temperature }                                     from "../components/Temperature";
import { Detail }                                          from "../components/Detail/Detail";
import { useEffect, useState }                             from "react";
import * as Location                                       from "expo-location";
import axios                                               from "axios";
import { Loader }                                          from "../components/Loader";
import { WeatherContext }                                  from "../context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate }  from "react-router-native";
import { globalStyles } from "../globalStyles";

export const Main = () => {
    const [ coords, setCoords ] = useState();
    const [ loader, setLoader ] = useState(false);

    const navigator = useNavigate();

    const [ weather, setWeather ] = useState({
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
    });

    const urlAPI = "https://api.openweathermap.org/data/2.5/weather";
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
                    weatherFormat(res.data);
                    setLoader(false);
                })
                .catch(e => {
                    console.warn("Ошибка при получении погоды: ", e);
                    setLoader(false);
                })
        }
    }, [ coords ])

    /**
     * Получение данных геопозиции
     * @returns {Promise<boolean|LocationObject>}
     */
    async function getGeoData() {
        const { granted } = await Location.requestForegroundPermissionsAsync();

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
                // exclude: "minutely,hourly,daily,alerts"
            }
        })
    }

    function weatherFormat(newWeather) {
        const _weather = Object.assign({}, weather);
        Object.keys(_weather).forEach(item => {
            _weather[item] = newWeather[item];
        })

        setWeather(_weather);
    }

    return (
        <WeatherContext.Provider value={ weather }>
            <Header>
                <TouchableOpacity onPress={ () => navigator('/cities') }>
                    <Image source={ require("../../assets/plus-icon.png") } style={ globalStyles.icon }/>
                </TouchableOpacity>
                <Text style={ globalStyles.h1 }>{ weather.name }</Text>
                <View style={ globalStyles.icon }/>
            </Header>
            {/*исправить "|| !weather.main.temp" когда появится хранилище*/ }
            { loader || !weather.main.temp
              ? <Loader/>
              : <>
                  <Temperature temperature={ weather.main.temp }
                               description={ weather.weather[0] }/>
                  <Detail/>
              </>
            }
        </WeatherContext.Provider>
    );
};
