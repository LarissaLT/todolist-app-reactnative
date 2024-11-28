import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/AppNavigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

const SplashScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/todolist.logo.png')}
            style={{ width: 300, height: 200, marginBottom: 40 }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;
