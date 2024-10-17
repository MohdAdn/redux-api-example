import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemAsync, productsAsync, updateItemAsync } from "./cartSlice";
import "./Cart.css";

export function Cart() {
  let value;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  useEffect(() => {
    dispatch(productsAsync());
  }, []);
  function handleChange(e, id) {
    //console.log(e.target.value);
    //this code in line 15 will not work because AsyncThunk expect the single thing transfer and you are sending the id and quantity in a seperation and this is causing the problem to avoid this you need to change it to a single object
    dispatch(updateItemAsync({ id, change: { quantity: +e.target.value } }));
  }
  return (
    <div>
      <div>
        {items?.map((item) => (
          <div key={item.id} className="CartItem">
            <img src={item.thumbnail} />
            <div>
              <p>Item: {item.title}</p>
              <p>Brand: {item.brand}</p>
              <strong>Price: ${item.price}</strong>
            </div>
            <div>
              Quantity
              <select
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div>
              <button onClick={() => dispatch(deleteItemAsync(item.id))}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <h1>
        Cart Total :{" "}
        {items.reduce((acc, item) => item.price * item.quantity + acc, 0)}
      </h1>
    </div>
  );
}
