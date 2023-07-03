import React, { useState } from "react";
import { createContext } from "react";
import Modal from "react-modal";
import { CartContext } from "../../contexts/cart.context";
import { Item } from "./Item";
import { Sort } from "./Sort";

export const Cart = (props) => {
  console.log(props, "PROPS OF CART");
  const [itemsToBuy, setItemsToBy] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const onToggleModal = () => setIsCartOpen(!isCartOpen);

  const changeItemQuantity = (item, quantity) => {
    const clearedItems = itemsToBuy.filter(
      (itemToRemove) => itemToRemove.id !== item.id
    );

    for (let i = 0; i < quantity; i++) {
      clearedItems.push(item);
    }

    setItemsToBy(clearedItems);
  };

  const recalculateTotalPrice = (items) => {
    const totalCalculatedPrice = items.reduce(
      (acc, item) => (acc += item.price),
      0
    );
    setTotalPrice(totalCalculatedPrice);
    return totalCalculatedPrice;
  };

  const generateCartItems = (items) => {
    const mappedItems = items.reduce((acc, item) => {
      // acc[item.id] = {item, quantity: items.filter((findingItem) =>
      //  item.id === findingItem.id).length};

      if (!acc[item.id]) {
        acc[item.id] = {
          item,
          quantity: 1,
        };
      } else {
        acc[item.id].quantity++;
      }
      return acc;
    }, {});

    // console.log(mappedItems, "mappedItems");

    return Object.values(mappedItems);
  };

  const resultOfGruppedItems = generateCartItems(itemsToBuy);
  // console.log(resultOfGruppedItems, "resultOfGruppedItems");

  const cartItems = [];
  resultOfGruppedItems.forEach((item) => {
    cartItems.push({
      name: item.item.title,
      quantity: item.quantity,
      price: item.quantity * item.item.price,
    })
  })
  console.log(cartItems, "cartItems")

  return (
    <CartContext.Provider
      value={{
        itemsToBuy,
        totalPrice,
        setItemsToBy,
        setTotalPrice,
        recalculateTotalPrice,
        changeItemQuantity,
      }}
    >
      <Modal
        appElement={document.getElementById("App")}
        isOpen={isCartOpen}
        shouldCloseOnOverlayClick={true}
        className="cart"
      >
        <div className="cart-header">
          <h1>Cart</h1>
          <button onClick={onToggleModal}>Close</button>
        </div>
        <div>
          <Sort
            defaultValue="Sort by:"
            options={[{ price: "price", name: "From highest" }]}
          />
          {cartItems.map(({ name, quantity, price }) => (
            <div>
               <h3>{name}</h3>
               <input type="number" value={quantity} onChange={changeItemQuantity}></input>
               <h4>{price}</h4>
            </div>
          ))}

        </div>
        <div className="cart-footer">
          <h4>Total: {totalPrice.toFixed(2)}</h4>
          <button className="purchase">Purchase</button>
        </div>
      </Modal>
      <button onClick={onToggleModal}>OPEN MODAL</button>

      {props.children}
    </CartContext.Provider>
  );
};
