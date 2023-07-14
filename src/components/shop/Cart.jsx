import React, { useState } from "react";
import Modal from "react-modal";
import { CartContext } from "../../contexts/cart.context";
import { Item } from "./Item";
import { BsCart4 } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import img from "./img/CartIsEmpty.jpg"

export const Cart = (props) => {
  const { children } = props;

  const [cartData, setCartData] = useLocalStorageData("cartData", {
    itemsToBuy: [],
    totalPrice: 0,
  });
  const { itemsToBuy, totalPrice } = cartData;
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  const onToggleModal = () => setIsCartOpen(!isCartOpen);

  const changeItemQuantityAndPrice = (item, quantity) => {
    const clearedItems = itemsToBuy.filter(
      (itemToRemove) => itemToRemove.id !== item.id
    );

    for (let i = 0; i < quantity; i++) {
      clearedItems.push(item);
    }

    const totalCalculatedPrice = clearedItems.reduce(
      (acc, item) => (acc += item.price),
      0
    );

    setCartData({
      itemsToBuy: clearedItems,
      totalPrice: totalCalculatedPrice,
    });
  };

  const generateCartItems = (items) => {
    const mappedItems = items.reduce((acc, item) => {
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
    return Object.values(mappedItems);
  };

  const performPurchase = async () => {
    const data = await new Promise((res) => {
      setTimeout(() => res(cartData), 1500);
    });

    console.log(data, "Purchase");
    return data;
  };

  const resultOfGruppedItems = generateCartItems(itemsToBuy);
  console.log(resultOfGruppedItems, "resultOfGruppedItems");

  return (
    <CartContext.Provider
      value={{
        itemsToBuy,
        totalPrice,
        setCartData,
        changeItemQuantityAndPrice,
        
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
          <button onClick={onToggleModal} className="close-btn">
            <CgClose className="btn" onClick={onToggleModal} color="black"/> 
          </button>
        </div>
        <div className="cart-main-container">
        {!resultOfGruppedItems.length && (
          <div>
          <h3 style={{ textAlign: "center" }}>Your cart is empty</h3>
          <img src={img} alt="Cart is Empty" className="cart-empty-img"/>
          </div>
        )}
        {resultOfGruppedItems.map(({ item, quantity }) => (
          <Item
            key={item.id}
            item={item}
            isCartItem={true}
            cartQuantity={quantity}
          />
        ))}
        </div>
        <div className="cart-footer">
          {resultOfGruppedItems.length > 0 &&
          ( <>
          <h4>Total: {totalPrice.toFixed(2)} $</h4>
          <button className="purchase" onClick={performPurchase}>
             Purchase
            </button> </>)}
        </div>
      </Modal>
      <button className="cart-button btn" onClick={onToggleModal}>
        {" "}
        <BsCart4 size={30} /> <span style={{fontWeight: "bold", margin: ".3rem"}}>Your Cart</span>
        {" "} 
      </button>

      {props.children}
    </CartContext.Provider>
  );
};
