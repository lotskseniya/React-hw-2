import React, { useContext, useState } from "react";
import { Cart } from "./Cart";
import { CartContext } from "../../contexts/cart.context";

export const Item = (props) => {
  const { title, price, image, description } = props.item;
  const { isCartItem = false, cartQuantity = 1 } = props;
  const [quantity, setQuantity] = useState(cartQuantity);

  const {
    itemsToBuy,
    setCartData,
    changeItemQuantityAndPrice,
  } = useContext(CartContext);

  
  const onInputChange = (event) => {
    setQuantity(event.target.value)
    if (isCartItem) {
      changeItemQuantityAndPrice(props.item, event.target.value);
    }
  }

  const onAddToCartClick = (item) => {
    const newItems = [];

    for (let i = 0; i < quantity; i++) {
      newItems.push(item);
    }

    const updatedItems = [...itemsToBuy, ...newItems];

    setCartData({
      itemsToBuy: updatedItems, 
      totalPrice: updatedItems.reduce((acc, item) => (acc += item.price), 0),
    });


  };

  return (
    <div className="item">
      <h4>{title}</h4>
      <h5>{price}$</h5>
      <img src={image} alt={title} />
      <p className="item-description">{description}</p>
      <div className="item-footer">
        <input
          type="number"
          value={quantity}
          onChange={onInputChange}
        />
        {!isCartItem ? (
          <button onClick={() => onAddToCartClick(props.item)}>
            Add to cart for: <span>{(price * quantity).toFixed(2)}</span> ${" "}
          </button>
        ) : (
          <span>{(price * quantity).toFixed(2)} $ </span>
        )}
     
      </div>
    </div>
  );
};