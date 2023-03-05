const Item = ({ name, quantity, setShoppingList, shoppingList }) => {
  const incrementQuantity = (name) => {
    const index = shoppingList.findIndex((item) => item.name === name);
    const newList = [...shoppingList];
    newList[index].quantity += 1;
    setShoppingList(newList);
  };
  const decrementQuantity = (name) => {
    const index = shoppingList.findIndex((item) => item.name === name);
    if (shoppingList[index].quantity === 1) {
      const newList = shoppingList.filter((item, ind) => ind !== index);
      setShoppingList(newList);
    } else {
      const newList = [...shoppingList];
      newList[index].quantity -= 1;
      setShoppingList(newList);
    }
  };

  return (
    <div className="item">
      <p>{name}</p>
      <span>
        <button onClick={() => decrementQuantity(name)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementQuantity(name)}>+</button>
      </span>
    </div>
  );
};

export default Item;
