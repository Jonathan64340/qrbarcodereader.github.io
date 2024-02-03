import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24
    },
    button: {
        padding: 18,
        width: Dimensions.get('screen').width / 1.2
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: -0.2
    }
})