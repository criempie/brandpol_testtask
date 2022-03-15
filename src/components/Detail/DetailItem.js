import { StyleSheet, View, Text } from "react-native";

export const DetailItem = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ощущается как</Text>
            <Text style={styles.description}>-7 °C</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },

    header: {
        fontWeight: "700"
    },

    description: {

    },
});
