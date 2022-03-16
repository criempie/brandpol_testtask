import { StyleSheet, View, Text } from "react-native";

export const Temperature = ({ temperature, description }) => {
    return (
        <View style={styles.container}>
            <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>{temperature}</Text>
                <Text style={styles.degree}>°C</Text>
            </View>
            <Text style={styles.description}>{description.description.charAt(0).toUpperCase() + description.description.slice(1)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        height: "100%",
        display: "flex",
    },

    container: {
        width: "100%",
        height: "50%",
        backgroundColor: "rgba(119,203,239,1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    temperatureContainer: {
        display: "flex",
        flexDirection: "row",
    },

    temperature: {
        fontSize: 128,
        lineHeight: 131
    },

    degree: {
        fontSize: 24,
        fontWeight: "700"
    },

    description: {
        fontSize: 24
    },
})
