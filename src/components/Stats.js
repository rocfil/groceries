// criando os componentes da aplicação: logo, form, packing list, stats
// todos os componentes foram transferidos para outros arquivos, sendo importados no início do código
export default function Stats({ items }) {
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
