import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import Items from "./Item/Item";
import "./cart.scss";
import { DeleteCartItemApi } from "../../Api Method/cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastObj } from "../../utils/toastObj";

function Carts() {
	const [selectedItem, setSelectedItem] = useState([]);
	const navigate = useNavigate();
	const { cartItem, setCartItem } = useGlobalContext();
	const isCart = cartItem.length > 0;
	const isSelected = selectedItem.length > 0;
	// delete handle
	const handleDelete = () => {
		DeleteCartItemApi("0");
		setCartItem([]);
	};
	const handleSelect = (e) => {
		if (selectedItem.findIndex((i) => i === e.target.value) > -1) {
			let item = selectedItem.filter((i) => i !== e.target.value);
			setSelectedItem(item);
		} else {
			setSelectedItem((p) => [...p, e.target.value]);
		}
	};

	const handleCheckout = () => {
		!isSelected && toast.warning("Please select an item", toastObj);
		localStorage.setItem("selectedItem", selectedItem);
		isSelected && navigate("/checkout/");
	};
	return (
		<div className="cart-item">
			<div className="wrapper">
				{cartItem.length === 0 ? (
					<h3>You have no cart</h3>
				) : (
					cartItem.map((item) => (
						<div key={item._id}>
							<input
								type="checkbox"
								id={item._id}
								value={item._id}
								onChange={handleSelect}
							/>
							<label htmlFor={item._id}>
								<Items item={item} />
							</label>
						</div>
					))
				)}
			</div>
			<div className="update-and-clear">
				<button
					disabled={!isCart}
					style={{ cursor: !isCart && "not-allowed" }}
					onClick={handleDelete}
				>
					Clear
				</button>
				<button
					disabled={cartItem.length === 0}
					style={{ cursor: cartItem.length === 0 && "not-allowed" }}
					onClick={handleCheckout}
				>
					Checkout
				</button>
			</div>
		</div>
	);
}

export default Carts;
