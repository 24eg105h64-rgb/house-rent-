import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          RentEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/properties">
                Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-property">
                Add Property
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item d-lg-none">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
          <div className="d-none d-lg-flex ms-3">
            <Link className="btn btn-outline-light btn-sm me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary btn-sm" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
