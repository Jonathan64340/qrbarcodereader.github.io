import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width / 1.1,
        flexDirection: 'row'
    },
    button: {
        width: '48dp'
    }
})