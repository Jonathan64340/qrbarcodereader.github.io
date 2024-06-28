import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { Icon, Menu, TouchableRipple } from 'react-native-paper'
import { styles } from './styles/ScanItem.style'

const ScanItem = ({ data, onDelete, onOpenLink, onShare }) => {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)

    const closeMenu = () => setVisible(false)
    const openMenu = () => setVisible(true)

    const action = (type) => {
        if (type === 'share') {
            onShare(data.text)
            setVisible(false)
        } else {
            onDelete(data.uid)
            setVisible(false)
        }
    }

    return (
        <View style={styles.result}>
            <Text style={styles.textResult} selectable selectionColor={'orange'}>{data.text}</Text>
            <View style={styles.buttons}>
                {data?.type === 'link' ? <>
                    <TouchableRipple rippleColor={'#FFFFFF'} onPress={() => onOpenLink(data.text)} accessibilityLabel={`${t('Open link')} ${data.text}`} style={styles.button}>
                        <Icon source={'earth'} color={'#FFFFFF'} size={16} />
                    </TouchableRipple>
                    <View style={styles.separator} />
                </> : <></>}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<TouchableRipple rippleColor={'#FFFFFF'} onPress={() => openMenu()} style={styles.button} accessibilityLabel={t('Options')}>
                        <Icon source={'dots-vertical'} color={'#FFFFFF'} size={16} />
                    </TouchableRipple>}>
                    <Menu.Item onPress={() => action('share')} title={t('Share')} accessibilityLabel={t('Share {{data}}', { data: data.text })} />
                    <Menu.Item onPress={() => action('delete')} title={t('Delete')} accessibilityLabel={t('Delete {{data}}', { data: data.text })} />
                </Menu>
            </View>
        </View>
    )
}

export default ScanItem