// Web storage for the browser demo. expo-sqlite needs WebSQL on web, which
// browsers have dropped, so the list is kept in localStorage instead.
// Same functions as storage.js. If localStorage is blocked the list still
// works, it just isn't kept after a reload.
const KEY = 'shopping_list';

let data = { nextId: 1, items: [] };

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && Array.isArray(saved.items)) data = saved;
  } catch (e) {
    // keep the in-memory list
  }
  return data;
};

const save = (next) => {
  data = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    // keep the in-memory list
  }
};

export const initStorage = () => {
  load();
};

export const listItems = (onResult) => {
  onResult([...load().items]);
};

export const addItem = (product, amount, onDone) => {
  const { nextId, items } = load();
  save({ nextId: nextId + 1, items: [...items, { id: nextId, product, amount }] });
  onDone();
};

export const deleteItem = (id, onDone) => {
  const { nextId, items } = load();
  save({ nextId, items: items.filter(item => item.id !== id) });
  onDone();
};
