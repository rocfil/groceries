import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import List from "./List";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Olive Oil", quantity: 1, inCart: false },
  { id: 2, description: "Beans", quantity: 2, inCart: false },
  { id: 3, description: "Milk", quantity: 2, inCart: true },
];

export default function App() {
  // state to add a new item
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Tem certeza que deseja apagar todos os itens ?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
