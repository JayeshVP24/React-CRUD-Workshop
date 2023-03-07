# React CRUD Workshop 🛒
##  Steps to run this project ⛷️
1. *Open Terminal as Administrator*
2. Run `npm install -g yarn`
3. *Close the terminal and open normal administrator in your projects folder*
4. `git clone https://github.com/JayeshVP24/React-CRUD-Workshop.git`
5. `cd React-CRUD-Workshop`
6. `yarn`
7. `yarn dev`

## Guide
### Setup new React Project
1. *Open Terminal as Administrator*
2. Run `npm install -g yarn`
3. *Close the terminal and open normal administrator in your projects folder*
4. `yarn create vite`
	1. *Enter Project name*
	2. *Select React.js*
5. `cd project_name`
6. `yarn`
7. `yarn dev`
### Delete unnecessary content
In App.js, delete everything in div `<div className="App">`
### Predefined Data
/src/App.js above function App()
```  js
const  shoppingListPre  = [
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
```
### Initializing Data Structure
/src/App.js - inside App function
```js
const [shoppingList, setShoppingList] =  useState([]);

useEffect(() => {
	// fetch data from ap
	setShoppingList(shoppingListPre);
}, []);
```
### Write Initial HTML
/ src/App.js - inside return of App function
```js
<div  className="App">
	<h1>Shopping list 🛒 </h1>
	<div  className="list">
		{shoppingList.map((item) => ( 
			<p>{item.name}</p>
			//Item Component here
		))}
	</div>
</div>
```
### Write Initial CSS
**Remove everything in App.css and replace it with the following code**
/src/App.css
```css
#root {
	margin: 0  auto;
	padding: 2rem;
	text-align: center;
}
.list {
	width:100%;
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	padding-bottom: 2rem;
}
.item {
	background-color: blueviolet;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem  1rem;
	gap: 2rem;
}
.item  >  p {
	margin: 0;
	font-size: 1.2rem;
	color: white;
}
.item  >  span {
	display: flex;
	align-items: center;
	text-align: end;
}
.item  >  span  >  p {
	font-size: large;
	font-weight: bold;
}
.item  >  span  >  button {
	margin: 0  1rem;
	text-align: center;
	font-size: large;
}
.action {
	width: 1rem;
	height: 1rem;
}
form {
	display: grid;
	grid-template-columns: 1fr  1fr;
	row-gap: 1rem;
	column-gap: 1rem;
	max-width: 100%;
	margin: 0  auto;
}
@media  screen  and (min-width: 768px) {
	form {
		max-width: 50% ;
	}
}
input {
	padding: 0.7rem  0.5rem;
	border-radius: 10px;
	border: none;
}
#add {
	grid-column: span 2;
}
```
### Writing the Item Component Display Logic
Create folder named *components* in *src* folder 
Create file *Item.jsx* in *components* folder
**Note: First letter of component file is capital. E.g. Item.jsx- First letter i must be capital**
/src/components/Item.jsx
```js
import React from "react";
const  Item  = ({ name, quantity }) => {
	return (
		<div className="item">
			<p>{name}</p>
			<span>
				<button>-</button>
				<p>{quantity}</p>
				<button>+</button>
			</span>
		</div>
	);
};
export  default  Item;
```
**Function name must also start with captial letter, and be same as File name**
### Updating or Deleting the Item
/src/components/Item.jsx
```js
import React from "react";
const  Item  = ({ name, quantity, shoppingList, setShoppingList }) => {
	const  incrementQuantity  = (name) => {
		const  index  =  shoppingList.findIndex((item) =>  item.name ===  name);
		const  newList  = [...shoppingList];
		newList[index].quantity +=  1;
		setShoppingList(newList);
	};

	const  decrementQuantity  = (name) => {
		const  index  =  shoppingList.findIndex((item) =>  item.name ===  name);
		if (shoppingList[index].quantity ===  1) {
			const  newList  =  shoppingList.filter((item, ind) =>  ind  !==  index);
			setShoppingList(newList);
		} else {
			const  newList  = [...shoppingList];
			newList[index].quantity -=  1;
			setShoppingList(newList);
		}
	};
    
    return (
		<div className="item">
			<p>{name}</p>
			<span>
				<button onClick={() => decrementQuantity(name) } >-</button>
				<p>{quantity}</p>
				<button onClick={() =>  incrementQuantity(name)} >+</button>
			</span>
		</div>
	);
};
export  default  Item;

```
### Writing the Add Item Form Component
/src/components/AddItemForm.jsx
```js
import React from "react";
const  AddItemForm  = ({shoppingList, setShoppingList}) => {
	return (
		<form
			onSubmit={(e) => {
			e.preventDefault();
			const  formData  =  new  FormData(e.currentTarget);
			const  name  =  formData.get("NAME").valueOf();
			const  quantity  =  Number(formData.get("QUANTITY").valueOf());
			console.log(name, quantity);
		}}>
			<input  type="text"  name="NAME"  placeholder="name"  />
			<input  type="number"  name="QUANTITY"  placeholder="quantity"  />
			<button  type="submit"  id="add">Add</button>
		</form>
	);
};
export  default  AddItemForm;
```
### Write Add Item Form Component Logic
```js
import React from "react";
const  AddItemForm  = ({shoppingList, setShoppingList}) => {
	const  addItem  = (name, quantity) => {
		if (shoppingList.find((item) =>  item.name ===  name)) {
			const  index  =  shoppingList.findIndex((item) =>  item.name ===  name);
			const  newList  = [...shoppingList];
			newList[index].quantity +=  quantity;
			setShoppingList(newList);
		} else {
			const  newList  = [...shoppingList];
			newList.push({ name, quantity });
			setShoppingList(newList);
		}
	};
	return (
		<form
			onSubmit={(e) => {
			e.preventDefault();
			const  formData  =  new  FormData(e.currentTarget);
			const  name  =  formData.get("NAME").valueOf();
			const  quantity  =  Number(formData.get("QUANTITY").valueOf());
			console.log(name, quantity);
			addItem(name, quantity); //new line, calling addItem function
		}}>
			<input  type="text"  name="NAME"  placeholder="name"  />
			<input  type="number"  name="QUANTITY"  placeholder="quantity"  />
			<button  type="submit"  id="add">Add</button>
		</form>
	);
};

export default AddItemForm
```
### Final - Import all components
```js
import React, {useState, useEffect} from "react";
import Item from  "./components/Item";
import AddItemForm from  "./components/AddItemForm";
import "./App.css"

function  App() {
const [shoppingList, setShoppingList] =  useState([]);

useEffect(() => {
	// fetch data from ap
	setShoppingList(shoppingListPre);
}, []);

const  shoppingListPre  = [
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

return (
	<div  className="App">
		<h1>Shopping list 🛒 </h1>
		<div  className="list">
			{shoppingList.map((item) => ( 
				<Item
					name={item.name}
					quantity={item.quantity}
					setShoppingList={setShoppingList}
					shoppingList={shoppingList}
					key={item.name}
				/>
			))}
		</div>
		<AddItemForm  shoppingList={shoppingList} setShoppingList={setShoppingList} />
	</div>
	);
}

export default App
```

export default App
### Done
![Output ](https://ik.imagekit.io/okaydokeymypath/React_CRUD_Workshop/Screenshot1.png)
