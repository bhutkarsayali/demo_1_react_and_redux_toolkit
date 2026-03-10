import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "./redux-store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  //   const [cartItems, setCartItems] = useState([]);
  const cartSelector = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Cart Items:", cartSelector);
  }, [cartSelector]);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    const qty = Math.max(1, parseInt(newQuantity) || 1);
    dispatch(updateQuantity({ id, quantity: qty }));
  };
//   const manageQuantityChange = (iFtemId, newQuantity) => {
//     // Implementation for managing quantity change
//     // console.log(`Changing quantity for item ${itemId} to ${newQuantity}`);
//     let quantityy = newQuantity > 1 ? parseInt(newQuantity) : 1;
//     dispatch(updateCart({ id: itemId, quantity: quantityy }));
//   };
  const placeOrder = () => {
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <h1>Cart Page</h1>
      <div className="cart-container">
        {cartSelector.length > 0 ? (
          cartSelector.map((item) => (
            <div key={item.id} className="cart-item">
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ height: "200px" }}
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.brand}</p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <h3>Quantity: {item.quantity}</h3>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity ? item.quantity : 1}
                  style={{ width: "100px", padding: "5px" }}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                />
                <h3>
                  $
                  {item.quantity
                    ? (item.price * item.quantity).toFixed(2)
                    : item.price.toFixed(2)}
                </h3>
                <button
                  className="remove-from-cart"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is currently empty.</p>
        )}

        {cartSelector.length && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h2 style={{ color: "black" }}>
              Total : ${" "}
              {cartSelector
                .reduce(
                  (total, item) =>
                    item.quantity
                      ? total + item.price * item.quantity
                      : total + item.price,
                  0,
                )
                .toFixed(2)}
            </h2>
            <button className="remove-from-cart" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        )}
        {cartSelector.length && (
          <button className="clear-cart" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        )}
      </div>
    </>
  );
};
export default Cart;
