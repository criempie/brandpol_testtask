import { forwardRef }                                            from "react";
import { StyleSheet, TextInput } from "react-native";

export const SearchBar = forwardRef((props, ref) => {
        return (
            <TextInput style={ styles.body }
                       maxLength={ 12 }
                       ref={ref}
                       placeholder={ "Введите город" }
                       { ...props }/>
        );
    }
)

const styles = StyleSheet.create({
    body: {
        backgroundColor: "rgba(60,60,60,0.53)",
        fontSize: 16,
        borderRadius: 24,
        width: "100%",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    }
});
