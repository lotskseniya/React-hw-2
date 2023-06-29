import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";

export const Item = (props) => {
  const { title, price, image, description } = props.item;
  const [quantity, setQuantity] = useState(1);

  const { itemsToBuy, totalPrice, setItemsToBuy, setTotalPrice } =
    useContext(CartContext);

  const onAddToCartClick = (item) => {
    const newItems = [];

    for (let i = 0; i < quantity; i++) {
      newItems.push(item);
    }

    setItemsToBuy([...itemsToBuy, ...newItems]);
  };

  return (
  <div className="item col mb-5">
    <div className="card h-100">
      <h4>{title}</h4>
      <p style={{fontSise: '12px'}}>{price}$</p>
    <img src={image} alt={title} className="image"/>
    <p>{description.split(" ").slice(0, 40).join(" ")} ...</p>
    </div>
    <div className="item-footer">
      <input
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <button onClick={() => onAddToCartClick(props.item)}>
        Add to cart for: <span>{price * quantity}</span>$
      </button>
    </div>
  </div>
    );
};
