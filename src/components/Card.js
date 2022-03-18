import { View, Text, StyleSheet } from "react-native";
import { globalStyles }           from "../globalStyles";

export const Card = ({ title, description, children }) => {
    return (
        <View style={ styles.container }>
            <View style={ styles.textContainer }>
                { title
                  ? <Text style={ globalStyles.h2 }>{ title }</Text>
                  : null }
                { description
                  ? <Text style={ globalStyles.h3 }>{ description }</Text>
                  : null }
            </View>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontWeight: "700",
        fontSize: 18
    },

    textContainer: {},
});
