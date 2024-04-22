import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

// criando os componentes da aplicação: logo, form, packing list, stats
function Logo() {
  return <h1>The groceries list 🛒</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // to prevent submitting empty field

    const newItem = { description, quantity, inCart: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What you need to buy for this week?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function List({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.inCart}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.inCart ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // não esquecer de desestruturar as props com chaves

  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items to your list.</em>
      </footer>
    );

  const numItems = items.length;
  const itemsPacked = items.filter((item) => item.inCart).length;
  const percentage = Math.round((itemsPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        There {numItems > 1 ? "are" : "is"} {numItems}{" "}
        {numItems > 1 ? "items" : "item"} on your list. {itemsPacked} already in
        your cart - {percentage}%.
        <br />
        {percentage === 100 ? "Tudo certo, vamos para o caixa!" : ""}
      </em>
    </footer>
  );
}
