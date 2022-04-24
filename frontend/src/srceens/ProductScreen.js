import { parseRequestUrl, showLoading, hideLoading } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/"> Powrót </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} opinii`,
            })}
            </li>
            <li>
              Cena: <strong>${product.price} PLN</strong>
            </li>
            <li>
              Opis:
              <div>
                Ekologiczna świeca sojowa o wyjątkowym zapachu wraz ze suszonymi kwiatami. Świece sojowe są robione ręcznie, starannie z pasją i sercem. Pięknie pachną i wyglądają. Dostarczają błogiego relaksu w zaciszu domowym.
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Cena: ${product.price} PLN
              </li>
              <li>
                Status: 
                  ${
                    product.countInStock > 0
                      ? `<span class="success">Produkt dostępny</span>`
                      : `<span class="error">Produkt niedostępny</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Dodaj do koszyka </div>
            </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;
