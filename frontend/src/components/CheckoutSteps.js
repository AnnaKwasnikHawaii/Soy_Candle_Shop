const CheckoutSteps = {
  render: (props) => `
      <div class="checkout-steps">
        <div class="${props.step1 ? 'active' : ''}">Zaloguj się</div>
        <div class="${props.step2 ? 'active' : ''}">Wysyłka</div>
        <div class="${props.step3 ? 'active' : ''}">Płatność</div>
        <div class="${props.step4 ? 'active' : ''}">Złóż zamówienie</div>
      </div>
      `,
};
export default CheckoutSteps;
