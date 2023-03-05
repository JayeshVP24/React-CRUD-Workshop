import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";

const shoppingListPre = [
  {
    name: "Pizza 🍕",
    quantity: 4,
  },
  {
    name: "Burger 🍔",
    quantity: 2,
  },
  {
    name: "Pasta 🍝",
    quantity: 6,
  },
];

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  useEffect(() => {
    // fetch data from api
    setShoppingList(shoppingListPre);
  }, []);
  
  
  return (
    <div className="App">
      <h1>Shopping list 🛒 </h1>
      <div className="list">
        {shoppingList.map((item) => ( //map over the shoppingList array
          <Item
            name={item.name}
            quantity={item.quantity}
            setShoppingList={setShoppingList}
            shoppingList={shoppingList}
            key={item.name}
          />
        ))}
      </div>
      <AddItemForm shoppingList={shoppingList} setShoppingList={setShoppingList} />
    </div>
  );
}

export default App;
