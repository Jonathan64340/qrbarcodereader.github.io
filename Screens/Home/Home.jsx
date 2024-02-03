import React from 'react';
import { Text, View } from 'react-native';
import Container from '../../components/Container/Container';
import { styles } from './styles/Home.style';
import { Button } from 'react-native-paper';
import Helper from '../../components/Helper/Helper';
import { useTranslation } from 'react-i18next'

const Home = ({ navigation }) => {

    const { t } = useTranslation()

    const openScan = (mode) => {
        if (mode === 'qr') {
            navigation.navigate('Scanner', {
                mode: 'qr',
            })
        } else {
            navigation.navigate('Scanner', {
                mode: 'bar',
            })
        }
    }

    return (
        <Container>
            <View style={styles.container}>
                <Button icon={'qrcode-scan'} mode="contained" style={styles.button} onPress={() => openScan('qr')}>
                    <Text style={styles.buttonText}>{t('Scan Code QR')}</Text>
                </Button>
                <Button icon={'barcode-scan'} mode="contained" style={styles.button} onPress={() => openScan('bar')}>
                    <Text style={styles.buttonText}>{t('Scan Code BAR')}</Text>
                </Button>
            </View>
            <Helper />
        </Container>
    )
}

export default Home