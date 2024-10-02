import { create } from "zustand";
import { CartItem } from "@/constants/Cart";

interface cartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  getQuantity: () => number;
  getTotal: () => number;
  reset: () => void;
  totalItem: (productId: number) => number;
}

export const useCartStore = create<cartState>((set, get) => ({
  cart: [],
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

  reset: () => {
    set({ cart: [] });
    localStorage.removeItem("cartItems");
  },

  totalItem: (productId: number) => {
    const item = get().cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  },
}));

function saveCartToLocalStorage(items: CartItem[]) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}
