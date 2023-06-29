import React, { useState } from "react";
import Modal from "react-modal";
import { Item } from "./Item";
import { CartContext } from "../../contexts/cart.context";

export const Cart = (props) => {
  console.log(props, "PROPS OF CART");
  const {children} = props;

  const [itemsToBuy, setItemsToBuy] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isCartOpen, setIsCartOpen] = useState(false);

 
  return (
    <CartContext.Provider
      value={{ itemsToBuy, totalPrice, setItemsToBuy, setTotalPrice }}
    >
         <Modal
        appElement={document.getElementById("App")}
        isOpen={isCartOpen}
        className="cart modal-dialog"
      >
        <div className="cart-header">
          <h1>Cart</h1>
          <div>
            {/* <p></p> */}
          </div>
          <button type="button" className="btn-close" aria-label="Close"></button>
        </div>
       
        <div className="cart-footer">
          <h4>Total: {totalPrice}</h4>
          <button className="purchase">Purchase</button>
        </div>
      </Modal>
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="btn btn-outline-info">Open Cart</button>

      {children}
    </CartContext.Provider>
  );
};