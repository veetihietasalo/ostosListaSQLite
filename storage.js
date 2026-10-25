// Phone storage: SQLite database ShoppingListDB with one table, shopping_list.
// The web build uses storage.web.js instead.
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ShoppingListDB');

export const initStorage = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS shopping_list (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount TEXT);'
    );
  });
};

export const listItems = (onResult) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM shopping_list;', [], (_, { rows }) =>
      onResult(rows._array)
    );
  });
};

export const addItem = (product, amount, onDone) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO shopping_list (product, amount) VALUES (?, ?);', [product, amount]);
  }, null, onDone);
};

export const deleteItem = (id, onDone) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM shopping_list WHERE id = ?;', [id]);
  }, null, onDone);
};
