import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		if (cart) {
			let count = 0;
			cart.map(element => {
				if (element.id === item.id) {
					count += 1
				}
			})
			if (count === 0) {
				setCart([...cart, item]);
			}
		} else {
			setCart([item]);
		}
	};

	const removeItem = id => {
		let newArray = [];
		cart.map(element => {
			if (element.id !== id) {
				newArray.push(element);
			}
		})
		setCart(newArray);
	}

	// useEffect(() => {
	// 	if (window.localStorage.getItem('cart')) {
	// 		const cartJSON = window.localStorage.getItem(('cart'));
	// 		console.log(cartJSON);
	// 		// setCart(JSON.parse(window.localStorage.getItem('cart')));
	// 	}
	// },[cart])

	// useEffect(() => {
	// 	if (cart) {
	// 		window.localStorage.setItem('cart', JSON.stringify(cart));
	// 	}
	// }, [cart])

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					<Navigation />
				
				{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>
					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
