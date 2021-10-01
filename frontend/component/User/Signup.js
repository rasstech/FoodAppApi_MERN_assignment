import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Picker,Text,ScrollView,View,StyleSheet,SafeAreaView,TextInput,TouchableOpacity} from 'react-native';

const Signup = ({navigation}) => {
  const [fname, onChangeFname] = useState('');
  const [lname, onChangeLname] = useState('');
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUserName] = useState('');
  const [phone, onChangePhone] = useState('');
  const [city, onChangeCity] = useState('');
  const [is_active, onChangeIsActive] = useState(false);
  const [password, onChangePassword] = useState();

  const handleSubmit = async () => {
    if (
      !fname ||
      !lname ||
      !email ||
      !username ||
      !phone ||
      !city ||
      !password 
    ) {
      alert('Please Fill all the fields');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
     
      alert('Enter a valid email');
        fname = ''
        lname =  ''
        email =  ''
        username = ''
        phone =  ''
        password =  ''
        city =  ''
        is_active=false;
      
    } else {
      try {
        const data = await fetch('http://192.168.43.14:8000/user/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fname,
            lname,
            email,
            username,
            phone,
            password,
            city,
            is_active,
          }),
        });
        if (data.status === 500 || !data) {
          alert('Account Already Exists');
        } else {
          alert('Signup successfull');
          navigation.navigate('Login')
        }
      } catch (error) {
        alert('Failed');
      }
    }
  };

  return (
    <SafeAreaView style={styles.LoginContainer}>
      <ScrollView>
        <View style={styles.Login}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              marginBottom: 10,
              marginTop: 10,
            }}>
            Create a new account
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFname}
            placeholder="First Name"
            value={fname}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLname}
            placeholder="Last Name"
            value={lname}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Email"
            value={email}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeUserName}
            placeholder="username"
            value={username}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhone}
            placeholder="Phone"
            value={phone}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Picker
            style={styles.input}
            selectedValue={city}
            onValueChange={ItemValue => onChangeCity(ItemValue)}>
            <Picker.Item label="Select Your City" value="0" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Mohali" value="Mohali" />
            <Picker.Item label="Chandigarh" value="Chandigarh" />
          </Picker>
          <View style={{flexDirection: 'row'}}>
            <CheckBox value={is_active} onValueChange={onChangeIsActive} />
            <Text> Active </Text>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.SignUpText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Already have an account ? </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
    width: 280,
    height: '100%',
    // borderWidth:1
  },
  input: {
    height: 38,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },

  SignUpText: {
    marginTop: 20,
    fontSize: 27,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    padding: 2,
    borderRadius: 20,
    // width: 200,
  },
  loginText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'red',
    color: 'white',
    padding: 4,
    borderRadius: 20,
  },
});
export default Signup;
