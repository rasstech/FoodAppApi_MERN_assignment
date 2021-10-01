import React from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut = ({navigation}) => {
  const userLoggedout = async () => {
    await AsyncStorage.removeItem('FoodAppUserData');
    navigation.navigate('Login');
  };

  useFocusEffect(
    React.useCallback(() => {
      userLoggedout();
    }, []),
  );

  return <View></View>;
};

export default LogOut;
