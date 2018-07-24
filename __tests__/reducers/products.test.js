import products, { Creators } from 'store/ducks/products';

describe('Testing products reducers', () => {
  const initialState = {
    categories: [],
    productsByCategory: new Map(),
    error: '',
    loading: {
      categories: false,
      products: false,
    },
  };
  const categories = [
    {
      id: 1,
      title: 'Camisetas',
    },
    {
      id: 2,
      title: 'Camisas',
    },
  ];
  const product = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
    amount: 1,
  };

  it('can initialize home page', () => {
    const action = Creators.initializeHome();
    const state = products(initialState, action);

    expect(state.loading.categories).toBe(true);
    expect(state.loading.products).toBe(true);
  });

  it('can get categories with success', () => {
    const action = Creators.getCategoriesSuccess(categories);
    const state = products(initialState, action);

    expect(state.loading.categories).toBe(false);
    expect(state.error).toBe('');
    expect(state.categories).toHaveLength(2);
    expect(state.categories[0].id).toBe(categories[0].id);
    expect(state.categories[1].id).toBe(categories[1].id);
  });

  it('could not get categories', () => {
    const error = 'Erro ao buscar categorias';
    const action = Creators.getCategoriesError(error);
    const state = products(initialState, action);

    expect(state.loading.categories).toBe(false);
    expect(state.error).toBe(error);
  });

  it('can get products with success', () => {
    const action = Creators.getProductsSuccess(1, product);
    const state = products(initialState, action);

    expect(state.productsByCategory.size).toBe(1);
    expect(state.loading.products).toBe(false);
  });

  it('could not get products', () => {
    const error = 'Erro ao buscar os produtos';
    const action = Creators.getProductsFail(error);
    const state = products(initialState, action);

    expect(state.loading.products).toBe(false);
    expect(state.error).toBe(error);
  });

  it('can change category', () => {
    let action = Creators.getCategoriesSuccess(categories);
    let state = products(initialState, action);
    action = Creators.changeCategory(2);
    state = products(state, action);

    expect(state.categories[1].selected).toBe(true);
    expect(state.loading.products).toBe(true);
  });

  it('can deal with unknown action types', () => {
    const state = products(initialState, { type: 'UNKNOWN_TYPE' });

    expect(state).toBe(state);
  });
});
