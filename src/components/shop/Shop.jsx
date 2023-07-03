import React, { useState, useEffect } from "react";
import { Item } from "./Item";
import { Cart } from "./Cart";

export const Shop = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // const [searchResults, setSearchResults] = useState([]);
  const searchResults = inputValue
    ? items.filter((product) => product.title.toLowerCase().includes(inputValue.toLowerCase())
    || product.price === +inputValue
    )
    : [];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
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
            type="text"
            placeholder="Search the product"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
      </header>
      <main>
        {(inputValue ? searchResults : items).map((item) => (
          <Item item={item} />
        ))}
      </main>
      <footer></footer>
      </Cart>
    </div>
  );
};
