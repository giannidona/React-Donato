import { Item } from "../components/Items";

export const ItemList = ({ products }) => {
  return products.map((products) => <Item key={products.id} prod={products} />);
};
