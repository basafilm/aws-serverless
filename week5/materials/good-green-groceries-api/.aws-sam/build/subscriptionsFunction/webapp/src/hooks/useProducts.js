import {useState } from "react";



function useProducts() {
  const [cart, setCart] = useState([]);


  const addProduct = (product) => {
    let newCart = cart.concat(product);
    setCart(newCart);
  };

  const removeProduct = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return { cart, addProduct, removeProduct };
}

export default useProducts;
