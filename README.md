# ostosListaSQLite

Try it in the browser: https://veetihietasalo.github.io/ostosListaSQLite/
It's the web build of the mobile app, so the layout is made for a phone screen. The web demo stores items in the browser (localStorage), the phone app keeps them in SQLite.

Shopping list app (ostoslista = shopping list), made as a course assignment at a university of applied sciences in October 2023. You add a product and an amount, items are saved in a SQLite database on the device, and Bought deletes an item.

The same app with Firebase instead: [ostosListaFireBase](https://github.com/veetihietasalo/ostosListaFireBase).

## Stack

- React Native 0.72, Expo SDK 49
- `expo-sqlite` 11: database `ShoppingListDB`, one table `shopping_list` (id, product, amount)
- The UI is in `App.js`. Storage is in `storage.js` (SQLite, phone) and `storage.web.js` (localStorage, web only), with the same functions. `react-native-sqlite-storage` is in `package.json` but not used.

## Run

```
npm install
npm start
```

Then open it in Expo Go, or use `npm run android` / `npm run ios`. Store builds of Expo Go only support the latest Expo SDK, so running it on a phone now needs an SDK upgrade first.

## Web build

```
npm run build:web
npm run deploy:web
```

`build:web` runs `expo export --platform web` (Metro) into `dist/`, then `scripts/web-relative-paths.js` makes the paths relative. GitHub Pages serves the app from `/ostosListaSQLite/` and Expo SDK 49 has no base URL setting. `deploy:web` builds and pushes `dist/` to the `gh-pages` branch.

Status: course assignment (task 1), submitted 2023-10-05 in one commit. In October 2026 the storage was split out of `App.js` so the app can run as a web demo, the phone version still uses SQLite.
