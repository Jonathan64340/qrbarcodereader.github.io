import React from 'react';
import { Menu } from 'react-native-paper';
import { View, Text } from 'react-native';

// flag-variant

const Language = () => {

    const change = (lng) => {
        console.log(lng)
    }

    return (
        <View>
            <Menu.Item onPress={() => change('fr_FR')} title={t('French')} />
            <Menu.Item onPress={() => change('en_US')} title={t('English')} />
        </View>
    )
}

export default Language