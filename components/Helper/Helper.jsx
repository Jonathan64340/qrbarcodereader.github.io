import React, { useState } from 'react';
import { Modal, Portal, Text, Icon, TouchableRipple, Button, Divider } from 'react-native-paper';
import { View } from 'react-native'
import { styles } from './styles/Helper.style';
import { useTranslation } from 'react-i18next'

const Helper = () => {

    const { t } = useTranslation()

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>
            <Portal>
                <Modal visible={visible} contentContainerStyle={styles.modalStyle}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>{t('Warning')}</Text>
                        <Button mode='contained-tonal' onPress={hideModal}>{t('Close')}</Button>
                    </View>
                    <Text>{t('This QR code reader application offers you maximum convenience, but the responsibility for checking the security of the QR codes you scan lies entirely with the user.')}</Text>
                    <Text>{t('We accept no responsibility for any dispute, damage or problem resulting from the content of the scanned QR codes.')}</Text>
                    <Text>{t('Be vigilant and make sure you scan codes from reliable sources. If in doubt, refrain from scanning the code.')}</Text>
                    <Divider bold />
                    <Text>{t('Thank you for your understanding and caution!')}</Text>
                </Modal>
            </Portal>
            {!visible ? <TouchableRipple style={styles.button} onPress={showModal}>
                <Icon source={'information'} size={28} />
            </TouchableRipple> : <View style={styles.button}>
                <Icon source={'information'} size={28} />
            </View>}
        </>
    )
}

export default Helper