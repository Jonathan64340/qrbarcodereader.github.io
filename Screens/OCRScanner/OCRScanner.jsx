import { Button, Divider, Icon, Text } from 'react-native-paper';
import Container from '../../components/Container/Container';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Share, View } from 'react-native';
import { styles } from './styles/OCRScanner.style';
import Backward from '../../components/Backward/Backward';
import { useTranslation } from 'react-i18next';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { getRandom } from '../../utils/random';
import { ScrollView } from 'react-native-gesture-handler';
import ScanItem from '../../components/ScanItem/ScanItem';

const OCRScanner = ({ navigation, route, ...props }) => {

    const { t, i18n } = useTranslation()

    const cameraRef = useRef()

    const { mode } = route.params

    const [permission, requestPermission] = useCameraPermissions()

    const [textOCR, setTextOCR] = useState('')

    const [ocrUri, setOCRUri] = useState(null)

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission()
        }
    }, [permission?.granted])

    const takePicture = async () => {
        setTextOCR('')
        setOCRUri('')
        try {
            const picture = await cameraRef?.current?.takePictureAsync()

            const { uri } = picture

            const ocr = await TextRecognition.recognize(uri)

            setOCRUri(uri)

            for (let block of ocr.blocks) {

                setTimeout(() => {
                    setTextOCR(text => text += block.text += '\n')
                }, getRandom(100, 50) * 100)

                for (let line of block.lines) {
                    setTimeout(() => {
                        setTextOCR(text => text += line.text += ' ')
                    }, getRandom(130, 80) * 100)
                }
            }
        } catch (err) {
            setOCRUri('')
            setTextOCR('')
        }

    }

    const handleDelete = () => {
        setOCRUri('')
        setTextOCR('')
    }

    const handleShare = () => {
        Share.share({
            title: t('QrBarCode Scanner'),
            message: textOCR
        })
    }

    return <Container>
        <View style={styles.container}>
            <Backward navigation={navigation} mode={mode} />
            <Divider bold />
            <View style={styles.cameraContainer}>
                {permission?.granted && <CameraView ref={cameraRef} videoQuality={'720p'} style={styles.cameraView} takePictureAsync={console.log} />}
                <Button style={styles.buttonPicture} onPress={takePicture}>
                    <Icon source={'camera'} color='#FFFFFF' size={32} />
                </Button>
            </View>
            {ocrUri && <View style={styles.containerOCR}>
                <View style={styles.containerOption}>
                    <Text style={styles.title}>{t('Picture analysis')}</Text>
                </View>
                {textOCR.length ?
                    <View>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.resultContainer}>
                                <ScanItem data={{ text: textOCR }} onShare={handleShare} onDelete={handleDelete} direction={'top'} />
                            </Text>
                        </ScrollView>
                    </View>
                    : <View>
                        <Text>{t('No text found')}</Text>
                    </View>}
            </View>}
        </View>
    </Container>
}

export default OCRScanner