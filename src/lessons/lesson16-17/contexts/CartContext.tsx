import { createContext, ReactNode, useContext, useReducer } from "react";
import Product from "../types/product";
import CartItem from "../types/cart-item";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity + 1,
        totalPrice:
          state.totalPrice +
          action.payload.price * (1 - action.payload.discountPercentage / 100),
      };
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => item.product.id === action.payload,
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        totalQuantity: state.totalQuantity - itemToRemove.quantity,
        totalPrice:
          state.totalPrice -
          itemToRemove.product.price *
            (1 - itemToRemove.product.discountPercentage / 100) *
            itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id,
      );
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
        totalQuantity: state.totalQuantity + quantityDiff,
        totalPrice:
          state.totalPrice +
          item.product.price *
            (1 - item.product.discountPercentage / 100) *
            quantityDiff,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
