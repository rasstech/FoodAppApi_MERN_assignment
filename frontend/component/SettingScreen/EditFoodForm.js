import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import {
  Picker,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const EditfoodForm = ({navigation}) => {
  const route = useRoute();
  const id = route.params;
  const [Title, onChangeTitle] = useState('');
  const [Subtitle, onChangeSubTitle] = useState('');
  const [Price, onChangePrice] = useState('');
  const [City, onChangeCity] = useState('');
  const [IsAvailable, onChangeIsAvailable] = useState(false);


  const handleSubmit = async () => {
    if (!Title || !Subtitle || !Price || !City) {
      alert('Please Fill all the fields');
    } else {
      try {
        const res = await fetch(
          `http://192.168.43.14:8000/food/updateFood/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({Title, Subtitle, Price, City, IsAvailable}),
          },
        );
        if (res.status === 500) {
          alert('Sorry , Not Found');
        } else {
          alert('added successfully');
          navigation.navigate('SettingPage');
          
        }
      } catch (error) {
        console.log(error);
        alert('Enter  Valid  food Item');
      }
    }
  };
  const getSingleFood = async () => {
    const result = await fetch(`http://192.168.43.14:8000/food/foodlist/${id}`);
    let data = await result.json();
    onChangeTitle(data[0].Title);
    onChangeSubTitle(data[0].Subtitle);
    onChangePrice(data[0].Price);
    onChangeCity(data[0].City);
    onChangeIsAvailable(data[0].IsAvailable);
  };
  useEffect(() => {
    getSingleFood();
  }, []);
  return (
    <View style={styles.AddFoodContainer}>
      <ScrollView>
        <View style={styles.addFood}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              marginBottom: 10,
              marginTop: 10,
            }}>
            Edit Food
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            placeholder="Title"
            value={Title}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSubTitle}
            placeholder="SubTitle"
            value={Subtitle}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePrice}
            placeholder="Price"
            value={Price}
          />
          <Picker
            style={styles.input}
            selectedValue={City}
            onValueChange={ItemValue => onChangeCity(ItemValue)}>
            <Picker.Item label="Kaithal" value="Kaithal" />
            <Picker.Item label="Delhi" value="Delhi" />
            <Picker.Item label="Mohali" value="Mohali" />
            <Picker.Item label="Chandigarh" value="Chandigarh" />
          </Picker>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              value={IsAvailable}
              onValueChange={onChangeIsAvailable}
            />
            <Text> Availabe </Text>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.AddText}> Edit </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  AddFoodContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFood: {
    width: 320,
    height: '100%',
    //   borderWidth:1,
    margin: 20,
  },
  input: {
    height: 38,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },

  AddText: {
    marginTop: 20,
    fontSize: 27,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    padding: 2,
    borderRadius: 20,
  },
});
export default EditfoodForm;
