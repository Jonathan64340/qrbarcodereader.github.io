import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Easing, Dimensions, Share } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import Container from '../../components/Container/Container';
import { styles } from './styles/Scanner.style';
import Backward from '../../components/Backward/Backward';
import { Button, Divider, Icon, Snackbar, TouchableRipple } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-uuid';
import { Dialog, Portal, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';


const Scanner = ({ navigation, route, ...props }) => {

    const { t } = useTranslation()

    const { mode } = route.params

    const [permission, requestPermission] = useCameraPermissions();

    const [animatedValue] = useState(new Animated.Value(0));

    const [result, setResult] = useState([])

    const [visible, setVisible] = useState(false)

    const [visibleDialog, setVisibleDialog] = useState(false)

    const onDismissSnackBar = () => setVisible(false)

    const [scanResult, setScanResult] = useState([])

    const hideDialog = () => setVisible(false);

    const scanRef = useRef([])

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    }, []);

    const animatedStyle = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Dimensions.get('screen').height / 2.5],
                }),
            },
        ],
    };

    function isURL(str) {
        // Expression régulière pour tester si la chaîne est une URL
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        // Teste la chaîne avec l'expression régulière
        return urlRegex.test(str);
    }

    useEffect(() => {
        if (scanResult.length === 5 && !visibleDialog) {
            const uniqueScanResult = Array.from(new Set(scanResult));
            if (uniqueScanResult.length === 1) {
                setResult(res => [...res, { text: uniqueScanResult[0], uid: uuid() }]);
                if (isURL(uniqueScanResult[0])) {
                    setVisibleDialog(true)
                }
            } else {
                setVisible(true)
            }

            setTimeout(() => setScanResult([]), 3000)
        }
    }, [scanResult, visibleDialog]);

    const onScan = ({ data, scanResult }) => {
        if (scanResult.length < 5) {
            const parsingData = ({ data }) => {
                if (data) {
                    return data
                }
                return undefined
            }

            setScanResult(res => ([...res, typeof parsingData(data) === 'object' ? JSON.stringify(parsingData(data)) : parsingData(data)]))
        }
    }

    const share = (res) => {
        Share.share({
            title: t('QrBarCode Scanner'),
            message: res
        })
    }

    const deletElt = (res) => {
        setResult(r => ([...r.filter(s => s.uid !== res)]))
    }

    return (
        <Container>
            <View style={styles.container}>
                <Backward navigation={navigation} mode={mode} />
                <Divider bold />
                <View style={styles.cameraContainer}>
                    <CameraView style={styles.cameraView} barcodeScannerSettings={{
                        barCodeTypes: [mode === 'qr' ? 'qr' : 'aztec',
                            'ean13',
                            'ean8',
                            'pdf417',
                            'upc_e',
                            'datamatrix',
                            'code39',
                            'code93',
                            'itf14',
                            'codabar',
                            'code128',
                            'upc_a']
                    }} onBarcodeScanned={data => onScan({ data, scanResult })} />
                    <Animated.View style={[styles.animatedBar, animatedStyle]} />
                </View>
                {result.length ? <ScrollView style={styles.scrollView}>
                    <View style={styles.resultContainer}>
                        {Array.isArray(result) ? result.map((res, i) =>
                            <View style={styles.result} key={i} ref={ref => scanRef.current[res.uid] = ref}>
                                <Text style={styles.textResult} selectable selectionColor={'orange'}>{res.text}</Text>
                                <View style={styles.buttons}>
                                    <Button icon={'share-variant'} mode='contained-tonal' onPress={() => share(res.text)}>{t('share')}</Button>
                                    <TouchableRipple onPress={() => deletElt(res.uid)}>
                                        <Icon source={'trash-can'} color={'#FF0000'} size={28} />
                                    </TouchableRipple>
                                </View>
                            </View>
                        ) : <View style={styles.result}>
                            <Text style={styles.textResult}>{result.text}</Text>
                        </View>
                        }
                    </View>
                </ScrollView> : <></>}
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: t('Warning')
                }}>
                {t('Error during scanning, please retry')}
            </Snackbar>
            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={48}  color={'#FF0000'}/>
                    <Dialog.Title style={styles.title}>{t('Warning')}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{t('You are about to visit a potentially dangerous website ({{url}}). Do you want to continue?', { url: result[result.length - 1]?.text })}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode='contained' onPress={() => setVisibleDialog(false)}>{t('Cancel')}</Button>
                        <Button mode='contained-tonal' onPress={() => {
                            Linking.openURL(result[result.length - 1]?.text)
                        }}>{t("I'm okay")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Container>
    )
}

export default Scanner