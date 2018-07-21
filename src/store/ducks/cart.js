import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

export const Types = {
  ADD_TO_CART: 'cart/ADD_TO_CART',
  CHANGE_AMOUNT: 'caRt/CHANGE_AMOUNT',
  REMOVE_PRODUCT: 'cart/REMOVE_PRODUCT',
};

const INITIAL_STATE = Immutable({
  purchaseList: [],
});

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_TO_CART:
      return {
        ...state,
        purchaseList: action.payload.index === -1
          ? [...state.purchaseList, action.payload.product]
          : state.purchaseList.map((prod, index) => (index === action.payload.index
            ? action.payload.product
            : prod)),
        loading: true,
      };
    case Types.REMOVE_PRODUCT:
      return {
        ...state,
        purchaseList: state.purchaseList.filter(x => x.id !== action.payload.id),
      };
    case Types.CHANGE_AMOUNT:
      return {
        ...state,
        purchaseList: state.purchaseList.map(product =>
          (product.id === action.payload.id
            ? { ...product, amount: action.payload.amount }
            : product)),
      };
    default:
      return state;
  }
}

export const Creators = {
  addToCart: (product, index) => ({
    type: Types.ADD_TO_CART,
    payload: {
      product,
      index,
    },
  }),
  removeProduct: id => ({
    type: Types.REMOVE_PRODUCT,
    payload: {
      id,
    },
  }),
  changeAmount: (id, amount) => ({
    type: Types.CHANGE_AMOUNT,
    payload: {
      id,
      amount,
    },
  }),
};

export const Selectors = {
  subtotalSelector: createSelector(
    state => state.purchaseList,
    purchaseList => purchaseList.reduce((acc, prod) => (prod.amount
      ? acc + (parseInt(prod.amount, 10) * prod.price)
      : acc), 0),
  ),
};
