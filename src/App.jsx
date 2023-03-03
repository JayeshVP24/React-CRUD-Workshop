import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const shoppingListPre = [
  {
    name: "pizza",
    quantity: 4,
  },
  {
    name: "burger",
    quantity: 2,
  },
  {
    name: "pasta",
    quantity: 6,
  },
];

const Greeting = () => {
  const name = "Joey"
  return (
      <div className="hello-world">
          <h1>Hello, {name}</h1>
      </div>
  );
};

const App = () => {
  return (
      <div className="App">
          <Greeting name="Joey" />
          <Greeting name="Chandler" />
          <Greeting name="Ross" />
      </div>
  );
}

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  useEffect(() => {
    // fetch data from api
    setShoppingList(shoppingListPre);
  }, []);
  const incrementQuantity = (name) => {
    const index = shoppingList.findIndex((item) => item.name === name);
    const newList = [...shoppingList];
    newList[index].quantity += 1;
    setShoppingList(newList);
  }
  const decrementQuantity = (name) => {
    const index = shoppingList.findIndex((item) => item.name === name);
    if(shoppingList[index].quantity === 1) {
      const newList = shoppingList.filter((item, ind) => ind !== index);
      setShoppingList(newList);
    } else {
      const newList = [...shoppingList];
      newList[index].quantity -= 1;
      setShoppingList(newList);
    }
  }
  const addItem = (name, quantity) => {
    if(shoppingList.find((item) => item.name === name)) {
      const index = shoppingList.findIndex((item) => item.name === name);
      const newList = [...shoppingList];
      newList[index].quantity += quantity;
      setShoppingList(newList);
    } else {
      const newList = [...shoppingList];
      newList.push({ name, quantity });
      setShoppingList(newList);
    }
  }
  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Shopping list</h1>
      <div className="list">
        {shoppingList.map((item) => (
          <div className="item" key={item.name}>
            <p>{item.name}</p>
            <span>
              <button onClick={() => decrementQuantity(item.name)} >-</button>
              <p>{item.quantity}</p>
              <button onClick={() => incrementQuantity(item.name)} >+</button>
            </span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get("NAME").valueOf();
          const quantity = Number(formData.get("QUANTITY").valueOf());
          console.log(name, quantity);
          addItem(name, quantity);
        }}
      >
        <input type="text" name="NAME" placeholder="name" />
        <input type="number" name="QUANTITY" placeholder="quantity" />
        <button type="submit" id="add">
          Add
        </button>
      </form>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;
