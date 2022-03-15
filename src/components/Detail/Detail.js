import { StyleSheet, View } from "react-native";
import { DetailItem } from "./DetailItem";

export const Detail = () => {
    return (
        <View style={styles.body}>
            <View style={styles.row}>
                <DetailItem />
                <DetailItem />
            </View>
            <View style={styles.row}>
                <DetailItem />
                <DetailItem />
            </View>
            <View style={styles.row}>
                <DetailItem />
                <DetailItem />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: "rgb(168,220,239)",
        borderRadius: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
})
