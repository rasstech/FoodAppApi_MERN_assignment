import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Alert, Text,View,Image, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export const Login = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState();


  //?  IS user loggedIn 
   const loggedInUser = async () => {
    const FoodAppUserData = await AsyncStorage.getItem('FoodAppUserData');
    const userData = JSON.parse(FoodAppUserData);
      if (!userData) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      loggedInUser();
    }, []),
  );

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('OOPS!', 'Please fill your Credentials');
    } else {
      try {
        const res = await fetch('http://192.168.43.14:8000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        });

        let userData = await res.json();
        //  console.warn(userData)
        await AsyncStorage.setItem('FoodAppUserData', JSON.stringify(userData));
        if (res.status === 404) {
          alert("Account doesn't exist");
        } else {
          alert('Login successful');
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
        alert('Enter  Valid  Credentials');
      }

      onChangeEmail('');
      onChangePassword('');
    }
  };

  return (
    <View style={styles.LoginContainer}>
      <Image
        source={require('../food.png')}
        style={{width: 180, height: 180, marginTop: 10}}
      />
      <View style={styles.Login}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.SignupText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    width: '80%',
    height: '70%',
    position: 'relative',
    top: 60,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  loginText: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    padding: 2,
    borderRadius: 20,
    // width: 200,
  },
  SignupText: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'skyblue',
    color: 'white',
    padding: 2,
    borderRadius: 20,
    // width: 200,
  },
});

export default Login;
