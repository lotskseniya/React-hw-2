import React, { useState, useEffect } from "react";

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
          <div className="col mb-5">
            <div className="card h-100">
              <p>
                <strong>{item.title}</strong>
              </p>
              <img src={item.image} alt={item.title} className="image" />
              <p>{item.price} $</p>
            </div>
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
};
