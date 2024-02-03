import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera/next';
import Container from '../../components/Container/Container';
import { styles } from './styles/Scanner.style';
import Backward from '../../components/Backward/Backward';
import { Button, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler';
// import Clipboard from '@react-native-clipboard/clipboard';

const Scanner = ({ navigation, route, ...props }) => {

    const { t } = useTranslation()

    const { mode } = route.params

    const [permission, requestPermission] = useCameraPermissions();

    const [animatedValue] = useState(new Animated.Value(0));

    const [result, setResult] = useState([])

    const [scanResult, setScanResult] = useState([])

    const scanRef = useRef()

    const copyContent = () => {
        console.log(scanRef.current.props)
        // Clipboard.setString(scanRef.current.value);
    }

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
                    outputRange: [0, Dimensions.get('screen').height / 2],
                }),
            },
        ],
    };

    useEffect(() => {
        if (scanResult.length === 5) {
            const uniqueScanResult = Array.from(new Set(scanResult));
            if (uniqueScanResult.length === 1) {
                setResult(res => [...res, uniqueScanResult[0]]);
            } else {
                const translateError = t('Error during scanning, please retry');
                setResult(translateError);
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

            setScanResult(res => ([...res, typeof parsingData(data) === 'object' ? JSON.stringify(parsingData(data)) : parsingData(data)]))
        }
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
                        {Array.isArray(result) ? result.map((res, i) => <View key={i} style={styles.result}>
                            <Text style={styles.textResult}>{res}</Text>
                            <Button icon={'content-copy'} mode='contained-tonal' onPress={() => copyContent(res)}>{t('copy')}</Button>
                        </View>) : <View style={styles.result}>
                            <Text style={styles.textResult}>{result}</Text>
                        </View>
                        }
                    </View>
                </ScrollView> : <></>}
            </View>
        </Container>
    )
}

export default Scanner