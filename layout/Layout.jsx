import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routesScreen } from '../config/routes';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Layout = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={
            {
                headerShown: false
            }
        }>
            {
                routesScreen.map((route, index) => <Stack.Screen key={index} {...route} />)
            }
        </Stack.Navigator>
    </NavigationContainer>
}

export default Layout