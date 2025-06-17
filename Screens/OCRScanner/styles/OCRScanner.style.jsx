import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
    },
    resultContainer: {
        gap: 12,
        paddingHorizontal: 16
    },
    cameraContainer: {
        overflow: 'hidden',
        borderRadius: 16,
        position: 'relative'
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
    scrollView: {
        width: Dimensions.get('screen').width
    },
    containerOCR: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
        height: Dimensions.get('screen').height / 3
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'   
    },
    buttonPicture: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 1,
        borderRadius: '100%',
        border: 'none',
        alignItems: 'center',
        justifyContent: 'center'
    }

})