// src/screens/ProductDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;
