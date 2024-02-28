// Header.js

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GetprofileListById } from "../reducer/thunks";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [navbarBg, setNavbarBg] = useState("bg-white");
  const location = useLocation();
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const changeColorPosition = 10; // Change color after scrolling down 100 pixels

    if (scrollPosition > changeColorPosition) {
      setNavbarBg("fixed-top");
    } else {
      setNavbarBg("bg-white");
    }
  };
  let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const {
    loading: getOrderUserLoading,
    Ordererror: getOrderUserError,
    GetProfileList: getOrderResponse,
  } = useSelector((state) => state.GetProfileList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(GetprofileListById(userId));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const logoutFunction = () => {
    localStorage.removeItem("userId");
    window.location.reload();
    window.location.href = "/";
  };
  return (
    <>
      <>
        {/* Hello world */}
        <header className="p-3 background-color">
          <div className="container-fluid ">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
              >
                <img
                  src={require("../constant/images/local hero final.jpg")}
                  width={"120px"}
                  height={"50px"}
                />
              </a>
              <ul className="nav col-12 col-lg-auto mx-lg-auto mb-2 justify-content-end mb-md-0">
                {/*<li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
  <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
  <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
  <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li> */}
              </ul>
              {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> */}
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />{" "}
                  <strong className="px-3">
                    {getOrderResponse &&
                      getOrderResponse?.User &&
                      getOrderResponse.User.firstname}
                  </strong>
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <a className="dropdown-item" href="/settings">
                      Settings
                    </a>
                  </li>
                  <li>
                    <Link className={`dropdown-item`} to="/settings">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logoutFunction}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </>
    </>
  );
};

export default Header;
