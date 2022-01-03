import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import AddImageScreen from '../screens/AddImageScreen';
import EditImageScreen from '../screens/EditImageScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddImageScreen" component={AddImageScreen} />
      <Stack.Screen name="EditImageScreen" component={EditImageScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
