import cart from "../assets/cart.svg";

export const CartWidget = () => {
  return (
    <>
      <img src={cart} alt="cart" className="cart-color" /> <span>0</span>
    </>
  );
};
