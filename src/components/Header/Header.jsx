import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaMapMarkerAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useStateValue } from "../Dataprovider/DataProvider.js";

function Header() {
  const [{ cart }] = useStateValue();

  return (
    <header className="sticky_header">
      <div className="header_wrapper">
        {}
        <div className="header">
          <div className="header_left">
            <Link to="/">
              <img
                className="amazon_logo"
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
            <div className="header_location">
              <FaMapMarkerAlt className="location_icon" />
              <div className="location_text">
                <span className="option_line1">Deliver to</span>
                <span className="option_line2">Ethiopia</span>
              </div>
            </div>
          </div>

          <div className="header_search">
            <select className="select_category">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
            </select>
            <input
              type="text"
              className="search_input"
              placeholder="Search Amazon"
            />
            <FaSearch className="search_icon" />
          </div>

          <div className="header_right">
            <div className="language_selector">
              <img
                className="flag_icon"
                src="https://flagcdn.com/us.svg"
                alt="US Flag"
              />
              <select className="language_select">
                <option>EN</option>
                <option>ES</option>
              </select>
            </div>

            <div className="header_option_group">
              <Link to="/signup" className="header_option">
                <span className="option_line1">Hello, Sign in</span>
                <span className="option_line2">Account & Lists</span>
              </Link>
            </div>

            <div className="header_option_group">
              <Link to="/orders" className="header_option">
                <span className="option_line1">Returns</span>
                <span className="option_line2">& Orders</span>
              </Link>
            </div>

            <Link to="/cart" className="header_option_cart">
              <FaShoppingCart className="cart_icon" />
              <span className="cart_count">{cart?.length || 0}</span>
            </Link>
          </div>
        </div>

        {}
        <div className="header_bottom">
          <ul className="bottom_nav">
            <li className="nav_item">Today's Deals</li>
            <li className="nav_item">Customer Service</li>
            <li className="nav_item">Registry</li>
            <li className="nav_item">Gift Cards</li>
            <li className="nav_item">Sell</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
