import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
        height: 10
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
    },
    result: {
        borderRadius: 16,
        backgroundColor: '#240B3B',
        width: Dimensions.get('screen').width / 1.1,
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: 10
    },
    textResult: {
        padding: 12,
        fontSize: 12,
        color: 'white',
        letterSpacing: -0.02,
        flex: 1
    },
})