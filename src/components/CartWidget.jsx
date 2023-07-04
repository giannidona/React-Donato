import cart from "../assets/cart.svg";

export const CartWidget = () => {
  return (
    <>
      <img src={cart} alt="cart" />
      <span style={{ color: "white" }}>0</span>
    </>
  );
};
