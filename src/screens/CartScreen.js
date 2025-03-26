// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };
    fetchCart();
  }, []);

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Total: ${getTotal()}</Text>
      <Button title="Checkout" onPress={() => alert('Checkout clicked')} />
    </View>
  );
};

export default CartScreen;
