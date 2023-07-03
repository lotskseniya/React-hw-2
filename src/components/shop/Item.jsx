import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";

export const Item = (props) => {
  const { title, price, image, description } = props.item;
  const { isCartItem = false, cartQuantity = 1 } = props;
  const [quantity, setQuantity] = useState(cartQuantity);

  const {
    itemsToBuy,
    setItemsToBy,
    recalculateTotalPrice,
    changeItemQuantity,
  } = useContext(CartContext);

   const onInputChange = (event) => {
    setQuantity(event.target.value)
    if (isCartItem) {
      changeItemQuantity(props.item, event.target.value);
      recalculateTotalPrice(itemsToBuy);
    }
  }

  const onAddToCartClick = (item) => {
    const newItems = [];

    for (let i = 0; i < quantity; i++) {
      newItems.push(item);
    }
  
    const updatedItems = [...itemsToBuy, ...newItems];
    setItemsToBy(updatedItems);
    recalculateTotalPrice(updatedItems)
  };

  // console.log(itemsToBuy, "!!!")


  return (
    <div className="item">
      <h4>{title}</h4>
      <h5>{price}$</h5>
      <img src={image} alt={title} />
      <p>{description.split(" ").slice(0, 40).join(" ")}...</p>
      <div className="item-footer">
        <input
          type="number"
          value={quantity}
          onChange={onInputChange}
        />
        {!isCartItem ? (
          <button onClick={() => onAddToCartClick(props.item)}>
            Add to cart for: <span>{price.toFixed(2) * quantity}</span> ${" "}
          </button>
        ) : (
          <span>{price.toFixed(2) * quantity} $ </span>
        )}
      </div>
    </div>
  );
};
