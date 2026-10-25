import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// SQLite on the phone (storage.js), localStorage on web (storage.web.js)
import * as storage from './storage';

const App = () => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    storage.initStorage();
    updateList();
  }, []);

  const updateList = () => {
    storage.listItems(setShoppingList);
  };

  const saveItem = () => {
    storage.addItem(product, amount, updateList);
    setProduct('');
    setAmount('');
  };

  const deleteItem = (id) => {
    storage.deleteItem(id, updateList);
  };

  return (
    <View style={{ margin: 130 }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product"
          value={product}
          onChangeText={(text) => setProduct(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>
      <Button title="Save" onPress={saveItem} />
      <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
        Shopping List
      </Text>
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text>{`${item.product}, ${item.amount}`}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={{ color: 'blue' }}> Bought</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
});

export default App;
