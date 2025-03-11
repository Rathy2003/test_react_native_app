import { createContext } from "react"

type cart = {
    id:number,
    title:string,
    price:number,
    image:string,
    quantity:number
  }
  
  type CartItemContextType = {
    cartItem: cart[]; // Array of CartItem objects
    setCartItem: React.Dispatch<React.SetStateAction<cart[]>>; // Function to update the state
  };
const CartItemContext = createContext<CartItemContextType>({
    cartItem: [],
    setCartItem: () => {},
})

export default CartItemContext