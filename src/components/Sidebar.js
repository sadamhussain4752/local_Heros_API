import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [selectedCountry, setSelectedCountry] = React.useState("IND");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const logoutFunction = () => {
    localStorage.removeItem("userId");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <>
      <div className=" col-md-2 py-5">
      <ul className="nav text-start">
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 w-100 ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              <img src="assets/images/dashboard.png" className="mx-3" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/orders" ? "active" : ""
              }`}
              to="/orders"
            >
              <img src="assets/images/order.png" className="mx-3" />
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/category" ? "active" : ""
              }`}
              to="/category"
            >
              <img src="assets/images/brand.png" className="mx-3" />
              Category
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/brand" ? "active" : ""
              }`}
              to="/brand"
            >
              <img src="assets/images/brand.png" className="mx-3" />
              Banner
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/products" ? "active" : ""
              }`}
              to="/products"
            >
              <img src="assets/images/product.png" className="mx-3" />
              Invitatory
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/customer" ? "active" : ""
              }`}
              to="/customer"
            >
              <img src="assets/images/customer.png" className="mx-3" />
              Customer
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/staff" ? "active" : ""
              }`}
              to="/staff"
            >
              <img src="assets/images/staff.png" className="mx-3" />
              Our Staff
            </Link>
          </li> */}
         

          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "" ? "active" : ""
              }`}
              to="/blog"
            >
              <img src="assets/images/inter.png" className="mx-3" />
              Blog
            </Link>
            {/* <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="countryDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedCountry}
              </button>
              <div className="dropdown-menu" aria-labelledby="countryDropdown">
                <button
                  className={`dropdown-item ${
                    selectedCountry === "IND" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCountry("IND")}
                >
                  IND
                </button>
                <button
                  className={`dropdown-item ${
                    selectedCountry === "JAP" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCountry("JAP")}
                >
                  JAP
                </button>
                <button
                  className={`dropdown-item ${
                    selectedCountry === "KOA" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCountry("KOA")}
                >
                  KOA
                </button>
                <button
                  className={`dropdown-item ${
                    selectedCountry === "AUS" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCountry("AUS")}
                >
                  AUS
                </button>
              </div>
            </div> */}
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  text-decoration-none fw-semibold  text-secondary fs-6 mb-3 ${
                location.pathname === "/settings" ? "active" : ""
              }`}
              to="/settings"
            >
              <img src="assets/images/setting.png" className="mx-3" />
              Setting
            </Link>
          </li>
         
          <li className="nav-item text-center ps-3">
            <a
              className={`nav-link btn btn-sm my-3 text-light bg-main rounded-pill text-decoration-none fw-semibold btn-sm  fs-6 mb-3`}
              onClick={logoutFunction}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;