import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
    },
    resultContainer: {
        gap: 12
    },
    cameraContainer: {
        overflow: 'hidden',
        borderRadius: 16
    },
    cameraView: {
        borderRadius: 16,
        width: Dimensions.get('screen').width / 1.1,
        height: Dimensions.get('screen').height / 2.5
    },
    animatedBar: {
        position: 'absolute',
        width: '100%',
        height: 5,
        backgroundColor: 'red',
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
        fontSize: 10,
        color: 'white',
        letterSpacing: -0.02
    },
    scrollView: {
        marginBottom: 40
    }

})