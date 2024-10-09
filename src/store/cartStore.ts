import { create } from "zustand";
import { CartItem } from "@/constants/Cart";

interface cartState {
  cart: CartItem[];
  getCarts: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  getQuantity: () => number;
  getTotal: () => number;
  clearCart: () => void;
  totalItem: (productId: number) => number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const useCartStore = create<cartState>((set, get) => ({
  cart: [],
  getCarts: () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      set({ cart: JSON.parse(cartItems) });
    }
    return get().cart;
  },

  addToCart: (newItem: CartItem) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;

        newItem.sizeOptions.forEach((newSizeOption) => {
          const existingSizeOption = existingItem.sizeOptions.find(
            (sizeOption) => sizeOption.option === newSizeOption.option
          );

          if (existingSizeOption) {
            existingSizeOption.quantity += newSizeOption.quantity;
          } else {
            existingItem.sizeOptions.push(newSizeOption);
          }
        });

        existingItem.note = newItem.note;
      } else {
        state.cart.push(newItem);
      }
      console.log(state.cart);

      saveCartToLocalStorage(state.cart);

      return { cart: [...state.cart] };
    });
  },
  removeFromCart: (index: number) => {
    set((state) => {
      const updatedCart = [...state.cart];
      updatedCart.splice(index, 1);
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    });
  },

  getQuantity: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cartItems");
  },

  totalItem: (productId: number) => {
    const item = get().cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  },
  increaseQuantity: (productId: number) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.cart);
      }
      return { cart: [...state.cart] };
    });
  },

  decreaseQuantity: (productId: number) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        if (item.quantity >= 2) {
          item.quantity -= 1;
          saveCartToLocalStorage(state.cart);
        }
        // if (item.quantity === 0) {
        //   state.cart = state.cart.filter(
        //     (item) => item.productId !== productId
        //   );
        // }
      }
      return { cart: [...state.cart] };
    });
  },
}));

function saveCartToLocalStorage(items: CartItem[]) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}
