import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { styles } from './styles/Backward.style';

const Backward = ({ navigation, mode }) => {

    const { t } = useTranslation()

    return (
        <View style={styles.container}>
            <Button icon={'keyboard-backspace'} mode='contained' onPress={() => navigation.goBack()} style={styles.button} accessibilityLabel={t('Back')}>{t('Back')}</Button>
            <Text>
                {mode === 'qr' && t('Code QR') ||
                    mode === 'bar' && t('Code BAR') ||
                    mode === 'ocr' && t('Code OCR')}
            </Text>
        </View>
    )
}

export default Backward