import React, { useState, useEffect } from "react";
import { Item } from "./Item";
import { Cart } from "./Cart";

export const Shop = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  let searchResults = [];
  items.forEach((item) => {
    if (
      item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.price === +inputValue
    ) {
      searchResults.push(item);
    }
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
           <Cart>
        <header>
          <h1>Shop</h1>
          <div className="form">
            <input
             className="form-control mr-sm-2"
              type="text"
              placeholder="Search for items"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          </header>
        <main>
          {(inputValue ? searchResults : items).map((item) => (
            <Item item={item} key={item.id}/>
          ))}
        </main>
        <footer></footer>
      </Cart>
    </div>
  );
};