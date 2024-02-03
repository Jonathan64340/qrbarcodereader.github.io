import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/Container.style';
import Version from '../Version/Version';

const Container = ({ children }) => {
    return <View style={styles.container}>
        {children}
        <Version />
    </View>
}

export default Container