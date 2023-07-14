import React, { useState, useEffect, useMemo } from "react";
import { Item } from "./Item";
import { Cart } from "./Cart";
import { useFetchData } from "../../hooks/useFetchData";
import { Circles } from "react-loader-spinner";
import { useRef } from "react";

export const Shop = () => {
  const optionsRef = useRef({method: "GET"});

  const [fetchData, isLoading] = useFetchData(
    "https://fakestoreapi.com/products", optionsRef.current, []
    );
  const {data: items} = fetchData;
  const [inputValue, setInputValue] = useState("");
  
  // const [searchResults, setSearchResults] = useState([]);
  const searchResults = useMemo(
  () =>  inputValue
    ? items.filter((product) => product.title.toLowerCase().includes(inputValue.toLowerCase())
    || product.price === +inputValue
    )
    : [],
    [inputValue, items]);

  return (
    <div className="wrapper">
      {isLoading && (
        <div  className="loader-wrapper"> 
        <Circles
        height="80"
        width="80"
        color="#963bec"
        ariaLabel="circles-loading"
        wrapperClass=""
        visible={true}
      />
        </div>
      )}
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
          <Item key={item.id} item={item} />
        ))}
      </main>
      <footer></footer>
      </Cart>
    </div>
  );
};
