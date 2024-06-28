import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, Dimensions, Share, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Container from '../../components/Container/Container';
import { styles } from './styles/Scanner.style';
import Backward from '../../components/Backward/Backward';
import { Button, Divider, Icon, Snackbar, TouchableRipple } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import uuid from 'react-uuid';
import { Dialog, Portal, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as Haptics from 'expo-haptics';
import ScanItem from '../../components/ScanItem/ScanItem';


const Scanner = ({ navigation, route, ...props }) => {

    const { t } = useTranslation()

    const { mode } = route.params

    const [permission, requestPermission] = useCameraPermissions();

    const [animatedValue] = useState(new Animated.Value(0));

    const [result, setResult] = useState([])

    const [visible, setVisible] = useState(false)

    const [visibleDialog, setVisibleDialog] = useState({})

    const onDismissSnackBar = () => setVisible(false)

    const [scanResult, setScanResult] = useState([])

    const hideDialog = () => setVisible('');

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

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission()
        }
    }, [permission?.granted])

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
        const urlRegex = /^[^\s]+:\/\/[^\s/$.?#].[^\s]*$/i;

        // Teste la chaîne avec l'expression régulière
        return urlRegex.test(str);
    }

    useEffect(() => {
        if (scanResult.length === 5 && !visibleDialog.text) {
            const uniqueScanResult = Array.from(new Set(scanResult));
            if (uniqueScanResult.length === 1) {
                if (isURL(uniqueScanResult[0])) {
                    setResult(res => [...res, { text: uniqueScanResult[0], uid: uuid(), type: 'link' }].reverse());
                    setVisibleDialog({ text: uniqueScanResult[0], uid: uuid(), type: 'link' })
                } else {
                    setResult(res => [...res, { text: uniqueScanResult[0], uid: uuid() }].reverse());
                }
                Haptics.selectionAsync()
            } else {
                setVisible(true)
                Haptics.selectionAsync()
            }

            setTimeout(() => setScanResult([]), 3000)
        }
    }, [scanResult]);

    const onScan = ({ data, scanResult }) => {
        if (scanResult.length < 5) {
            const parsingData = ({ data }) => {
                if (data) {
                    return data
                }
                return undefined
            }

            setScanResult(res => ([...res, typeof parsingData(data) === 'object' ? JSON.stringify(parsingData(data)) : parsingData(data)].reverse()))
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

    const openLink = (link) => {
        Linking.openURL(link)
    }

    return (
        <Container>
            <View style={styles.container}>
                <Backward navigation={navigation} mode={mode} />
                <Divider bold />
                <View style={styles.cameraContainer}>
                    {permission?.granted && <CameraView videoQuality={'720p'} style={styles.cameraView} {...(mode === 'qr' ? {
                        barcodeScannerSettings: {
                            barCodeTypes: ['qr']
                        }
                    } : {
                        barcodeScannerSettings: {
                            barCodeTypes: ['upc_e', 'upc_a', 'pdf417', 'itf14', 'ean8', 'ean13', 'datamatrix', 'code93', 'code39', 'code128', 'codabar', 'aztec']
                        }
                    })} onBarcodeScanned={data => onScan({ data, scanResult })} />}
                    <Animated.View style={[styles.animatedBar, animatedStyle]} />
                </View>
                {result.length ? <ScrollView style={styles.scrollView}>
                    <View style={styles.resultContainer}>
                        {Array.isArray(result) ? result.map((res, i) =>
                            <ScanItem key={i} data={res} onDelete={deletElt} onShare={share} onOpenLink={openLink} />
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
                duration={3000}>
                {t('Error during scanning, please retry')}
            </Snackbar>
            <Portal>
                <Dialog visible={visibleDialog?.type === 'link'} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" size={48} color={'#FF0000'} />
                    <Dialog.Title style={styles.title}>{t('Warning')}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{t('You are about to visit a potentially dangerous website. Do you want to continue?')}</Text>
                        <Text variant="labelLarge">{visibleDialog?.text}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode='contained' onPress={() => {
                            setVisibleDialog({})
                            setScanResult([])
                        }}>{t('Cancel')}</Button>
                        <Button mode='contained-tonal' onPress={() => {
                            Linking.openURL(decodeURIComponent(visibleDialog.text))
                            setVisibleDialog({})
                            setScanResult([])
                        }}>{t("I'm okay")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Container>
    )
}

export default Scanner