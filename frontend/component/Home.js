import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [foodList, setFoodList] = useState([]);
  const loadData = async () => {
    try {
      const FoodAppUserData = await AsyncStorage.getItem('FoodAppUserData');
      const City = JSON.parse(FoodAppUserData).city;

      // * fetch foodlist by passing city
      const cityResult = await fetch('http://192.168.43.14:8000/food/city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({City}),
      });
      let foodListByCity = await cityResult.json();
      setFoodList(foodListByCity);
      // console.warn(foodList);
    } catch (error) {
      console.warn('home error', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <View style={styles.HomeContainer}>
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
              <TouchableOpacity>
                <Text style={styles.FoodListBtn}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    backgroundColor: 'skyblue',
    padding: 10,
    alignItems: 'center',
  },

  FoodList: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 350,
    height: 280,
  },
  FoodListItem: {
    color: '#fff',
    fontSize: 17,
    margin: 10,
  },
  FoodListBtn: {
    position: 'absolute',
    top: 200,
    right: 20,
    width: 150,
    backgroundColor: 'gold',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    // color: '#fff',
  },
});

export default Home;
