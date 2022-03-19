import { Header }                                                                      from "../components/Header";
import { Temperature }                                                                 from "../components/Temperature";
import { Detail }                                                                      from "../components/Detail/Detail";
import { useEffect, useState }                                                         from "react";
import { Loader }                                                                      from "../components/Loader";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigate }                                                                 from "react-router-native";
import { globalStyles }               from "../globalStyles";
import { geoService, weatherService } from "../services/global";
import { WeatherService }             from "../services/WeatherService";

export const Main = () => {
    const [ coords, setCoords ] = useState();
    const [ loader, setLoader ] = useState(false);

    const [ weather, setWeather ] = useState(WeatherService.weatherPattern);

    const navigator = useNavigate();

    useEffect(() => {
        geoService.updateCurrentLocation();
    }, [])

    useEffect(() => {
        weatherService.subscribeToUpdates(setWeather);

        return () => weatherService.unsubscribeUpdates(setWeather);
    }, [])

    useEffect(() => {
        if (coords) {
            weatherService.coords = coords;
        }
    }, [ coords ])



    return (
        <>
            <Header>
                <TouchableOpacity onPress={ () => navigator('/cities') }>
                    <Image source={ require("../../assets/plus-icon.png") } style={ globalStyles.icon }/>
                </TouchableOpacity>
                { <Text style={ globalStyles.h1 }>{ weather.name }</Text> }
                <View style={ globalStyles.icon }/>
                <Button title={"update"} onPress={weatherService.updateWeather} />
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
