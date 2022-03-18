import { StyleSheet, View } from "react-native";
import { DetailItem }       from "./DetailItem";
import * as lang            from "../../ru.json";
import { useContext }       from "react";
import { WeatherContext }   from "../../context";

const measureList = {
    feels_like: '°C',
    humidity: '%',
    pressure: 'mmHg',
    wind_speed: 'м/с',
}

export const Detail = () => {
    const { main, wind } = useContext(WeatherContext);

    return (
        <View style={ styles.body }>
            { [ 'feels_like', 'humidity', 'pressure' ].map(name => (
                <DetailItem value={ main[name] }
                            title={ lang[name] }
                            measure={ measureList[name] }
                            key={ name + '_detailitem' }/>
            )) }
            <DetailItem value={ wind.speed }
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
