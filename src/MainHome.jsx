import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./redux-store/cartSlice";
import { fetchProducts } from "./redux-store/productSlice";

const MainHome = () => {
  //   const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  //   const cartSelector = useSelector((store) => store.cart);
  //   console.log("Cart Selector:", cartSelector.items);
  const itemsListSelector = useSelector((store) => store.products.items);
  const statusSelector = useSelector((store) => store.products.status);
  const errorSelector = useSelector((store) => store.products.error);

  const cartSelector = useSelector((store) => store.cart);
//   console.log("Cart Selector:", cartSelector);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const data = await fetch("https://dummyjson.com/products");
    //     const json = await data.json();
    //     setProducts(json.products);
    //     console.log(json.products);
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   }
    // };
    // fetchProducts();
    if (statusSelector == "idle") {
      dispatch(fetchProducts());
    }
  }, [statusSelector, dispatch]);

  if (statusSelector === "loading") {
    return <p>Loading products...</p>;
  }
  if (statusSelector === "failed") {
    return <p>Error loading products: {errorSelector}</p>;
  }
  return (
    <div>
      <main className="content">
        {itemsListSelector.length > 0 ? (
          itemsListSelector.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h5>{product.title}</h5>
              <div className="price-container">
                {cartSelector.items.find((item) => item.id === product.id) ? (
                  <button className="added-to-cart">Already in Cart</button>
                ) : (
                  <button
                    className="add-to-cart"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  className="remove-from-cart"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  Remove From Cart
                </button>
                <h5>${product.price.toFixed(2)}</h5>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </main>
    </div>
  );
};

export default MainHome;
