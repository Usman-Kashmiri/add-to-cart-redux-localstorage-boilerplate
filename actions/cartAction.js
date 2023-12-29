import { cartConstants } from "../constants/cartContants";
import { successMessage, errorMessage } from "../../services/helpers";

export const fetchCart = () => async (dispatch) => {
  dispatch({
    type: cartConstants.FETCH_CART_REQUEST,
  });
  try {
    dispatch({
      type: cartConstants.FETCH_CART_SUCCESS,
    });

    return "success";
  } catch (error) {
    dispatch({
      type: cartConstants.FETCH_CART_FAILURE,
      payload: "Server Error",
    });
    errorMessage("Fail to fetch cart");
  }
};

export const addToCart = (product) => async (dispatch) => {
  dispatch({
    type: cartConstants.ADD_TO_CART_REQUEST,
  });

  try {
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: product,
    });

    successMessage(`${product?.title} is added to cart successfully`);

    dispatch(fetchCart());

    return "success";
  } catch (error) {
    dispatch({
      type: cartConstants.ADD_TO_CART_FAILURE,
      payload: "Server Error",
    });
    errorMessage("Fail to add item to cart");
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  dispatch({
    type: cartConstants.REMOVE_ITEM_FROM_CART_REQUEST,
  });

  try {
    dispatch({
      type: cartConstants.REMOVE_ITEM_FROM_CART_SUCCESS,
      payload: productId,
    });

    successMessage(`Item removed from cart successfully`);

    return "success";
  } catch (error) {
    dispatch({
      type: cartConstants.ADD_TO_CART_FAILURE,
      payload: "Server Error",
    });
    errorMessage("Fail to remove item from cart");
  }
};

export const incrementItemQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: cartConstants.INCREMENT_ITEM_QUANTITY,
    payload: productId,
  });

  dispatch({
    type: cartConstants.UPDATE_ACTIVE_CART_ITEM,
    payload: productId,
  });

  return "success";
};

export const decrementItemQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: cartConstants.DECREMENT_ITEM_QUANTITY,
    payload: productId,
  });
  dispatch({
    type: cartConstants.UPDATE_ACTIVE_CART_ITEM,
    payload: productId,
  });

  return "success";
};

export const handleActiveCartItem = (productId) => async (dispatch) => {
  dispatch({
    type: cartConstants.UPDATE_ACTIVE_CART_ITEM,
    payload: productId,
  });

  return "success";
};

// export const addToCart = (productId) => async (dispatch) => {
//   attachToken();
//   dispatch({
//     type: cartConstants.ADD_TO_CART_REQUEST,
//   });
//   try {
//     const res = await custAxios.post("/cart/add", { productId });
//     if (res?.data?.success === true) {
//       dispatch({
//         type: cartConstants.ADD_TO_CART_SUCCESS,

//         payload: res?.data,
//       });
//       return "success";
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: cartConstants.ADD_TO_CART_FAILURE,
//       payload: error?.response?.data?.message || "Server Error",
//     });
//     errorMessage(error?.response?.data?.message);
//   }
// };
// export const updateCart = (values) => async (dispatch) => {
//   attachToken();
//   dispatch({
//     type: cartConstants.UPDATE_CART_REQUEST,
//   });
//   try {
//     const res = await custAxios.put("/cart/update", values);
//     if (res?.data?.success === true) {
//       dispatch({
//         type: cartConstants.UPDATE_CART_SUCCESS,
//         payload: res?.data,
//       });
//       return "success";
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: cartConstants.UPDATE_CART_FAILURE,
//       payload: error?.response?.data?.message || "Server Error",
//     });
//     errorMessage(error?.response?.data?.message);
//   }
// };

// export const fetchCart = () => async (dispatch) => {
//   attachToken();
//   dispatch({
//     type: cartConstants.FETCH_CART_REQUEST,
//   });
//   try {
//     const res = await custAxios.get("/cart");
//     if (res?.data?.success === true) {
//       dispatch({
//         type: cartConstants.FETCH_CART_SUCCESS,

//         payload: res?.data,
//       });
//       return "success";
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: cartConstants.FETCH_CART_FAILURE,
//       payload: error?.response?.data?.message || "Server Error",
//     });
//     errorMessage(error?.response?.data?.message);
//   }
// };
