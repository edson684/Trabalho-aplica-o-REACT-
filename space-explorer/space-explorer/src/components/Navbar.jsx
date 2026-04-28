import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">SPACE<span className="logo-accent">EXPLORER</span></span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/apod" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Galeria APOD
            </NavLink>
          </li>
          <li>
            <NavLink to="/mars" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Marte
            </NavLink>
          </li>
          <li>
            <NavLink to="/neo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Asteroides
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
