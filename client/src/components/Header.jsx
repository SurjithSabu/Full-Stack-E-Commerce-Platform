// client/src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          ProShop
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/cart" className="flex items-center hover:text-blue-300">
                <i className="fas fa-shopping-cart mr-1"></i> Cart
              </Link>
            </li>
            
            {userInfo ? (
              <>
                {/* 1. Standard User Menu */}
                <li className="relative group z-50">
                  <button className="flex items-center hover:text-blue-300 focus:outline-none py-2">
                    {userInfo.name} <span className="ml-1">▾</span>
                  </button>
                  
                  {/* FIX: Invisible Bridge (pt-2) + Inner white box */}
                  <div className="absolute right-0 pt-2 w-48 hidden group-hover:block">
                    <div className="bg-white rounded-md shadow-lg py-1 text-gray-800">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Profile
                      </Link>
                      <button 
                        onClick={logoutHandler} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </li>

                {/* 2. Admin Menu */}
                {userInfo.isAdmin && (
                  <li className="relative group ml-4 z-50">
                    <button className="flex items-center text-yellow-400 hover:text-yellow-300 focus:outline-none font-bold py-2">
                      Admin <span className="ml-1">▾</span>
                    </button>
                    
                    {/* FIX: Invisible Bridge (pt-2) + Inner white box */}
                    <div className="absolute right-0 pt-2 w-48 hidden group-hover:block">
                      <div className="bg-white rounded-md shadow-lg py-1 text-gray-800">
                        <Link to="/admin/userlist" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Users
                        </Link>
                        <Link to="/admin/productlist" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Products
                        </Link>
                        <Link to="/admin/orderlist" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Orders
                        </Link>
                      </div>
                    </div>
                  </li>
                )}
              </>
            ) : (
              <li>
                <Link to="/login" className="flex items-center hover:text-blue-300">
                  <i className="fas fa-user mr-1"></i> Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;