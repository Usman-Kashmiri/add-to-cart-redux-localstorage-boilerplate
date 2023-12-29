import { cartConstants } from "../constants/cartContants";

export const cartReducer = (
  state = {
    cartItems:
      localStorage.getItem("cart") !== undefined ||
      !localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    activeCartItem:
      localStorage.getItem("cart") && !localStorage.getItem("activeCartItem")
        ? JSON.parse(localStorage.getItem("cart"))[0]
        : localStorage.getItem("activeCartItem")
        ? JSON.parse(localStorage.getItem("activeCartItem"))
        : null,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
    case cartConstants.REMOVE_ITEM_FROM_CART_REQUEST:
    case cartConstants.FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case cartConstants.FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems:
          localStorage.getItem("cart") !== undefined ||
          !localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [],
      };

    case cartConstants.ADD_TO_CART_SUCCESS:
      const itemExists = state?.cartItems?.find(
        (item) => item.id === action.payload.id
      );

      if (!itemExists) {
        const updatedCart = !localStorage.getItem("cart")
          ? [{ ...action.payload, quantity: 1 }]
          : [...state?.cartItems, { ...action.payload, quantity: 1 }];

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        console.log();

        localStorage.getItem("cart") &&
          !localStorage.getItem("activeCartItem") &&
          localStorage.setItem(
            "activeCartItem",
            JSON.stringify(JSON.parse(localStorage.getItem("cart"))[0])
          );

        return {
          ...state,
          loading: false,
          activeCartItem: JSON.parse(localStorage.getItem("activeCartItem")),
          cartItems: updatedCart,
        };
      } else {
        const updatedCart = state?.cartItems?.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return {
          ...state,
          loading: false,
          cartItems: updatedCart,
        };
      }

    case cartConstants.REMOVE_ITEM_FROM_CART_SUCCESS:
      const updatedCart = state?.cartItems?.filter(
        (item) => item.id !== action.payload
      );

      if (
        updatedCart.length > 0 &&
        JSON.parse(localStorage.getItem("activeCartItem"))?.id ===
          action.payload
      ) {
        localStorage.setItem(
          "activeCartItem",
          JSON.stringify(JSON.parse(localStorage.getItem("cart"))[0])
        );
      } else {
        localStorage.removeItem("activeCartItem");
      }

      localStorage.getItem("cart") &&
        !localStorage.getItem("activeCartItem") &&
        localStorage.setItem(
          "activeCartItem",
          JSON.stringify(JSON.parse(localStorage.getItem("cart"))[0])
        );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        loading: false,
        activeCartItem: JSON.parse(localStorage.getItem("activeCartItem")),
        cartItems: updatedCart,
      };

    case cartConstants.INCREMENT_ITEM_QUANTITY:
      const itemIdToIncrement = action.payload;

      const updatedCartIncremented = state?.cartItems?.map((item) =>
        item.id === itemIdToIncrement
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartIncremented));

      return {
        ...state,
        loading: false,
        cartItems: updatedCartIncremented,
      };

    case cartConstants.DECREMENT_ITEM_QUANTITY:
      const itemIdToDecrement = action.payload;
      const updatedCartDecremented = state.cartItems.map((item) => {
        return item.id === itemIdToDecrement
          ? { ...item, quantity: item?.quantity > 1 ? item.quantity - 1 : 0 }
          : item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartDecremented));

      return {
        ...state,
        loading: false,
        cartItems: updatedCartDecremented,
      };

    case cartConstants.UPDATE_ACTIVE_CART_ITEM:
      const activeItemId = action.payload;
      const activeCartItem = state.cartItems.find(
        (item) => item.id === activeItemId
      );

      localStorage.setItem(
        "activeCartItem",
        JSON.stringify(activeCartItem || {})
      );

      return {
        ...state,
        activeCartItem: JSON.parse(localStorage.getItem("activeCartItem")),
      };

    case cartConstants.FETCH_CART_FAILURE:
    case cartConstants.ADD_TO_CART_FAILURE:
    case cartConstants.REMOVE_ITEM_FROM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
