import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { useContext } from "react";
import { WeatherContext } from "../context";

export const Header = () => {
    const { name } = useContext(WeatherContext);

    return (
        <View style={styles.body}>
            <TouchableOpacity onPress={() => console.log("press")}>
                <Image source={require("../../assets/plus-icon.png")} style={styles.icon}/>
            </TouchableOpacity>
            <Text style={styles.cityName}>{name}</Text>
            <View style={styles.icon}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: 70,
        padding: 24,
        paddingBottom: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(41,143,184,1)",
    },

    cityName: {
        fontSize: 24,
    },

    icon: {
        width: 32,
        height: 32,
    }
})
