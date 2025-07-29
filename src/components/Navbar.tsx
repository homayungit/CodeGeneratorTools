import React from 'react';
import { authService } from '../services/authService';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          <strong>CodeGen Pro</strong>
        </a>
        
        <div className="navbar-nav ms-auto">
          {user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                Welcome, {user.firstName || user.email}!
              </span>
              <button 
                className="btn btn-outline-light btn-sm" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <a href="/login" className="btn btn-outline-light me-2">Login</a>
              <a href="/register" className="btn btn-light">Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
