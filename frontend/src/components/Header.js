import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return ` 
  <div class="brand">
    <a href="/#/">ŚWIECE SOJOWE</a>
  </div>
  <div>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `<a href="/#/signin">Zaloguj się </a>`
  }
    
    <a href="/#/cart">Koszyk</a>
  </div>`;
  },
  after_render: () => {},
};
export default Header;
