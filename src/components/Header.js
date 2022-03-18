import { StyleSheet, View } from "react-native";

export const Header = ({ children }) => {

    return (
        <View style={ styles.body }>
            {children}
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
    }
})
