import { StyleSheet, View, Animated, Easing } from "react-native";

const spinValue = new Animated.Value(0);
Animated.loop(
    Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )
)
    .start();

const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
})

export const Loader = () => {


    return (
        <View>
            <Animated.Image source={require("../../assets/loader.png")}
                            style={styles.loader}/>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        width: 32,
        height: 32,
        transform: [{rotate: spin}],
    },
});
