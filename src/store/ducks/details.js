import Immutable from 'seamless-immutable';

export const Types = {
  GET_PRODUCT: 'Details/GET_PRODUCT',
  GET_PRODUCT_SUCCESS: 'Details/GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAIL: 'Details/GET_PRODUCT_FAIL',
};

const INITIAL_STATE = Immutable({
  product: null,
  loading: false,
  error: '',
});

export default function details(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_PRODUCT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case Types.GET_PRODUCT_SUCCESS:
      return {
        product: action.payload.product,
        loading: false,
        error: '',
      };
    case Types.GET_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  getProduct: id => ({
    type: Types.GET_PRODUCT,
    payload: {
      id,
    },
  }),

  getProductSuccess: product => ({
    type: Types.GET_PRODUCT_SUCCESS,
    payload: {
      product,
    },
  }),

  getProductFail: error => ({
    type: Types.GET_PRODUCT_FAIL,
    payload: {
      error,
    },
  }),
};
