import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return ` 
  <div class="brand">
    <a href="/#/" class='header-link'>ŚWIECE SOJOWE</a>
    <a href="/#/about" class='header-link'>O NAS</a>
  </div>
  <div class='header-link-container'>
  ${
    name
      ? `<a href="/#/profile" class='header-extra-link'>${name}</a>`
      : `<a href="/#/signin" class='header-extra-link'>Zaloguj się </a>`
  }
    
    <a href="/#/cart" class='header-link'>KOSZYK</a>
  </div>`;
  },
  after_render: () => {},
};
export default Header;
