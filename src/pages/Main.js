import { Header }                                      from "../components/Header";
import { Temperature }                                 from "../components/Temperature";
import { Detail }                                      from "../components/Detail/Detail";
import { useEffect, useState }                         from "react";
import { Loader }                                      from "../components/Loader";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigate }                                 from "react-router-native";
import { globalStyles }                                from "../globalStyles";
import { weatherService }                  from "../services/global";
import { WeatherService }                              from "../services/WeatherService";

export const Main = () => {
    const [ loader, setLoader ] = useState(false);

    const [ weather, setWeather ] = useState(WeatherService.weatherPattern);

    const navigator = useNavigate();

    useEffect(() => {
        weatherService.subscribeToUpdates(setWeather);
        if (weatherService.weather) {
            setWeather(weatherService.weather);
        }

        return () => weatherService.unsubscribeUpdates(setWeather);
    }, [])

    return (
        <>
            <Header>
                <TouchableOpacity onPress={ () => navigator('/cities') }>
                    <Image source={ require("../../assets/plus-icon.png") } style={ globalStyles.icon }/>
                </TouchableOpacity>
                { <Text style={ globalStyles.h1 }>{ weather.name }</Text> }
                <View style={ globalStyles.icon }/>
                <Button title={ "update" } onPress={ weatherService.updateWeather }/>
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
        </>
    );
};
