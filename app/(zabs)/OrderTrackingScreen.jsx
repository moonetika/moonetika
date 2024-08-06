// src/screens/OrderTrackingScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';


const OrderTrackingScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // const response = await axios.get('YOUR_ORDER_API_ENDPOINT');
        const response = { data: { status: 200, orders :[{ id: 123456, status: 'entregado'}, {id: 1234567, status: 'en progreso'}]}};
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.order}>
            <Text>Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  order: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'gray' },
});

export default OrderTrackingScreen;
