import { useState, useEffect, useContext, createContext } from "react";
// import data from "./pages/cart/data";
import commerce from "./lib/commerce";
import data from "./data";
const AppContext = createContext();
const AppProvider = ({ children }) => {
	//for navbar
	const [search, setSearch] = useState("");
	const [toggle, setToggle] = useState({
		isFalse: false,
		height: { height: "0px" },
	});
	const handleToggle = () => {
		setToggle({
			isFalse: true,
			index: -1,
			height: { height: "288px" },
		});
	};
	const toggleClose = () => {
		setToggle({
			isFalse: false,
			index: "unset",
			height: { height: "0px" },
		});
	};
	// for slider component
	const [slideIndex, setSlideIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setSlideIndex((prevState) => (prevState > 0 ? prevState - 1 : 2));
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const handleClick = (direction) => {
		if (direction === "right") {
			setSlideIndex((prevState) => (prevState > 0 ? prevState - 1 : 2));
			console.log(slideIndex);
		} else {
			setSlideIndex((prevState) => (prevState < 2 ? prevState + 1 : 0));
			console.log(slideIndex);
		}
	};
	// product details
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		const { data } = await commerce.products.list()
		setProducts(data)
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	// for cart page
	const [dynamicData, setDynamicData] = useState([]);
	const [cartProd, setCartProd] = useState([]);
	// category
	const [filterObj, setFilterObj] = useState([]);
	const [filterSize, setFilterSize] = useState();
	const [filterColor, setFilterColor] = useState();
	const [minVal, setMinVal] = useState(10);
	const [maxVal, setMaxVal] = useState(3000);
	return (
		<AppContext.Provider
			value={{
				// navbar
				search,
				setSearch,
				toggle,
				handleToggle,
				toggleClose,
				//product
				products,
				dynamicData,
				cartProd,
				//slider
				slideIndex,
				handleClick,
				// category
				filterObj,
				setFilterObj,
				filterSize,
				setFilterSize,
				filterColor,
				setFilterColor,
				minVal,
				setMinVal,
				maxVal,
				setMaxVal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
export default AppProvider;
export const useGlobalContext = () => useContext(AppContext);