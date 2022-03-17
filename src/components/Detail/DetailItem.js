import { StyleSheet, View, Text } from "react-native";

export const DetailItem = ({title, value, measure}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.description}>{value} {measure}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        backgroundColor: "white"
    },

    header: {
        fontSize: 19
    },

    description: {
        fontSize: 15
    },
});
