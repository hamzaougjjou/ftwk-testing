import { useSelector } from "react-redux";

function ProductInCart({ id }) {

  let Cart = useSelector(state => state.Cart);
  const existingItem = Cart.find(item => item.id === id);
  return existingItem;

}

export default ProductInCart