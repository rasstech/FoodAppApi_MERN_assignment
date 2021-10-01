import React, {useState} from 'react';
import {  View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

const ManageFood = ({navigation}) => {
  const [foodList, setfoodList] = useState([]);
  const getFoodData = async () => {
    let res = await fetch('http://192.168.43.14:8000/food/foodlist');
    let data = await res.json();
    setfoodList(data);
    // console.warn(foodList);
  };

  // Remove Food item
  const RemoveItem = async id => {
    await fetch(`http://192.168.43.14:8000/food/deleteFood/${id}`, {
      method: 'DELETE',
    });
    getFoodData();
  };

  useFocusEffect(
    React.useCallback(() => {
      getFoodData();
    }, []),
  );
  return (
    <View style={styles.ManageFood}>
      <TouchableOpacity onPress={() => navigation.navigate('AddfoodForm')}>
        <Text style={styles.FoodListAddBtn}> Add </Text>
      </TouchableOpacity>
      <ScrollView>
        {foodList.map((item, index) => {
          return (
            <View style={styles.FoodList}>
              <View>
                <Text style={styles.FoodListItem}>Title</Text>
                <Text style={styles.FoodListItem}>SubTitle</Text>
                <Text style={styles.FoodListItem}>Price</Text>
                <Text style={styles.FoodListItem}>Available</Text>
                <Text style={styles.FoodListItem}>City</Text>
              </View>
              <View key={index}>
                <Text style={styles.FoodListItem}>{item.Title}</Text>
                <Text style={styles.FoodListItem}>{item.Subtitle}</Text>
                <Text style={styles.FoodListItem}>{item.Price} INR</Text>
                {item.IsAvailable ? (
                  <Text style={styles.FoodListItem}>Yes </Text>
                ) : (
                  <Text style={styles.FoodListItem}> No </Text>
                )}

                <Text style={styles.FoodListItem}>{item.City}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditfoodForm', item._id)}>
                  <Text style={styles.FoodListBtn}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RemoveItem(item._id)}>
                  <Text style={styles.FoodListBtnDelete}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  FoodListAddBtn: {
    backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 22,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
  },
  ManageFood: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'skyblue',
  },

  FoodList: {
    position: 'relative',
    top: -10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor: 'skyblue',
    borderWidth: 1,
    margin: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FoodListItem: {
    color: '#fff',
    fontSize: 17,
    margin: 10,
  },
  FoodListBtn: {
    backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
  },
  FoodListBtnDelete: {
    backgroundColor: '#B22222',
    textAlign: 'center',
    fontSize: 14,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
  },
});

export default ManageFood;
