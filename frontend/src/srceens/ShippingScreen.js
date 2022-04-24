import { getUserInfo, getShipping, setShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = {
  after_render: () => {
    document
      .getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          postalCode: document.getElementById('postalCode').value,
          country: document.getElementById('country').value,
        });
        document.location.hash = '/payment';
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { address, city, postalCode, country } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
            <h1>Wysyłka</h1>
          </li>
          <li>
            <label for="address">Adres</label>
            <input type="text" name="address" id="address" value="${address}" />
          </li>
          <li>
            <label for="city">Miasto</label>
            <input type="text" name="city" id="city" value="${city}" />
          </li>
          <li>
            <label for="postalCode">Kod pocztowy</label>
            <input type="text" name="postalCode" id="postalCode" value="${postalCode}" />
          </li>
          <li>
            <label for="country">Kraj</label>
            <input type="text" name="country" id="country" value="${country}" />
          </li>
          <li>
            <button type="submit" class="primary">Dalej</button>
          </li>        
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;
