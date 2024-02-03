import { StatusBar, View, StyleSheet } from 'react-native';
import Layout from './layout/Layout';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import i18n from './i18n.config';

export default function App() {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#240B3B',
      accent: '#f1c40f',
    },
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={'transparent'} translucent />
        <Layout />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
