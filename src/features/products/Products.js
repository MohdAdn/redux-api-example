import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsAsync } from "./productsSlice";
import "./Products.css";
import { addItemAsync } from "../Cart/cartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(productsAsync());
  }, []);

  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button onClick={() => dispatch(addItemAsync(product))}>
                Add to Cart
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
