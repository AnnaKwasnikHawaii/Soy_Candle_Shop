/* eslint-disable no-use-before-define */
import { parseRequestUrl, rerender } from '../utils';
import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });

    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById('checkout-button').addEventListener('click', () => {
      document.location.hash = '/signin';
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Koszyk</h3>
            <div>Cena</div>
          </li>
          ${
            cartItems.length === 0
              ? '<div>Koszyk jest pusty. <a href="/#/">Zapraszamy serecznie na zakupy.</a>'
              : cartItems
                  .map(
                    (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}"/>
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.name}
                  </a>
                </div>
                <div>
                  Ilość: 
                  <select class="qty-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map((x) =>
                      item.qty === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option value="${x + 1}">${x + 1}</option>`
                    )};

                  </select>
                  <button type="button" class="delete-button" id="${
                    item.product
                  }">
                    Usuń
                  </button>
                </div>
              </div>
              <div class="cart-price">
                ${item.price} PLN
              </div>
            </li>
            `
                  )
                  .join('\n')
          } 
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Suma (${cartItems.reduce((a, c) => a + c.qty, 0)} szt.): 
            ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} PLN
          </h3>
          <button id="checkout-button" class="primary fw">
           Do kasy
          </button>
      </div>
    </div>
    `;
  },
};

export default CartScreen;
