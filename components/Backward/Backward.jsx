import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import { styles } from './styles/Backward.style';

const Backward = ({ navigation, mode }) => {

    const { t } = useTranslation()
    
    return (
        <View style={styles.container}>
            <Button icon={'keyboard-backspace'} mode='contained' onPress={() => navigation.goBack()}>{t('Back')}</Button>
            <Text>{mode === 'qr' ? t('Code QR') : t('Code BAR')}</Text>
        </View>
    )
}

export default Backward