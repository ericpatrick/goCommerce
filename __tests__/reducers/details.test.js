import details, { Creators } from 'store/ducks/details';

describe('Testing details reducer', () => {
  const initialState = {
    product: null,
    loading: false,
    error: '',
  };
  const product = {
    id: 1,
    name: 'Camiseta Hyperas Preta',
    brand: 'Quiksilver',
    image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
    price: 49.99,
  };

  it('can get product', () => {
    const action = Creators.getProduct(1);
    const state = details(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('can get product with success', () => {
    const action = Creators.getProductSuccess(product);
    const state = details(initialState, action);

    expect(state.product).not.toBe(null);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');

    const savedProdcut = state.product;
    expect(state.product.id).toBe(savedProdcut.id);
    expect(state.product.name).toBe(savedProdcut.name);
    expect(state.product.brand).toBe(savedProdcut.brand);
    expect(state.product.image).toBe(savedProdcut.image);
    expect(state.product.price).toBe(savedProdcut.price);
  });

  it('could not get product', () => {
    const error = 'Erro ao buscar o producto';
    const action = Creators.getProductFail(error);
    const state = details(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('can deal with unknown action types', () => {
    const state = details(initialState, { type: 'UNKNOWN_TYPE' });

    expect(state).toBe(state);
  });
});
