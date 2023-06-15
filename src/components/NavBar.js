import { CartWidget } from "./CartWidget";

export const NavBar = () => {
  return (
    <header>
      <nav>
        <div class="container-top">
          <div class="container-logo">
            <h2>VINYLS</h2>
          </div>
          <div class="container-search">
            <input type="text" placeholder="search product..." />
          </div>
          <div class="container-cart">
            <CartWidget />
          </div>
        </div>
        <div class="container-bottom">
          <div class="container-list">
            <ul>
              <li>
                <a href="*">Products</a>
              </li>
              <li>
                <a href="*">About Us</a>
              </li>
              <li>
                <a href="*">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
