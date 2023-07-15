import React, { useState, useEffect, useMemo } from "react";
import { Item } from "./Item";
import { Cart } from "./Cart";
import { useFetchData } from "../../hooks/useFetchData";
import { Rings } from "react-loader-spinner";
import { useRef } from "react";

export const Shop = () => {
  const optionsRef = useRef({ method: "GET" });
  const [fetchData, isLoading] = useFetchData(
    "https://fakestoreapi.com/products",
    optionsRef.current,
    []
  );
  const { data: items } = fetchData;
  const [inputValue, setInputValue] = useState("");

  const searchResults = useMemo(
    () =>
      inputValue
        ? items.filter(
            (product) =>
              product.title.toLowerCase().includes(inputValue.toLowerCase()) ||
              product.price === +inputValue
          )
        : [],
    [inputValue, items]
  );

   return (
    <div className="wrapper">
      <Cart>
        <header>
          <h2>Shop</h2>
          <div className="form">
            <input
              type="text"
              className="input-style"
              placeholder="Search the product"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
        </header>
        <main>
        {isLoading && (
        <div>
          <Rings
            height="200"
            width="200"
            color="#dfdddd"
            radius="6"
            wrapperClass="loader-wrapper"
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      )}
          {(inputValue ? searchResults : items).map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </main>
        <footer></footer>
      </Cart>
    </div>
  );
};
