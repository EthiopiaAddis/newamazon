import React from "react";
import "./Header.css";
import { GoLocation } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { FaBars } from "react-icons/fa";


const Header = () => {
  return (
    <header className="header_wrapper">
      {/* Top part */}
      <div className="header">
        <div className="header_left">
          <a href="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="amazon_logo"
            />
          </a>
          <div className="header_location">
            <GoLocation className="location_icon" />
            <div className="location_text">
              <span className="option_line1">Deliver to</span>
              <span className="option_line2">USA</span>
            </div>
          </div>
        </div>

        <div className="header_search">
          <select className="select_category">
            <option value="all">All</option>
          </select>
          <input
            type="text"
            placeholder="Search product"
            className="search_input"
          />
          <BsSearch className="search_icon" />
        </div>

        <div className="header_right">
          <div className="language_selector">
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14595.png"
              alt="US Flag"
              className="flag_icon"
            />
            <select className="language_select">
              <option value="EN">EN</option>
            </select>
          </div>

          <div className="header_option_group">
            <a href="/signin" className="header_option">
              <span className="option_line1">Sign In</span>
              <span className="option_line2">Account & Lists</span>
            </a>
          </div>

          <div className="header_option_group">
            <a href="/returns" className="header_option">
              <span className="option_line1">Returns</span>
              <span className="option_line2">& Orders</span>
            </a>
          </div>

          <a href="/cart" className="header_option_cart">
            <BiCart className="cart_icon" />
            <span className="cart_count">0</span>
          </a>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="header_bottom">
        <ul className="bottom_nav">
          <li className="nav_item">
            <FaBars className="nav_icon" />
            <span style={{ marginLeft: "5px" }}>All</span>
          </li>

          <li className="nav_item">Today's Deals</li>
          <li className="nav_item">Customer Service</li>
          <li className="nav_item">Registry</li>
          <li className="nav_item">Gift Cards</li>
          <li className="nav_item">Sell</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
