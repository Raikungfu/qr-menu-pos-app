import { create } from "zustand";
import { Product } from "@/constants/Product";

interface CartProduct {
  product: Product;
  quantity: number;
  size: string;
}

interface Cart {
  products: CartProduct[];
  quantity: number;
  total: number;
}

interface cartState {
  cart: Cart;
  addToCart: (item: Product, size: string) => void;
  removeFromCart: (index: number) => void;
  getQuantity: () => number;
  getTotal: () => number;
  reset: () => void;
  totalItem: (productId: number) => number;
}

export const useCartStore = create<cartState>((set, get) => ({
  cart: {
    products: [],
    quantity: 0,
    total: 0,
  },
  addToCart: (item: Product, size: string) => {
    set((state) => {
      const existingProductIndex = state.cart.products.findIndex(
        (cartProduct) => cartProduct.product.MenuItemId === item.MenuItemId
      );

      if (existingProductIndex !== -1) {
        state.cart.products[existingProductIndex].quantity += 1;
      } else {
        state.cart.products.push({ product: item, quantity: 1, size });
        console.log("Add to cart", item, size);
      }

      return {
        cart: {
          ...state.cart,
          quantity: state.cart.quantity + 1,
          total: state.cart.total + item.Price,
        },
      };
    });
  },
  removeFromCart: (index: number) => {
    set((state) => {
      const productToRemove = state.cart.products[index];
      if (productToRemove) {
        state.cart.products.splice(index, 1);
        return {
          cart: {
            ...state.cart,
            quantity: state.cart.quantity - productToRemove.quantity,
            total:
              state.cart.total -
              productToRemove.product.Price * productToRemove.quantity,
          },
        };
      }
      return state;
    });
  },
  getQuantity: () => {
    return get().cart.quantity;
  },
  getTotal: () => {
    return get().cart.total;
  },
  reset: () => {
    set({
      cart: {
        products: [],
        quantity: 0,
        total: 0,
      },
    });
  },
  totalItem: (productId: number) => {
    const product = get().cart.products.find(
      (cartProduct) => cartProduct.product.MenuItemId === productId
    );
    return product ? product.quantity : 0;
  },
}));
