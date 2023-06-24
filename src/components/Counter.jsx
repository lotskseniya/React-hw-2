import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState("");

  const name = "Igor";
  const age = 23;

  const user = {
    name: name,
    age: age,
  };

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const arr2 = [{ name: "Igor" }, { name: "Oleg" }];

  const onClickButtton = () => {
    alert(value);
  };

  const showPersonData = (person) => {
    console.log(person);
  };

  console.log(value, "value");

  return (
    <main>
      <div>
        <h1>
          Counter: {counter}
          <button onClick={() => setCounter(counter + 1)}>+</button>
          <button onClick={() => setCounter(counter - 1)}>-</button>
        </h1>
        <h2>
          Counter, {user.name} {user.age}
        </h2>
        <p>{arr}</p>
        {arr2.map((person, i) => (
          <div key={person.name + i}>
            <p>User: {person.name}</p>
            <button onClick={() => showPersonData(person)}>
              Show person info
            </button>
          </div>
        ))}
      </div>
      <div>
        <p>{value}</p>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={onClickButtton}>Click</button>
      </div>
    </main>
  );
};
