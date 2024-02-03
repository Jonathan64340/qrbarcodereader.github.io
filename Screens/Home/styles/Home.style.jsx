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
        width: Dimensions.get('screen').width / 1.2,
        backgroundColor: '#240B3B',
        borderRadius: 16,
        height: 65
    },
    innerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    buttonText: {
        letterSpacing: -0.2,
        alignItems: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})