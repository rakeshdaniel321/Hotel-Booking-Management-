import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  UtensilsCrossed,
  Phone,
} from "lucide-react";

import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <NavLink to="/" className="navbar-logo">
            Urban Spoon
          </NavLink>

          <ul className="desktop-nav">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/menu" className="nav-link">
                Menu
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="nav-link">
                Table Inquiry From
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bottom-item active" : "bottom-item"
          }
        >
          <House size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "bottom-item active" : "bottom-item"
          }
        >
          <UtensilsCrossed size={22} />
          <span>Menu</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "bottom-item active" : "bottom-item"
          }
        >
          <Phone size={22} />
          <span>Contact</span>
        </NavLink>
      </div>
    </>
  );
};

export default React.memo(Navbar);