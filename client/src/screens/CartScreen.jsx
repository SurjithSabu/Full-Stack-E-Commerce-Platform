// client/src/screens/CartScreen.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // If not logged in, go to login. If logged in, go to shipping.
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-5">
      {/* Column 1: Cart Items (8 cols wide) */}
      <div className="md:col-span-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
            <p>Your cart is empty <Link to='/' className="underline font-bold">Go Back</Link></p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4 w-1/2">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <Link to={`/product/${item._id}`} className="text-blue-600 font-medium hover:underline">
                    {item.name}
                  </Link>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="font-bold">${item.price}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    className="border border-gray-300 rounded p-1"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Column 2: Subtotal Card (4 cols wide) */}
      <div className="md:col-span-4">
        <div className="border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h2>
          <div className="text-xl mb-6">
            ${cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </div>
          
          <button
            type="button"
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors
              ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;