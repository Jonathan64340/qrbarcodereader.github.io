import React from 'react';
import { Text, View } from 'react-native'
import { styles } from './styles/Version.style';
import { useTranslation } from 'react-i18next'

const Version = () => {

    const { t } = useTranslation()

    return (
        <View style={styles.container}>
            <Text style={styles.textVersion}>Jonathan Mazières - {t('Version')} 1.2.1</Text>
        </View>
    )
}

export default Version