# ostosListaSQLite

Shopping list app (ostoslista = shopping list), made as a course assignment at a university of applied sciences in October 2023. You add a product and an amount, items are saved in a SQLite database on the device, and Bought deletes an item.

The same app with Firebase instead: [ostosListaFireBase](https://github.com/veetihietasalo/ostosListaFireBase).

## Stack

- React Native 0.72, Expo SDK 49
- `expo-sqlite` 11: database `ShoppingListDB`, one table `shopping_list` (id, product, amount)
- All of the app is in `App.js` (about 100 lines). `react-native-sqlite-storage` is in `package.json` but not used.

## Run

```
npm install
npm start
```

Then open it in Expo Go, or use `npm run android` / `npm run ios`. Store builds of Expo Go only support the latest Expo SDK, so running it on a phone now needs an SDK upgrade first.

Status: course assignment (task 1), submitted 2023-10-05 in one commit, no updates since.
