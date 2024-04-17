import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
export const CartContext = createContext({
  items: [],
  getCartItemQuantity: () => {},
  addOneItemToCart: () => {},
  removeOneItemFromCart: () => {},
  deleteItemFromCart: () => {},
  getTotalCost: () => {},
  getNumberOfCartItems: () => {},
  emptyCart: () => {}
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("myCart")) || []
  );
  const [loading, setLoading] = useState(false);

  // persist the cart to local storage whenever the cartItems array changes
  useEffect(() => {
    const saveCartToLocalStorage = () =>
      localStorage.setItem("myCart", JSON.stringify(cartItems));

    saveCartToLocalStorage();
  }, [cartItems]);

  // check the number of items of the specified id in the cart
  // if the item does not exist in the cart, return 0 as the number of items of the specified id in the cart
  // if the item exists in the cart, return the number of items of specified id in the cart
  // this function acts as a helper function to decide on the action to take when adding and removing items to the cart
  const getCartItemQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (item === undefined) {
      return 0;
    }

    return item;
  };
  const addToCart = (productId, quantity, price, name, stock) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
       const limitedQuantity = Math.min(quantity + existingItem.quantity, stock
       );
       const updatedCart = cartItems.map((item) =>
         item.id === productId
           ? { ...item, quantity: limitedQuantity, price: price, name: name, stock: stock }
           : item
       );
      setCartItems(updatedCart);
      Swal.fire({
        title: "Information:",
        text: "Vous avez atteint le stock de produit",
        icon: "info",
        confirmButtonText: "Oui",
      });
      return;
    }

    // Add new item to cart
    setCartItems([
      ...cartItems,
      { id: productId, quantity: quantity, price: price, name: name, stock: stock },
    ]);
  };
  const addOneItemToCart = (id, unitPrice, name, quantity, stock) => {
    // check if the item already exists in the cart
    const item = getCartItemQuantity(id);

    // if the item does not exist in the cart, add the item to the cart
    if (item === 0) {
      setCartItems([
        ...cartItems,
        {
          id,
          quantity: 1,
          unitPrice,
          name,
       
          stock,
        },
      ]);
    } else {

      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      console.log(item.name)
    }
  };

  const deleteItemFromCart = (id) => {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
  };
const emptyCart = () => {
  setCartItems([]);
};

  const removeOneItemFromCart = (id) => {
    const item= getCartItemQuantity(id);

    if (item === 1) {
      deleteItemFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };
const getTotalCost = () => {
  let totalCost = 0;

  cartItems.map((item) => (totalCost += item.quantity * item.price));

  return totalCost;
};
  

  const getNumberOfCartItems = () => {
    let numberOfCartItems = 0;

    cartItems.map((item) => (numberOfCartItems += item));

    return numberOfCartItems;
  };

  const contextValue = {
    items: cartItems,
    setCartItems,

    setLoading,
    getCartItemQuantity,
    addOneItemToCart,
    removeOneItemFromCart,
    deleteItemFromCart,
    getTotalCost,
    getNumberOfCartItems,
    addToCart,
    emptyCart,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
