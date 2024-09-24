import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeItemFromCart, updateCartQuantity } from "../../actions/cartAction";
import { payment } from "../../actions/orderAction";

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems, restaurant } = useSelector((state) => state.cart);

  // Local state to manage quantities and cart items
  const [localCartItems, setLocalCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchCartItems(alert));
  }, [dispatch, alert]);

  useEffect(() => {
    // Initialize local state with cart items' quantities
    const initialQuantities = {};
    const initialCartItems = cartItems.map((item) => {
      initialQuantities[item.foodItem._id] = item.quantity;
      return item;
    });
    setQuantities(initialQuantities);
    setLocalCartItems(initialCartItems);
  }, [cartItems]);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id, alert))
      .then(() => {
        // Remove item from local state immediately
        setLocalCartItems(localCartItems.filter(item => item.foodItem._id !== id));
      })
      .catch(error => {
        alert.error("Failed to remove item");
      });
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      alert.error("Exceeded stock limit");
    } else {
      setQuantities((prev) => ({
        ...prev,
        [id]: newQty,
      }));
      dispatch(updateCartQuantity(id, newQty, alert));
    }
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      alert.error("At least one item should be there");
    } else {
      setQuantities((prev) => ({
        ...prev,
        [id]: newQty,
      }));
      dispatch(updateCartQuantity(id, newQty, alert));
    }
  };

  const checkoutHandler = () => {
    console.log("Checkout button clicked");
    dispatch(payment(cartItems, restaurant)).then(() => {
      console.log("Payment action dispatched");
    }).catch(error => {
      console.error("Payment action failed:", error);
    });
  };
  

  return (
    <>
      {localCartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{localCartItems.length} items</b>
          </h2>
          <h3 className="mt-5">
            Restaurant: <b>{restaurant.name}</b>
          </h3>

          <div className="row d-flex justify-content-between cartt">
            <div className="col-12 col-lg-8">
              {localCartItems.map((item) => (
                <div className="cart-item" key={item.foodItem._id}>
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.foodItem.images[0].url}
                        alt="items"
                        height="90"
                        width="115"
                      />
                    </div>
                    <div className="col-5 col-lg-3">{item.foodItem.name}</div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">
                        <span>&#8377;</span>
                        {item.foodItem.price}
                      </p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item.foodItem._id, quantities[item.foodItem._id] || item.quantity)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={quantities[item.foodItem._id] || item.quantity}
                          readOnly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item.foodItem._id, quantities[item.foodItem._id] || item.quantity, item.stock)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeCartItemHandler(item.foodItem._id)}
                      ></i>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {localCartItems.reduce(
                      (acc, item) => acc + (quantities[item.foodItem._id] || item.quantity),
                      0
                    )}
                    (Units)
                  </span>
                </p>
                <p>
                  Total:
                  <span className="order-summary-values">
                    <span>&#8377;</span>
                    {localCartItems
                      .reduce(
                        (acc, item) =>
                          acc + (quantities[item.foodItem._id] || item.quantity) * item.foodItem.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block"
                onClick={checkoutHandler}>
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
