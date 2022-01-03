/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//import liraries
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

// create a component
const App = () => {
  return (
    <NavigationContainer>
      {/* Only one time NavigationContainer is declare in project. */}
      <AppNavigator />
    </NavigationContainer>
  );
};

//make this component available to the app
export default App;
