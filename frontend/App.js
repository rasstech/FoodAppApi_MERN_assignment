/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './component/User/Login';
import Signup from './component/User/Signup';
import LogOut from './component/User/LogOut';
import Home from './component/Home';
import SettingPage from './component/SettingScreen/SettingPage';
import AddfoodForm from './component/SettingScreen/AddfoodForm';
import EditfoodForm from './component/SettingScreen/EditFoodForm';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="coral"
        barStyle="light-content"
      />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={() => ({
            title: 'Login',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
          })}
          component={Login}
        />
        <Stack.Screen name="LogOut" component={LogOut} />
        <Stack.Screen
          name="Signup"
          options={() => ({
            title: 'SignUp',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
              
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
          })}
          component={Signup}
        />
        <Stack.Screen
          name="Home"
          options={() => ({
            title: 'HOME',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerRight: () => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SettingPage')}>
                  <Text style={{color: '#fff', fontSize: 20}}> Setting </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LogOut')}>
                  <Text style={{color: '#fff', fontSize: 20}}> Logout </Text>
                </TouchableOpacity>
              </>
            ),
          })}
          component={Home}
        />
        <Stack.Screen
          options={() => ({
            title: 'Setting',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
          })}
          name="SettingPage"
          component={SettingPage}
        />
        <Stack.Screen
          options={() => ({
            title: 'Add Food',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
          })}
          name="AddfoodForm"
          component={AddfoodForm}
        />
        <Stack.Screen
          options={() => ({
            title: 'Edit Food',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
            },
            headerStyle: {
              backgroundColor: 'coral',
            },
          })}
          name="EditfoodForm"
          component={EditfoodForm}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default App;
