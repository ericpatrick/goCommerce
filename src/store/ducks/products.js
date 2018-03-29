export const Types = {
  INITIALIZE_HOME: 'Products/INITIALIZE_HOME',
  GET_CATEGORIES_SUCCESS: 'Products/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAIL: 'Products/GET_CATEGORIES_FAIL',
  GET_PRODUCTS_SUCCESS: 'Products/GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAIL: 'Products/GET_PRODUCTS_FAIL',
};

const INITAIL_STATE = {
  categories: [],
  productsByCategory: new Map(),
  error: "",
  loading: {
    categories: false,
    products: false,
  }
};

export default function products(state = INITAIL_STATE, action) {
  switch (action.type) {
    case Types.INITIALIZE_HOME:
      return {
        ...state,
        loading: { categories: true, products: true }
      };
    case Types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: {
          ...state.loading,
          categories: false,
        }
      };
    case Types.GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: {
          ...state.loading,
          categories: false,
        }
      };
    case Types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsByCategory: new Map(state.productsByCategory)
          .set(action.payload.id, action.payload.products),
        loading: {
          ...state.loading,
          products: false,
        }
      };
    case Types.GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: {
          ...state.loading,
          products: false,
        }
      };
    default:
      return state;
  }
}

export const Creators = {
  initializeHome: () => ({
    type: Types.INITIALIZE_HOME
  }),

  getCategoriesSuccess: (categories) => ({
    type: Types.GET_CATEGORIES_SUCCESS,
    payload: {
      categories,
    }
  }),

  getCategoriesError: (error) => ({
    type: Types.GET_CATEGORIES_SUCCESS,
    payload: {
      error,
    }
  }),

  getProductsSuccess: (id, products) => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    payload: {
      id,
      products,
    },
  }),

  getProductsFail: (error) => ({
    type: Types.GET_PRODUCTS_FAIL,
    payload: {
      error,
    }
  }),
};
