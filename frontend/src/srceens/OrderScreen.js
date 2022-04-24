import { parseRequestUrl } from '../utils';
import { getOrder } from '../api';

const OrderScreen = {
  after_render: async () => {},
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      shippingPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
      itemsPrice,
    } = await getOrder(request.id);

    return `
      <div>
      <h1>Zamówienie ${_id}</h1>
        <div class="order">
          <div class="order-info">
            <div>
              <h2>Wysyłka</h2>
              <div>
              ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
              ${shipping.country}
              </div>

             ${
               isDelivered
                 ? `<div class="success">Dostawa ${deliveredAt}</div>`
                 : `<div class="error">Brak Dostawy </div>`
             }

            </div>
            <div>
              <h2>Płatność</h2>
              <div>
                Sposób płatności: ${payment.paymentMethod}
              </div>

              ${
                isPaid
                  ? `<div class="success">Zapłacone ${paidAt}</div>`
                  : `<div class="error">Niezapłacone</div>`
              }

            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h2>Koszyk</h2>
                  <div>Cena</div>
                </li>
                ${orderItems
                  .map(
                    (item) => `
                  <li>
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Szt.: ${item.qty} </div>
                    </div>
                    <div class="cart-price"> ${item.price} PLN</div>
                  </li>
                  `
                  )
                  .join('\n')}
              </ul>
            </div>
          </div>
          <div class="order-action">
             <ul>
                  <li>
                    <h2>Podsumowanie</h2>
                   </li>
                   <li><div>Suma</div><div>${itemsPrice} PLN</div></li>
                   <li><div>Wysyłka</div><div>${shippingPrice} PLN</div></li>
                   <li class="total"><div>Razem</div><div>${totalPrice} PLN</div></li> 
                   <li>
                   
          </div>
        </div>
      </div>
      `;
  },
};
export default OrderScreen;
