import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Snackbar from "@mui/material/Snackbar";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
export const CartContext = createContext({
  items: [],
  getCartItemQuantity: () => {},
  addOneItemToCart: () => {},
  updateItemQuantity:()=>{},
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
    const closeSnackbar = () => {
      setSnackbarOpen(false);
    };
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState("");
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
     const limitedQuantity = Math.min(quantity + existingItem.quantity, stock);
     const updatedCart = cartItems.map((item) =>
       item.id === productId
         ? {
             ...item,
             quantity: limitedQuantity,
             price: price,
             name: name,
             stock: stock,
           }
         : item
     );

     if (quantity >= limitedQuantity) {
       setCartItems(updatedCart);
       Swal.fire({
         title: "Information:",
         text: "Vous avez atteint le stock de produit",
         icon: "info",
         confirmButtonText: "Oui",
       });
     } else {
       setCartItems(updatedCart);
       setSnackbarMessage("Le quantité mise à jour dans le panier.");
       setSnackbarOpen(true);
     }
   } else {
     setCartItems([
       ...cartItems,
       {
         id: productId,
         quantity: quantity,
         price: price,
         name: name,
         stock: stock,
       },
     ]);
     setSnackbarMessage("Le produit est ajouté au panier.");
     setSnackbarOpen(true);
     
   }
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


  const updateItemQuantity = (id, quantity) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (quantity > item.stock) {
        setCartItems(
          cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.stock } : item
          )
        );
        setSnackbarMessage("Stock insuffisant.");
        setSnackbarOpen(true);
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
        );
        setSnackbarMessage("La quantité du produit a été mise à jour.");
        setSnackbarOpen(true);
      }
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const deleteItemFromCart = (id) => {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
  };
const emptyCart = () => {
  setCartItems([]);
  console.log(cartItems)
};

const removeOneItemFromCart = (id) => {
  const item = getCartItemQuantity(id);

  if (item === 1) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  } else {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
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

   
    getCartItemQuantity,
    addOneItemToCart,
    removeOneItemFromCart,
    deleteItemFromCart,
    getTotalCost,
    getNumberOfCartItems,
    addToCart,
    emptyCart,
    updateItemQuantity,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        ContentProps={{
          style: { backgroundColor: 'white', color:'black' } // Set background color using ContentProps
        }}
        
action={<React.Fragment>
  
  <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleClose}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
</React.Fragment>}
      />
    </CartContext.Provider>
  );
}

export default CartProvider;
