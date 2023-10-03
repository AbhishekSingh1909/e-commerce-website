import cartReducer, {
  addToCart,
  clearCart,
  detetFromCart,
} from "../../redux/cart/cartReducer";
import { CartItem } from "../../types/CartItem";
import { productsData } from "../dataSeed/productData.Seed";

const state: {
  cartItems: CartItem[];
} = {
  cartItems: [],
};
beforeEach(() => {
  state.cartItems = [];
});
describe("Test actions in cardReducer", () => {
  test("should add items in cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);

    const product1 = productsData[1];
    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.cartItems[1].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.cartItems[1].quantity).toBe(2);
  });
  test("should delete an item from cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);

    state.cartItems = cartReducer(state, detetFromCart(product.id)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = cartReducer(state, detetFromCart(product.id)).cartItems;
    expect(state.cartItems?.length).toBe(0);
  });
  test("should clear entire cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    const product1 = productsData[1];
    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(1);
    expect(state.cartItems[1].quantity).toBe(1);

    state.cartItems = cartReducer(state, clearCart()).cartItems;
    expect(state.cartItems?.length).toBe(0);
  });
});
