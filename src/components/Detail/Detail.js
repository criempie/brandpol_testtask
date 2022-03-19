import { StyleSheet, View }                from "react-native";
import { weatherService }                  from "../../services/global";
import { WeatherService }                  from "../../services/WeatherService";
import { DetailItem }                      from "./DetailItem";
import * as lang                           from "../../ru.json";
import { useEffect, useState } from "react";

const measureList = {
    feels_like: '°C',
    humidity: '%',
    pressure: 'mmHg',
    wind_speed: 'м/с',
}

export const Detail = () => {
    const [weather, setWeather] = useState(WeatherService.weatherPattern);

    useEffect(() => {
        setWeather(weatherService.weather);
        weatherService.subscribeToUpdates(setWeather);

        return () => weatherService.unsubscribeUpdates(setWeather);
    }, [])

    return (
        <View style={ styles.body }>
            { [ 'feels_like', 'humidity', 'pressure' ].map(name => (
                <DetailItem value={ weather.main[name] }
                            title={ lang[name] }
                            measure={ measureList[name] }
                            key={ name + '_detailitem' }/>
            )) }
            <DetailItem value={ weather.wind.speed }
                        title={ lang['wind_speed'] }
                        measure={ measureList.wind_speed }/>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "rgb(168,220,239)",
        borderRadius: 24,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around"
    },
})
