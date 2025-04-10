import React, { useState } from 'react';
import { Modal, Portal, Text, Icon, TouchableRipple, Button, Divider, List } from 'react-native-paper';
import { View } from 'react-native'
import { styles } from './styles/Helper.style';
import { useTranslation } from 'react-i18next'

const Helper = () => {

    const { t, i18n } = useTranslation()

    const [visible, setVisible] = useState(false);
    const [visibleLanguage, setVisibleLanguage] = useState(false)

    const showModal = () => setVisible(true);
    const showModalLanguage = () => setVisibleLanguage(true)
    const hideModal = () => setVisible(false);
    const hideModalLanguage = () => setVisibleLanguage(false)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} contentContainerStyle={styles.modalStyle}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>{t('Warning')}</Text>
                        <Button mode='contained-tonal' onPress={hideModal} accessibilityLabel={t('Close')}>{t('Close')}</Button>
                    </View>
                    <Text>{t('This QR code reader application offers you maximum convenience, but the responsibility for checking the security of the QR codes you scan lies entirely with the user.')}</Text>
                    <Text>{t('We accept no responsibility for any dispute, damage or problem resulting from the content of the scanned QR codes.')}</Text>
                    <Text>{t('Be vigilant and make sure you scan codes from reliable sources. If in doubt, refrain from scanning the code.')}</Text>
                    <Divider bold />
                    <Text>{t('Thank you for your understanding and caution!')}</Text>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={visibleLanguage} contentContainerStyle={styles.modalStyle}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>{t('Language')}</Text>
                        <Button mode='contained-tonal' onPress={hideModalLanguage} accessibilityLabel={t('Close')}>{t('Close')}</Button>
                    </View>
                    <TouchableRipple onPress={() => changeLanguage('fr_FR')}>
                        <List.Item
                            title={'Français'}
                            accessibilityLabel={t('French')}
                        />
                    </TouchableRipple>
                    <Divider />
                    <TouchableRipple onPress={() => changeLanguage('en_US')}>
                        <List.Item
                            title={'English'}
                            accessibilityLabel={t('English')}
                        />
                    </TouchableRipple>
                </Modal>
            </Portal>
            {!visible ? <TouchableRipple style={styles.button} onPress={showModal} accessibilityLabel={t('More informations')}>
                <View style={styles.buttonConainer}>
                    <Text>v 1.2.1</Text>
                    <Icon source={'information'} size={28} />
                </View>
            </TouchableRipple> : <View style={styles.button}>
                <View style={styles.buttonConainer}>
                    <Text>v 1.2.1</Text>
                    <Icon source={'information'} size={28} />
                </View>
            </View>}

            {!visibleLanguage ? <TouchableRipple style={styles.buttonLanguage} onPress={showModalLanguage} accessibilityLabel={t('Change language')}>
                <Icon source={'flag-variant'} size={28} />
            </TouchableRipple> : <View style={styles.buttonLanguage}>
                <Icon source={'flag-variant'} size={28} />
            </View>}
        </>
    )
}

export default Helper