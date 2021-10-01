import React, {useState} from 'react';
import {View, Picker, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManageFood from './ManageFood';
import {useFocusEffect} from '@react-navigation/native';

function UserSetting() {
  const [City, onChangeCity] = useState('');

  // set default user city
  const loadCity = async () => {
    const FoodAppUserData = await AsyncStorage.getItem('FoodAppUserData');
    let local_city = JSON.parse(FoodAppUserData).city;
    onChangeCity(local_city);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCity();
    }, []),
  );

  // user setting
  const updateCity = async ItemValue => {
    onChangeCity(ItemValue);
    const city = ItemValue;
    // console.warn('local:',city)

    try {
      const FoodAppUserData = await AsyncStorage.getItem('FoodAppUserData');
      let _id = JSON.parse(FoodAppUserData)._id;
      // console.warn('User',_id)
      let local_city = JSON.parse(FoodAppUserData).city;
      const res = await fetch(`http://192.168.43.14:8000/user/update/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({city}),
      });
      if (res.status === 400) {
        alert('Sorry , Not Updated');
      } else {
        // fetch user data from AsyncStorage;
        const userObj = await AsyncStorage.getItem('FoodAppUserData');
        const userobjData = JSON.parse(userObj);
        userobjData.city = city;
        // set user Data with new city in AsyncStorage;
        await AsyncStorage.setItem(
          'FoodAppUserData',
          JSON.stringify(userobjData),
        );
        alert('Updated successfully');
      }
    } catch (error) {
      alert('Select city');
    }
  };

  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 30, marginTop: 40}}>
          Change City
        </Text>
      </View>
      <View style={{marginTop: 30, margin: 40, backgroundColor: '#ffffff'}}>
        <Picker
          selectedValue={City}
          onValueChange={ItemValue => updateCity(ItemValue)}>
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Mohali" value="Mohali" />
          <Picker.Item label="Chandigarh" value="Chandigarh" />
        </Picker>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const SettingPage = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="User Setting" component={UserSetting} />
      <Tab.Screen name="Manage Food" component={ManageFood} />
    </Tab.Navigator>
  );
};

export default SettingPage;
