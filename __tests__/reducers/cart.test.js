import cart, { Creators } from 'store/ducks/cart';

describe('Testing cart reducer', () => {
  const initialState = {
    purchaseList: [],
  };
  const products = [
    {
      id: 1,
      name: 'Camiseta Hyperas Preta',
      brand: 'Quiksilver',
      image: 'https://t-static.dafiti.com.br/czCvp3wBNPfehf7omYZfJacnxPY=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-hyperas-preta-8710-7136243-1-product.jpg',
      price: 49.99,
      amount: 1,
    },
    {
      id: 2,
      name: 'Camiseta Double Tap Preta',
      brand: 'Quiksilver',
      image: 'https://t-static.dafiti.com.br/EpEXepU-tSbgo6ZMl4Y5BOdjelw=/fit-in/427x620/dafitistatic-a.akamaihd.net%2fp%2fquiksilver-camiseta-quiksilver-double-tap-preta-7115-8165043-1-product.jpg',
      price: 59.99,
    },
  ];

  it('can add to cart', () => {
    const product = products[0];
    let action = Creators.addToCart(product, -1);
    let state = cart(initialState, action);

    expect(state.purchaseList).toHaveLength(1);

    const item = state.purchaseList[0];
    expect(item.id).toBe(product.id);
    expect(item.name).toBe(product.name);
    expect(item.brand).toBe(product.brand);
    expect(item.image).toBe(product.image);
    expect(item.price).toBe(product.price);
    expect(item.amount).toBe(product.amount);

    action = Creators.addToCart(products[1], 0);
    state = cart(state, action);

    expect(state.purchaseList).toHaveLength(2);

    const newItem = state.purchaseList[1];
    expect(newItem.id).toBe(products[0].id);
  });

  it('can remove from cart', () => {
    let action = Creators.addToCart(products[0], -1);
    let state = cart(initialState, action);
    action = Creators.removeProduct(1);
    state = cart(state, action);

    expect(state.purchaseList).toHaveLength(0);
  });

  it('can change amount of a product', () => {
    let action = Creators.addToCart(products[0], -1);
    let state = cart(initialState, action);
    action = Creators.changeAmount(1, 2);
    state = cart(state, action);
    action = Creators.changeAmount(5, 10);
    state = cart(state, action);

    expect(state.purchaseList).toHaveLength(1);

    const item = state.purchaseList[0];
    expect(item.amount).toBe(2);
  });

  it('can deal with unknown action types', () => {
    const state = cart(initialState, { type: 'UNKNOWN_TYPE' });

    expect(state).toBe(state);
  });
});
