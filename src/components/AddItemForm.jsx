const AddItemForm = ({ shoppingList, setShoppingList }) => {
  const addItem = (name, quantity) => {
    if (shoppingList.find((item) => item.name === name)) {
      const index = shoppingList.findIndex((item) => item.name === name);
      const newList = [...shoppingList];
      newList[index].quantity += quantity;
      setShoppingList(newList);
    } else {
      const newList = [...shoppingList];
      newList.push({ name, quantity });
      setShoppingList(newList);
    }
  };

  return (
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
  );
};

export default AddItemForm;
