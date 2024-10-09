import { create } from "zustand";
import { CartItem } from "@/constants/Cart";

interface cartState {
  cart: CartItem[];
  getCarts: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number, option?: string) => void;
  getQuantity: () => number;
  getTotal: () => number;
  clearCart: () => void;
  totalItem: (productId: number) => number;
  increaseQuantity: (productId: number, option: string) => void;
  decreaseQuantity: (productId: number, option: string) => void;
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

      saveCartToLocalStorage(state.cart);

      return { cart: [...state.cart] };
    });
  },
  removeFromCart: (index: number, option?: string) => {
    set((state) => {
      const updatedCart = [...state.cart];
      if (option !== undefined && option !== "") {
        const item = state.cart.find((item) => item.productId === index);
        if (!item) return { cart: updatedCart };
        const sizeOptionIndex = item.sizeOptions.findIndex(
          (sizeOption) => sizeOption.option === option
        );
        if (sizeOptionIndex !== -1) {
          item.sizeOptions.splice(sizeOptionIndex, 1);
          if (item.sizeOptions.length === 0) {
            updatedCart.splice(index, 1);
          }
        }
      } else {
        updatedCart.splice(index, 1);
      }
      saveCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    });
  },

  getQuantity: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    return get().cart.reduce(
      (total, item) =>
        item.sizeOptions.reduce(
          (total, sizeOption) =>
            total + (item.price + sizeOption.price) * sizeOption.quantity,
          total
        ),
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

  increaseQuantity: (productId: number, option: string) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
        item.sizeOptions.forEach((sizeOption) => {
          if (sizeOption.option === option) {
            sizeOption.quantity += 1;
          }
        });
        saveCartToLocalStorage([...state.cart]);
      }
      return { cart: [...state.cart] };
    });
  },

  decreaseQuantity: (productId: number, option: string) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity -= 1;
        item.sizeOptions.forEach((sizeOption) => {
          if (sizeOption.option === option) {
            if (sizeOption.quantity >= 2) {
              sizeOption.quantity -= 1;
            } else {
              confirm("Bạn có muốn xóa tùy chọn này không?") &&
                get().removeFromCart(item.productId, option);
            }
          }
        });
        saveCartToLocalStorage([...state.cart]);
      }
      return { cart: [...state.cart] };
    });
  },
}));

function saveCartToLocalStorage(items: CartItem[]) {
  localStorage.removeItem("cartItems");

  localStorage.setItem("cartItems", JSON.stringify(items));
}
