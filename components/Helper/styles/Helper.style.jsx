import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        gap: 12
    },
    modalHeader: {
        marginBottom: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalHeaderTitle: {
        fontSize: 18,
        letterSpacing: -0.2,
        fontWeight: 'bold'
    },
    button: {
        position: 'absolute',
        top: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32
    }
})