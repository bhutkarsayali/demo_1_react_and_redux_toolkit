import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const cartSelector = useSelector((store) => store.cart);

  return (
    <div className="page-container">
      {/* Header */}
      <header className="site-header">
        <div className="logo">MyBrand</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">
            Cart{" "}
            <span className="cart-icon">
              🛒<span className="cart-size">{cartSelector.items.length ? cartSelector.items.length : 0}</span>
            </span>
          </Link>
        </nav>
      </header>

      <Outlet />

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
