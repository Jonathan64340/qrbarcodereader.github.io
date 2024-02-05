import React from 'react';
import { Text, View } from 'react-native';
import Container from '../../components/Container/Container';
import { styles } from './styles/Home.style';
import { Button, Icon, TouchableRipple } from 'react-native-paper';
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
                <TouchableRipple style={styles.button} rippleColor={'white'}
                    onPress={() => openScan('qr')} accessibilityLabel={('Scan Code QR')}>
                    <View mode="contained" style={styles.innerButton} onPress={() => openScan('qr')}>
                        <Icon source={'qrcode-scan'} color='#FFFFFF' size={18} />
                        <Text style={styles.buttonText}>{t('Scan Code QR')}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple style={styles.button} rippleColor={'white'}
                    onPress={() => openScan('bar')} accessibilityLabel={('Scan Code BAR')}>
                    <View mode="contained" style={styles.innerButton} onPress={() => openScan('bar')}>
                        <Icon source={'barcode-scan'} color='#FFFFFF' size={18} />
                        <Text style={styles.buttonText}>{t('Scan Code BAR')}</Text>
                    </View>
                </TouchableRipple>
            </View>
            <Helper />
        </Container>
    )
}

export default Home