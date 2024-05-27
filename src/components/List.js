import { useState } from "react";

// criando os componentes da aplicação: logo, form, packing list, stats
// todos os componentes foram transferidos para outros arquivos, sendo importados no início do código
export default function List({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  // implementando recurso de ordenar os itens na lista:
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "incart")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.inCart) - Number(b.inCart));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Ordenar: Ordem de inclusão</option>
          <option value="description">Ordenar: Descrição</option>
          <option value="incart">Ordenar: No carrinho</option>
        </select>
        <button onClick={onClearList}>Limpar lista</button>
      </div>
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
