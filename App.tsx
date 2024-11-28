import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <AppNavigator />
    </>
  );
};

export default App;
